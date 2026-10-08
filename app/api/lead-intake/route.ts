import { NextRequest, NextResponse } from "next/server";
import { centreIdForClinic, DEFAULT_CENTRE_KEY } from "@/lib/centre-map";

/**
 * SERVER-ONLY lead-intake proxy → dolce-crm `POST /api/leads/intake`.
 *
 * Why this exists (do not bypass it from the browser):
 *  - the CRM sends no CORS headers, so a browser fetch from the website
 *    domain is blocked outright;
 *  - the `x-api-key` must never reach the client bundle.
 *
 * The landing forms POST the lead here; this route maps it to the CRM intake
 * schema (lib/centre-map.ts resolves the branch UUID), forwards it, and
 * mirrors the CRM verdict back. Failure semantics: a CRM error is logged
 * with the full intake payload — the proxy is the only capture, so the lead
 * must stay recoverable from the server logs — and returned as {ok:false};
 * the /thank-you redirect happens in the client regardless, so a CRM outage
 * can never block the visitor.
 *
 * Every response sets a short-lived httpOnly cookie that middleware accepts
 * as proof the visitor reached /thank-you via a real submission; plain URL
 * entry has neither cookie and gets bounced to the homepage.
 */

const CRM_BASE_URL = process.env.CRM_BASE_URL ?? "https://crm.dolceestetica.com";

/** httpOnly cookie this route sets on every intake attempt. */
const SERVER_COOKIE = "lp_lead_srv";
const COOKIE_MAX_AGE = 1800; // 30 min — long enough to land on /thank-you

function withCookies(response: NextResponse): NextResponse {
  const cookie = `${SERVER_COOKIE}=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; HttpOnly`;
  response.headers.append("Set-Cookie", cookie);
  return response;
}

/** "+91 98470 00000" / "9198470000000" / "9847000000" → "+9198470000000". */
function normalizePhone(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91${digits}`;
  if (digits.length >= 7 && digits.length <= 15) return `+${digits}`;
  return null;
}

function str(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

/** CRM channel label derived from the campaign's utm_source. */
function channelFor(utmSource: string | undefined): string {
  const s = (utmSource ?? "").toLowerCase();
  if (s.startsWith("google")) return "google_ads_lp";
  if (s.startsWith("meta") || s.startsWith("fb") || s.startsWith("instagram")) return "meta_leadgen";
  if (s.startsWith("chatgpt") || s.startsWith("openai")) return "chatgpt";
  return "website";
}

/** Only fields the CRM schema knows; empty/absent values are omitted, never
 *  sent as null or "" (zod .optional() rejects nothing but the spec says no). */
function buildIntakePayload(body: Record<string, unknown>, phone: string, centreId: string) {
  const utmSource = str(body.utm_source, 120);
  const intake: Record<string, unknown> = {
    phone,
    centreId,
    source: str(body.source, 120) ?? "website",
    channel: channelFor(utmSource),
  };

  const name = str(body.name, 120);
  if (name) intake.name = name;

  const email = str(body.email, 254);
  if (email && email.includes("@")) intake.email = email;

  if (utmSource) intake.utmSource = utmSource;
  const utmMedium = str(body.utm_medium, 120);
  if (utmMedium) intake.utmMedium = utmMedium;
  const utmCampaign = str(body.utm_campaign, 120);
  if (utmCampaign) intake.utmCampaign = utmCampaign;
  const utmContent = str(body.utm_content, 120);
  if (utmContent) intake.utmContent = utmContent;

  const adTreatment = str(body.service, 160);
  if (adTreatment) intake.adTreatment = adTreatment;

  // gclid/fbclid have no CRM column — carry them in the human-readable
  // summary so ad-level attribution is never fully lost. The contact form's
  // free-text enquiry and the booking form's preferred date/time ride along
  // the same way: the CRM schema has no dedicated columns for them.
  const clickIds = [
    str(body.gclid, 120) && `gclid=${str(body.gclid, 120)}`,
    str(body.fbclid, 120) && `fbclid=${str(body.fbclid, 120)}`,
  ].filter(Boolean);
  const message = str(body.message, 800);
  const preferredSlot = [str(body.date, 40), str(body.time, 40)].filter(Boolean).join(", ");
  const summary = `${str(body.service, 200) ?? "Consultation request"} at ${str(body.clinic, 120) ?? "preferred clinic"}`;
  intake.initialMessage = [
    ...clickIds,
    message && `Enquiry: ${message}`,
    preferredSlot && `Preferred slot: ${preferredSlot}`,
    summary,
  ]
    .filter(Boolean)
    .join(" | ")
    .slice(0, 4000);

  const occurredAt = typeof body.at === "string" && !Number.isNaN(Date.parse(body.at)) ? body.at : undefined;
  if (occurredAt) intake.occurredAt = occurredAt;

  // Idempotency: same phone at the same branch within a 10-minute bucket
  // dedupes instead of creating a second lead.
  const slug = str(body.slug, 60) ?? "page";
  intake.externalReference = `website:${slug}:${phone}:${Math.floor(Date.now() / 600_000)}`.slice(0, 160);

  return intake;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return withCookies(NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }));
  }

  const phone = normalizePhone(body.phone);
  const clinic = typeof body.clinic === "string" ? body.clinic : undefined;
  // No clinic field at all (the contact form has none) routes to the head
  // branch; a filled-but-unknown value stays a loud skip, since that means
  // a dropdown and the centre map have drifted apart.
  const centreId = clinic ? centreIdForClinic(clinic) : centreIdForClinic(DEFAULT_CENTRE_KEY);
  if (!phone || !centreId) {
    // Invalid submission or an unmapped clinic: the client validates before
    // sending, so this is rare. Log the body so the lead can be re-keyed,
    // and let the visitor proceed — not an error they should see.
    console.warn(
      "[lead-intake] skipped:",
      !phone ? "invalid phone" : `no centre UUID for "${clinic ?? "(none given)"}"`,
      JSON.stringify(body).slice(0, 500),
    );
    return withCookies(NextResponse.json({ ok: false, skipped: !phone ? "invalid_phone" : "centre_unmapped" }, { status: 202 }));
  }

  const apiKey = process.env.CRM_LEAD_INTAKE_API_KEY;
  if (!apiKey) {
    console.warn("[lead-intake] skipped: CRM_LEAD_INTAKE_API_KEY is not set");
    return withCookies(NextResponse.json({ ok: false, skipped: "crm_key_missing" }, { status: 202 }));
  }

  const intake = buildIntakePayload(body, phone, centreId);

  try {
    const res = await fetch(`${CRM_BASE_URL}/api/leads/intake`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(intake),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      // 401/503 mean the CRM side key is missing/mismatched — config, not data.
      // Payload goes to the log: the proxy is the only capture of this lead.
      console.error(`[lead-intake] CRM ${res.status}: ${detail} payload=${JSON.stringify(intake)}`);
      return withCookies(
        NextResponse.json({ ok: false, error: "crm_rejected", status: res.status }, { status: 502 }),
      );
    }

    const data = (await res.json().catch(() => ({}))) as {
      lead?: { id?: string; attached?: boolean };
    };
    return withCookies(
      NextResponse.json({ ok: true, leadId: data.lead?.id ?? null, attached: data.lead?.attached === true }),
    );
  } catch (error) {
    console.error(
      "[lead-intake] CRM unreachable:",
      error instanceof Error ? error.message : error,
      `payload=${JSON.stringify(intake)}`,
    );
    return withCookies(NextResponse.json({ ok: false, error: "crm_unreachable" }, { status: 502 }));
  }
}

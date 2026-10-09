import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { centreIdForClinic, DEFAULT_CENTRE_KEY } from "@/lib/centre-map";
import { normalizeLeadPhone, validateLead } from "@/lib/lead-validation";
import { RECEIPT_COOKIE, signLeadReceipt } from "@/lib/lead-receipt";

const CRM_BASE_URL = process.env.CRM_BASE_URL ?? "https://crm.dolceestetica.com";
const text = (value: unknown, max = 120) => typeof value === "string" ? value.trim().slice(0, max) || undefined : undefined;
const failure = (message: string, status: number) => NextResponse.json({ ok: false, message }, { status });

/** Public boundary; the CRM API key and personal details never enter browser logs. */
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host;
  try {
    if (origin && new URL(origin).host !== host) return failure("This request must be sent from our website.", 403);
  } catch { return failure("Invalid request origin.", 403); }
  if (Number(request.headers.get("content-length") || 0) > 16_384) return failure("The request is too large.", 413);
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16_384) return failure("The request is too large.", 413);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return failure("Invalid request.", 400);
    body = parsed;
  } catch { return failure("Invalid request.", 400); }
  const validation = validateLead(body);
  if (validation) return failure(validation, 400);
  const clinic = text(body.clinic);
  const centreId = centreIdForClinic(clinic || DEFAULT_CENTRE_KEY);
  if (!centreId) return failure("Please select a valid clinic.", 400);
  const apiKey = process.env.CRM_LEAD_INTAKE_API_KEY;
  if (!apiKey) return failure("Online booking is temporarily unavailable. Please call us or try again later.", 503);
  const submissionId = text(body.submissionId, 36) || randomUUID();
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(submissionId)) return failure("Invalid submission reference.", 400);
  const slot = [text(body.date, 40), text(body.time, 40)].filter(Boolean).join(", ");
  const intake = {
    phone: normalizeLeadPhone(body.phone), name: text(body.name), email: text(body.email, 254), centreId,
    source: text(body.source) || "website", channel: "website",
    utmSource: text(body.utm_source), utmMedium: text(body.utm_medium), utmCampaign: text(body.utm_campaign),
    utmTerm: text(body.utm_term, 500), utmContent: text(body.utm_content),
    gclid: text(body.gclid, 500), fbclid: text(body.fbclid, 500),
    landingPage: text(body.landing_page, 500), referrer: text(body.referrer, 500),
    adTreatment: text(body.service, 160),
    initialMessage: [text(body.service, 200) || "Consultation request", clinic, text(body.message, 800), slot && `Preferred slot: ${slot}`].filter(Boolean).join(" | "),
    externalReference: `website:${submissionId}`,
  };
  try {
    const response = await fetch(`${CRM_BASE_URL}/api/leads/intake`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(intake), cache: "no-store", signal: AbortSignal.timeout(20_000),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.success !== true || typeof data?.lead?.id !== "string") {
      console.error("[lead-intake] CRM rejected submission", { status: response.status, submissionId });
      return failure("We couldn't save your request. Please try again or call us.", 502);
    }
    const result = NextResponse.json({ ok: true, leadId: data.lead.id, attached: data.lead.attached === true });
    result.cookies.set(RECEIPT_COOKIE, signLeadReceipt(submissionId, apiKey), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 300,
    });
    result.headers.set("Cache-Control", "no-store");
    return result;
  } catch {
    console.error("[lead-intake] CRM unavailable", { submissionId });
    return failure("We couldn't confirm your request. Please retry; your enquiry won't be duplicated.", 502);
  }
}

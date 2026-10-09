"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Mail, Phone, User } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import { locations } from "@/lib/data/locations";
import { captureUtm } from "@/lib/utm";
import { useLeadSubmission } from "@/lib/use-lead-submission";
import { useConcern } from "./ConcernContext";

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-base text-dolce-ink outline-none transition-colors placeholder:text-gray-400 focus:border-dolce-green focus:bg-white focus:ring-2 focus:ring-dolce-green/15";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

/**
 * Section 8 of the required structure — the "Book Consultation" lead form.
 * Fields per the client's sheet: Name, Email, Phone, plus dropdowns for
 * primary concern and preferred clinic.
 *
 * This component is deliberately just the white form card: each of the seven
 * unique page designs wraps it in its own section layout (heading, aside,
 * background) via components/landing/kit.tsx, so the designs can differ
 * while the capture behaviour stays identical everywhere.
 *
 * The lead is captured by the CRM via our own server proxy (/api/lead-intake
 * → crm.dolceestetica.com — the CRM has no CORS and its API key must never
 * reach the browser), then the visitor is redirected to /thank-you — a
 * dedicated conversion URL whose pageview fires the GTM lead trigger (an
 * inline message cannot be measured that way).
 */
export default function LandingLeadForm({
  page,
  submitLabel = "Book My Consultation",
  defaultConcern,
}: {
  page: LandingPage;
  submitLabel?: string;
  /** pre-selected concern (page-appropriate default on some LPs) */
  defaultConcern?: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", clinic: "" });
  const { concern, setConcern } = useConcern(defaultConcern);

  // Bank the ad tags the moment the visitor lands, so a lead submitted from
  // any of the seven pages still carries the campaign even after the visitor
  // navigates somewhere whose URL no longer has the parameters.
  useEffect(() => {
    captureUtm();
  }, []);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const { submitLead, pending, error } = useLeadSubmission();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Attribution: UTMs/gclid from the ad URL (or this session's first touch)
    // ride along so the CRM can tie the lead back to its campaign. The
    // customer-facing WhatsApp message deliberately stays free of tracking.
    const utm = captureUtm();
    const leadPayload = {
      event: "lead.created",
      source: `lp-${page.slug}`,
      slug: page.slug,
      pageName: page.name,
      concern,
      clinic: form.clinic,
      service: `${page.name} — ${concern}`,
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      at: new Date().toISOString(),
      utm_source: utm.source,
      utm_medium: utm.medium,
      utm_campaign: utm.campaign,
      utm_term: utm.term,
      utm_content: utm.content,
      gclid: utm.gclid,
      fbclid: utm.fbclid,
      landing_page: utm.landingPage,
      referrer: utm.referrer,
    };

    // Only a confirmed CRM response permits the success redirect.
    await submitLead(leadPayload);
  };

  return (
    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-xl shadow-dolce-green/5 sm:p-10">
      <form onSubmit={submit} noValidate={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="lp-name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="lp-name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={`${fieldClass} pl-11`}
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="lp-phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="lp-phone"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  className={`${fieldClass} pl-11`}
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="lp-email">
                Email (optional)
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="lp-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${fieldClass} pl-11`}
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="lp-concern">
                Primary Concern <span className="text-red-500">*</span>
              </label>
              <select
                id="lp-concern"
                required
                className={fieldClass}
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              >
                <option value="" disabled>
                  Select your concern
                </option>
                {page.concerns.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="lp-clinic">
                Preferred Clinic <span className="text-red-500">*</span>
              </label>
              <select
                id="lp-clinic"
                required
                className={fieldClass}
                value={form.clinic}
                onChange={(e) => set("clinic")(e.target.value)}
              >
                <option value="" disabled>
                  Select a clinic
                </option>
                {locations.map((loc) => (
                  <option key={loc.slug} value={loc.city}>
                    {loc.city}
                  </option>
                ))}
                <option value="Not sure, help me choose">Not sure, help me choose</option>
              </select>
            </div>
          </div>

          {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
                    disabled={pending}
                    aria-busy={pending}
            className="lp-submit mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-dolce-green px-8 py-4 text-base font-bold text-white transition-all hover:bg-dolce-green-light active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 sm:text-lg"
          >
            <CalendarCheck className="h-5 w-5" />
            {pending ? "Sending…" : submitLabel}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
            * Required fields. We&apos;ll confirm your slot on a quick call. Your details
            are used only to arrange this consultation.
          </p>
        </form>
    </div>
  );
}

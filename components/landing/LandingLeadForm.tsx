"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Mail, Phone, User } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/site";
import { captureUtm } from "@/lib/utm";

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
 * Submission mirrors app/booking/BookingForm.tsx: the lead is captured in the
 * CMO Brain (n8n CRM bridge) first, then handed off to WhatsApp so nothing is
 * lost even if WhatsApp is never completed. The visitor is then redirected to
 * /thank-you — a dedicated conversion URL whose pageview fires the GTM lead
 * trigger (an inline message cannot be measured that way).
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
  const isSurgical = page.brand === "medlounges";
  const [form, setForm] = useState({ name: "", phone: "", email: "", concern: defaultConcern ?? "", clinic: "" });

  // Bank the ad tags the moment the visitor lands, so a lead submitted from
  // any of the seven pages still carries the campaign even after the visitor
  // navigates somewhere whose URL no longer has the parameters.
  useEffect(() => {
    captureUtm();
  }, []);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const waMessage = () => {
    const lines = [
      `Hello ${isSurgical ? "MedLounges" : "Dolce Estetica"}, I would like to book a consultation for ${page.name.toLowerCase()}.`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Primary concern: ${form.concern}`,
      `Preferred clinic: ${form.clinic}`,
    ].filter(Boolean);
    return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Attribution: UTMs/gclid from the ad URL (or this session's first touch)
    // ride along so the CRM can tie the lead back to its campaign. The
    // customer-facing WhatsApp message deliberately stays free of tracking.
    const utm = captureUtm();
    fetch("https://n8n-production-f013.up.railway.app/webhook/crm-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "lead.created",
        source: `lp-${page.slug}`,
        clinic: form.clinic,
        service: `${page.name} — ${form.concern}`,
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
      }),
      keepalive: true,
    }).catch(() => {});

    // WhatsApp handoff opens inside the click's own task (the only window
    // popup blockers always allow), then the hard navigation to /thank-you
    // gives GTM a clean pageview on the dedicated conversion URL.
    window.open(waMessage(), "_blank", "noopener,noreferrer");
    //
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- a full page load (not a history push) guarantees the GTM pageview on /thank-you regardless of how the container's triggers are configured
    window.location.assign("/thank-you");
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
                Email Address
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
                value={form.concern}
                onChange={(e) => set("concern")(e.target.value)}
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

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-dolce-green px-8 py-4 text-base font-bold text-white transition-all hover:bg-dolce-green-light active:scale-[0.99] sm:text-lg"
          >
            <CalendarCheck className="h-5 w-5" />
            {submitLabel}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
            * Required fields. We&apos;ll confirm your slot on a quick call. Your details
            are used only to arrange this consultation.
          </p>
        </form>
    </div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import { CalendarCheck, X } from "lucide-react";
import { locations } from "@/lib/data/locations";
import { captureUtm } from "@/lib/utm";
import { useLeadSubmission } from "@/lib/use-lead-submission";

/**
 * Mobile booking bar with a simple slide-up form, hidden at the lg breakpoint.
 * Let the browser bring focused fields into view: resizing, translating or
 * smooth-scrolling the sheet on focus fights the iPhone keyboard's own scroll.
 * The bar's close button hides it until the next visit (memory-only).
 *
 * Submission mirrors the #book form: after capture, the visitor is redirected
 * to /thank-you?p=<slug> — the client explicitly wants a dedicated thank-you
 * URL instead of an in-sheet message. A signed server receipt permits the
 * success navigation and the page emits the generate_lead GTM data-layer event.
 */
const VARIANTS = {
  green: {
    bar: "bg-dolce-green",
    title: "text-white",
    sub: "text-white/60",
    fine: "text-white/80",
    btn: "bg-white text-dolce-green hover:bg-dolce-sand",
  },
  dark: {
    bar: "bg-[#0B140D]",
    title: "text-white",
    sub: "text-white/55",
    fine: "text-white/75",
    btn: "bg-[#E9F2EA] text-[#0B140D] hover:bg-white",
  },
  bronze: {
    bar: "bg-[#8A7142]",
    title: "text-white",
    sub: "text-white/70",
    fine: "text-white/85",
    btn: "bg-white text-[#6E5930] hover:bg-dolce-sand/60",
  },
  slate: {
    bar: "bg-[#141F1B]",
    title: "text-white",
    sub: "text-white/55",
    fine: "text-white/75",
    btn: "bg-[#8FD3C2] text-[#12332B] hover:bg-[#A9DFD1]",
  },
} as const;

/* Reference-sheet inputs: white blocks, gently rounded, 16px text (no iOS zoom) */
const sheetInput =
  "h-12 w-full rounded-lg border-0 bg-white px-4 text-base text-dolce-ink outline-none transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-white/70";

export default function LandingStickyCta({
  slug,
  label,
  variant = "green",
  concerns = [],
  defaultConcern,
}: {
  slug?: string;
  label?: string;
  variant?: keyof typeof VARIANTS;
  /** Same options as the main form's "Primary Concern" dropdown. */
  concerns?: string[];
  /** Pre-selected concern, matching the main form's page default. */
  defaultConcern?: string;
}) {
  const v = VARIANTS[variant];
  const headline = label ?? "Book your consultation";
  const sheetId = useId();

  const [mode, setMode] = useState<"cta" | "form">("cta");
  const [closing, setClosing] = useState<null | "bar" | "sheet">(null);
  const [closed, setClosed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    concern: defaultConcern ?? "",
    clinic: "",
  });

  // Bank the ad tags on landing, same as the main form, so a lead submitted
  // after the visitor navigated still carries its campaign.
  useEffect(() => {
    captureUtm();
  }, []);

  const openSheet = () => {
    setMode("form");
  };

  const dismissBar = () => {
    setClosing("bar");
  };

  const closeSheet = () => {
    setClosing("sheet");
  };

  const { submitLead, pending, error } = useLeadSubmission();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const utm = captureUtm();
    const leadPayload = {
      event: "lead.created",
      source: `lp-${slug ?? "page"}-sticky-bar`,
      slug: slug ?? "page",
      clinic: form.clinic,
      service: `${headline} — ${form.concern}`,
      concern: form.concern,
      name: form.name.trim(),
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

    await submitLead(leadPayload);
  };

  if (closed) return null;

  const sheetOpen = mode === "form";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[140] lg:hidden">
      {/* Keep the bar's space, but exclude its covered controls from focus. */}
      <div
        inert={sheetOpen}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && closing === "bar") {
            setClosed(true);
            setClosing(null);
          }
        }}
        className={`border-t border-white/10 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:px-6 ${v.bar} ${closing === "bar" ? "lp-booking-exit" : ""}`}
      >
          <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-3">
            <button
              type="button"
              onClick={openSheet}
              aria-expanded={sheetOpen}
              aria-controls={sheetId}
              className={`inline-flex flex-none touch-manipulation items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-bold whitespace-nowrap shadow-lg transition-colors sm:px-10 ${v.btn}`}
            >
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </button>
            <button
              type="button"
              onClick={dismissBar}
              aria-label="Close booking bar"
              className={`absolute right-0 flex h-10 w-10 flex-none touch-manipulation items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 ${v.title}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
      </div>

      {/* Animate only opening/closing; field changes never move the sheet. */}
      {sheetOpen && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div
            data-sheet
            id={sheetId}
            role="region"
            aria-label="Book a consultation"
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && closing === "sheet") {
                setMode("cta");
                setClosing(null);
              }
            }}
            className={`relative max-h-[calc(100svh-1rem)] w-full overflow-y-auto overscroll-y-contain scroll-auto rounded-t-[1.75rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,0.3)] sm:px-6 sm:pt-8 ${v.bar} ${closing === "sheet" ? "lp-booking-exit" : "lp-booking-enter"}`}
          >
            <button
              type="button"
              onClick={closeSheet}
              aria-label="Close booking form"
              className={`absolute top-2 right-2 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 ${v.title}`}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto w-full max-w-xl">
              <form onSubmit={submit} noValidate>
                <h2 className={`pr-10 text-center text-lg leading-snug font-extrabold sm:text-xl ${v.title}`}>
                  {headline} today
                  <span className={`mt-1 block text-xs font-semibold ${v.sub}`}>
                    Fill this in and we&apos;ll call you back within 2 hours
                  </span>
                </h2>

                <div className="mt-5 grid gap-2.5">
                  <input
                    aria-label="Full name"
                    required
                    autoComplete="name"
                    placeholder="Name"
                    className={sheetInput}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                  <input
                    aria-label="Mobile number"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Mobile *"
                    className={sheetInput}
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                  <input
                    aria-label="Email address"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Email (optional)"
                    className={sheetInput}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  <select
                    aria-label="Primary concern"
                    required
                    className={`${sheetInput} appearance-none`}
                    value={form.concern}
                    onChange={(e) => setForm((f) => ({ ...f, concern: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select your concern *
                    </option>
                    {concerns.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <select
                    aria-label="Preferred clinic"
                    required
                    className={`${sheetInput} appearance-none`}
                    value={form.clinic}
                    onChange={(e) => setForm((f) => ({ ...f, clinic: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select your clinic *
                    </option>
                    {locations.map((loc) => (
                      <option key={loc.slug} value={loc.city}>
                        {loc.city}
                      </option>
                    ))}
                    <option value="Not sure, help me choose">Not sure, help me choose</option>
                  </select>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={pending}
                    aria-busy={pending}
                    className="inline-flex h-12 touch-manipulation items-center justify-center rounded-lg bg-[#111111] px-12 text-sm font-extrabold tracking-[0.22em] text-white uppercase transition-colors hover:bg-black"
                  >
                    {pending ? "Sending…" : "Submit"}
                  </button>
                </div>

                {error ? (
                  <p className="mt-3 text-center text-xs font-semibold text-red-200" role="alert">
                    {error}
                  </p>
                ) : (
                  <p className={`mt-3 text-center text-[11px] leading-relaxed ${v.fine}`}>
                    No spam, ever. Your details are used only to arrange this call.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, CheckCircle2, X } from "lucide-react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/shared/BrandIcons";

/**
 * The sticky bottom booking bar + expandable booking sheet — an exact copy of
 * the reference site's mobile pattern, in theme colours:
 *
 *  - "cta"   slim bar (label + note + BOOK NOW + ×) — slides down into view
 *  - "form"  tapping Book Now slides the bar down and a BOOKING SHEET up:
 *            centred white 2-line headline, stacked Name / Email / Mobile *
 *            inputs and a black uppercase SUBMIT button (reference layout)
 *  - "done"  success message with a WhatsApp fallback inside the same sheet
 *
 * Phone-first behaviours:
 *  - Slide-down-in / slide-up-out animations on the bar and the sheet.
 *  - KEYBOARD LIFT: while an input is focused, the whole bar rides ABOVE the
 *    on-screen keyboard (visualViewport-driven translateY), so the SUBMIT
 *    button is visible immediately when typing starts — no manual scrolling.
 *  - A one-time gentle page scroll-assist on first focus keeps context
 *    visible behind the raised sheet.
 *
 * MOBILE HARDENING: fully opaque backgrounds, no backdrop-filter (iOS
 * hit-testing bug), compositing layer on the fixed wrapper, and
 * `touch-manipulation` on every control.
 *
 * The × hides everything until the next reload/visit (memory-only).
 *
 * `variant`: green (brand), dark, bronze (IV/hair), slate (MedLounges).
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
  defaultConcern,
  concerns,
}: {
  slug?: string;
  label?: string;
  variant?: keyof typeof VARIANTS;
  /** pre-fills the sheet's concern select (page-appropriate on some LPs) */
  defaultConcern?: string;
  /** the page's concern list — rendered as the sheet's dropdown options */
  concerns?: string[];
}) {
  const v = VARIANTS[variant];
  const headline = label ?? "Book your consultation";

  const [mode, setMode] = useState<"cta" | "form" | "done">("cta");
  const [closing, setClosing] = useState<null | "bar" | "sheet">(null);
  const [closed, setClosed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", concern: defaultConcern ?? "" });
  const concernOptions = concerns ?? (defaultConcern ? [defaultConcern] : []);
  const [error, setError] = useState("");

  const kbRef = useRef<HTMLDivElement>(null);
  const scrolledOnce = useRef(false);

  /* ---- keyboard lift: keep the sheet above the on-screen keyboard ---- */
  useEffect(() => {
    const vv = window.visualViewport;
    const el = kbRef.current;
    if (!vv || !el) return;
    const lift = () => {
      const overlap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      el.style.transform = overlap > 0 ? `translateY(${-overlap}px)` : "";
    };
    vv.addEventListener("resize", lift);
    vv.addEventListener("scroll", lift);
    return () => {
      vv.removeEventListener("resize", lift);
      vv.removeEventListener("scroll", lift);
    };
  }, []);

  /* First field focus: nudge the page once so there is content above the
     raised sheet and the SUBMIT button lands in view the moment typing
     starts (the lift above does the heavy lifting). */
  const onFirstFocus = () => {
    if (scrolledOnce.current) return;
    scrolledOnce.current = true;
    window.setTimeout(() => {
      window.scrollBy({ top: 180, behavior: "smooth" });
    }, 350);
  };

  const openSheet = () => {
    scrolledOnce.current = false;
    setError("");
    setMode("form");
  };

  const dismissBar = () => {
    setClosing("bar");
    window.setTimeout(() => {
      setClosed(true);
      setClosing(null);
    }, 340);
  };

  const closeSheet = () => {
    setClosing("sheet");
    window.setTimeout(() => {
      setMode("cta");
      setClosing(null);
    }, 340);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = form.phone.replace(/\D/g, "").replace(/^91(?=[6-9])/, "");
    if (form.name.trim().length < 2) {
      setError("Please tell us your name.");
      return;
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("That email doesn't look right. Check it, or leave it empty.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");

    // Same capture path as the main lead form (n8n CRM bridge), so quick
    // sheet bookings land in the same pipeline with their own source tag.
    fetch("https://n8n-production-f013.up.railway.app/webhook/crm-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "lead.created",
        source: `lp-${slug ?? "page"}-sticky-bar`,
        clinic: "",
        service: `${headline} — quick booking`,
        name: form.name.trim(),
        phone,
        email: form.email.trim() || undefined,
        concern: form.concern.trim() || undefined,
        at: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {});

    setMode("done");
  };

  if (closed) return null;

  const sheetOpen = mode === "form" || mode === "done";

  /* NOTE on compositing: the fixed wrapper deliberately carries NO permanent
     transform (no translateZ/will-change). A permanently-promoted layer makes
     phones rasterise the bar's text as a GPU texture — the "blurry text"
     bug. The wrapper only gets a transform while the keyboard is open
     (kbRef inline style), which is transient. */
  return (
    <div ref={kbRef} className="fixed inset-x-0 bottom-0 z-[140] lg:hidden">
      {/* ============ slim bar — always mounted; the sheet slides OVER it ============ */}
      <div
        className={`border-t border-white/10 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:px-6 ${v.bar} ${closing === "bar" ? "lp-slide-up-out" : "lp-slide-down-in"}`}
      >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <p className={`min-w-0 flex-1 truncate text-sm font-bold sm:text-base ${v.title}`}>
              Book a free doctor consult
            </p>
            <button
              type="button"
              onClick={openSheet}
              className={`inline-flex flex-none touch-manipulation items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold whitespace-nowrap shadow-lg transition-colors sm:px-8 ${v.btn}`}
            >
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </button>
            <button
              type="button"
              onClick={dismissBar}
              aria-label="Close booking bar"
              className={`flex h-10 w-10 flex-none touch-manipulation items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 ${v.title}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
      </div>

      {/* ============ booking sheet — slides DOWN ON TOP of the bar (reference behaviour) ============ */}
      {sheetOpen && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div
            className={`relative w-full rounded-t-[1.75rem] px-5 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,0.3)] sm:px-6 sm:pt-8 ${v.bar} ${closing === "sheet" ? "lp-slide-up-out" : "lp-slide-down-in"}`}
          >
            <button
              type="button"
              onClick={closeSheet}
              aria-label="Close booking form"
              className={`absolute top-3 right-3 flex h-9 w-9 touch-manipulation items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 ${v.title}`}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Same phone-sheet UX on desktop: full-width sheet, centred content */}
            <div className="mx-auto w-full max-w-xl">
            {mode === "form" ? (
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
                    autoComplete="name"
                    placeholder="Name"
                    className={sheetInput}
                    value={form.name}
                    onFocus={onFirstFocus}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                  <input
                    aria-label="Email address"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Email"
                    className={sheetInput}
                    value={form.email}
                    onFocus={onFirstFocus}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  <input
                    aria-label="Mobile number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Mobile *"
                    className={sheetInput}
                    value={form.phone}
                    onFocus={onFirstFocus}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                  <select
                    aria-label="Your concern"
                    className={`${sheetInput} appearance-none`}
                    value={form.concern}
                    onChange={(e) => setForm((f) => ({ ...f, concern: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select your concern
                    </option>
                    {concernOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex h-12 touch-manipulation items-center justify-center rounded-lg bg-[#111111] px-12 text-sm font-extrabold tracking-[0.22em] text-white uppercase transition-colors hover:bg-black"
                  >
                    Submit
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
            ) : (
              <div className="py-2 text-center">
                <CheckCircle2 className={`mx-auto h-10 w-10 ${v.title}`} />
                <h2 className={`mt-3 text-lg font-extrabold ${v.title}`}>
                  Thank you, {form.name.trim().split(" ")[0] || "there"}.
                </h2>
                <p className={`mt-1.5 text-sm leading-relaxed ${v.sub}`}>
                  We&apos;ll call you on <strong className={v.title}>{form.phone}</strong> within 2
                  hours to fix your appointment.
                </p>
                <div className="mt-4 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                      `Hello, I just booked a call back from the ${headline.toLowerCase()} page. Name: ${form.name}, Phone: ${form.phone}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex touch-manipulation items-center justify-center gap-2 rounded-lg bg-[#111111] px-8 py-3 text-xs font-extrabold tracking-[0.18em] text-white uppercase transition-colors hover:bg-black"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp us
                  </a>
                  <button
                    type="button"
                    onClick={closeSheet}
                    className={`inline-flex touch-manipulation items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-xs font-bold transition-colors hover:bg-white/10 ${v.title}`}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * The sticky "Book Now" CTA from the client's sheet (Bodycraft reference).
 * Appears once the visitor has scrolled past the hero, and politely hides
 * again while the lead form itself is on screen — no double-CTA shouting.
 * Sits under the global FloatingActions (z-150) and clears the safe-area
 * inset on notched phones.
 */
export default function LandingStickyCta({ label }: { label?: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480);
    // rAF covers reloads that land mid-page (no scroll event fires); calling
    // it straight in the effect body trips the set-state-in-effect rule.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const target = document.getElementById("book");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { rootMargin: "-10% 0px -10% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const shown = pastHero && !formVisible;

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-[140] transition-transform duration-300 ease-out ${
        shown ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="border-t border-white/10 bg-dolce-green/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="hidden min-w-0 sm:block">
            <span className="block text-sm font-bold text-white">
              {label ?? "Book your consultation"}
            </span>
            <span className="block text-xs text-white/60">
              Doctor-led · 4 clinics · full quote before treatment
            </span>
          </p>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-white/10 sm:flex-none"
            >
              <Phone className="h-4 w-4" />
              <span className="sm:hidden">Call now</span>
            </a>
            <a
              href="#book"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold whitespace-nowrap text-dolce-green shadow-lg transition-colors hover:bg-dolce-sand sm:flex-none"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

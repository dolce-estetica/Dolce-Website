import { CalendarCheck } from "lucide-react";

/**
 * The sticky "Book Now" CTA — Bodycraft-style: permanently pinned to the
 * bottom of the viewport from first paint, single CTA, no call button.
 * Pure server component: no scroll logic, no hiding.
 * The page route adds bottom padding so the bar never covers page content.
 */
export default function LandingStickyCta({ label }: { label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[140]">
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
          <a
            href="#book"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold whitespace-nowrap text-dolce-green shadow-lg transition-colors hover:bg-dolce-sand sm:w-auto"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

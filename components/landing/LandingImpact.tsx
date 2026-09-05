import type { LandingPage } from "@/lib/data/landing-pages";

/**
 * Section 2 of the required structure — USPs / impact numbers, as a crisp
 * full-width brand-green band directly under the hero. Every figure shown
 * must be verifiable (see lib/data/landing-pages.ts).
 */
export default function LandingImpact({ page }: { page: LandingPage }) {
  return (
    <section className="bg-dolce-green">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 sm:grid-cols-4 sm:px-6 sm:py-10">
        {page.impact.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-1 px-3 text-center ${
              i > 0 ? "sm:border-l sm:border-white/15" : ""
            } ${i % 2 === 1 ? "border-l border-white/15 sm:border-l" : ""}`}
          >
            <dd className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {item.value}
            </dd>
            <dt className="max-w-[18ch] text-[11px] leading-snug text-white/70 sm:text-xs">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

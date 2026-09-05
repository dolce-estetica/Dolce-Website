import type { LandingPage } from "@/lib/data/landing-pages";

/**
 * Section 2 of the required structure — USPs / impact numbers, as a card
 * overlapping the banner's bottom edge. Every figure shown must be
 * verifiable (see lib/data/landing-pages.ts).
 */
export default function LandingImpact({ page }: { page: LandingPage }) {
  return (
    <div className="relative z-10 -mt-10 px-4 sm:-mt-14 sm:px-6">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 sm:grid-cols-4">
        {page.impact.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 border-gray-100 px-4 py-6 text-center sm:px-6 sm:py-8 [&:nth-child(odd)]:border-r sm:[&:not(:last-child)]:border-r"
          >
            <dt className="order-2 max-w-[16ch] text-[11px] leading-snug text-gray-500 sm:text-xs">
              {item.label}
            </dt>
            <dd className="order-1 font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import { ChevronDown } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import LandingHeading, { LandingSection } from "./LandingSection";

/**
 * Section 9 of the required structure — FAQ. Plain <details> elements:
 * zero JavaScript, keyboard- and screen-reader-friendly by default.
 * The matching FAQPage schema is emitted by the page route.
 */
export default function LandingFaq({ page }: { page: LandingPage }) {
  return (
    <LandingSection id="faq" className="bg-gray-50/70">
      <LandingHeading
        eyebrow="FAQ"
        title="Your questions, answered"
        sub={`What patients ask us most about ${page.name.toLowerCase()} — answered the way we answer it in the room.`}
      />
      <div className="mx-auto mt-10 max-w-3xl space-y-3 sm:space-y-4">
        {page.faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-dolce-ink [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5 sm:text-lg">
              {f.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-dolce-green transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 sm:px-6 sm:text-base">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </LandingSection>
  );
}

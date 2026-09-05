import { CheckCircle2 } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import LandingHeading, { LandingSection } from "./LandingSection";

/** Section 4 of the required structure — Services Offered (the sub-services). */
export default function LandingServices({ page }: { page: LandingPage }) {
  return (
    <LandingSection id="services" className="bg-gray-50/70">
      <LandingHeading
        eyebrow="Services offered"
        title={page.services.heading}
        sub={page.services.intro}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {page.services.items.map((item) => (
          <article
            key={item.name}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-dolce-green via-dolce-moss to-dolce-bronze opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="flex items-start gap-2 text-lg font-bold text-dolce-ink">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-dolce-green" />
              {item.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.text}</p>
          </article>
        ))}
      </div>
    </LandingSection>
  );
}

import { HeartHandshake, MapPin, ReceiptText, Stethoscope } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import LandingHeading, { LandingSection } from "./LandingSection";

const ICONS = [Stethoscope, HeartHandshake, MapPin, ReceiptText];

/** Section 3 of the required structure — Why Choose Us. */
export default function LandingWhy({ page }: { page: LandingPage }) {
  return (
    <LandingSection id="why">
      <LandingHeading
        eyebrow="Why choose us"
        title="Care you can question — and still trust"
        sub="The same promise at every clinic in the group, whatever brings you in."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {page.why.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={item.title}
              className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-dolce-bronze/40 hover:shadow-lg sm:p-7"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-dolce-green/5 text-dolce-green transition-colors group-hover:bg-dolce-green group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-dolce-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
            </div>
          );
        })}
      </div>
    </LandingSection>
  );
}

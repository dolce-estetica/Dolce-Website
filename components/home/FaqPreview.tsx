import Link from "next/link";
import { faqs } from "@/lib/data/faqs";
import FaqAccordion from "@/components/shared/FaqAccordion";

/** The four questions the live home page highlights. */
const highlighted = [
  "Will my face look unnatural?",
  "Is it safe for Indian skin?",
  "What payment methods do you accept?",
  "Is it painful?",
];

export default function FaqPreview() {
  const items = highlighted
    .map((q) => faqs.find((f) => f.question === q))
    .filter((f): f is (typeof faqs)[number] => Boolean(f));

  return (
    <section className="relative w-full overflow-hidden bg-white py-6 sm:py-8 lg:py-12">
      <div className="pointer-events-none absolute top-[-120px] right-[-120px] hidden h-[400px] w-[400px] rounded-full border-[50px] border-dolce-green opacity-20 sm:block" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-8 text-center font-sans text-3xl font-bold text-dolce-ink sm:mb-12 sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>

        <FaqAccordion items={items} />

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-block rounded-full bg-dolce-green px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-dolce-green-light sm:text-base"
          >
            More Questions
          </Link>
        </div>
      </div>
    </section>
  );
}

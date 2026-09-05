import Image from "next/image";
import type { LandingPage } from "@/lib/data/landing-pages";
import LandingHeading, { LandingSection } from "./LandingSection";

/**
 * "How it works" — the numbered THE PROCESS section from the Bodycraft
 * reference: three steps, big serif numerals, optional supporting photograph.
 */
export default function LandingProcess({ page }: { page: LandingPage }) {
  const { heading, steps, image, imageAlt } = page.process;

  return (
    <LandingSection id="process">
      <LandingHeading eyebrow="The process" title={heading} />
      <div
        className={`mt-12 grid items-center gap-8 ${image ? "lg:grid-cols-5" : "max-w-5xl"}`}
      >
        <ol className={`grid gap-5 sm:grid-cols-3 ${image ? "lg:col-span-3" : ""}`}>
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <p className="text-[11px] font-bold tracking-[0.25em] text-dolce-bronze uppercase">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-bold text-dolce-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.text}</p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-3 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-dolce-green font-display text-xs font-bold text-white sm:flex"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl lg:col-span-2">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 384px, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </LandingSection>
  );
}

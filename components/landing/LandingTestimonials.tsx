import { BadgeCheck, Star } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import { landingPages, LANDING_TESTIMONIALS } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";
import LandingHeading, { LandingSection } from "./LandingSection";

/**
 * Section 7 of the required structure — Testimonials.
 * Renders ONLY the real Google reviews from lib/data/reviews.ts, rotated by
 * page so the seven landing pages do not read identically. Never invent
 * reviews — group compliance rule.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function LandingTestimonials({ page }: { page: LandingPage }) {
  // Rotate the real reviews so each landing page leads with a different one.
  const offset = Math.max(0, landingPages.findIndex((p) => p.slug === page.slug));
  const rotated = [...LANDING_TESTIMONIALS.slice(offset), ...LANDING_TESTIMONIALS.slice(0, offset)];

  return (
    <LandingSection id="testimonials">
      <LandingHeading
        eyebrow="Patient stories"
        title="What our patients say"
        sub="Verified reviews from Google — in our patients' own words."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {rotated.map((r) => (
          <figure
            key={r.author}
            className="flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
          >
            <Stars rating={r.rating} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-50 pt-5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${r.color} font-serif text-lg font-bold text-white`}
              >
                {r.initial}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-dolce-ink">{r.author}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                  {r.isLocalGuide && <BadgeCheck className="h-3.5 w-3.5 text-dolce-green" />}
                  {r.relative_time} · Google
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        Reviews are patients&apos; own words about their experience; individual experiences and
        outcomes differ.{" "}
        <a
          href={site.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-dolce-green underline underline-offset-2 hover:text-dolce-bronze"
        >
          Read all reviews on Google
        </a>
      </p>
    </LandingSection>
  );
}

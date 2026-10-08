import { BadgeCheck, Star } from "lucide-react";
import type { Review } from "@/lib/data/reviews";
import { GoogleIcon } from "@/components/shared/BrandIcons";

/**
 * The home page's Google review card ("What Our Clients Say"), shared so the
 * landing pages can render reviews in the exact same style.
 */
export default function GoogleReviewCard({
  review,
  className = "w-[300px] shrink-0 snap-center sm:w-[380px]",
  compactMobile = false,
}: {
  review: Review;
  className?: string;
  /** Smaller phone cards for the ad pages; sm+ and other callers stay unchanged. */
  compactMobile?: boolean;
}) {
  return (
    <article className={`flex flex-col rounded-3xl bg-gray-50 ${compactMobile ? "p-4" : "p-6"} sm:p-8 ${className}`}>
      <header className={`flex items-start ${compactMobile ? "gap-3 sm:gap-4" : "gap-4"}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${compactMobile ? "h-10 w-10 text-base" : "h-12 w-12 text-lg"} sm:h-14 sm:w-14 sm:text-xl ${review.color}`}
        >
          {review.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className={`truncate font-bold text-dolce-ink ${compactMobile ? "text-sm" : "text-base"} sm:text-lg`}>
              {review.author}
            </h3>
            <span className="h-3 w-3 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
            {review.isLocalGuide && (
              <span className="text-[10px] leading-tight font-bold text-orange-600 uppercase">
                Local Guide
              </span>
            )}
            <span>
              {review.reviewsCount} reviews • {review.relative_time}
            </span>
          </div>
        </div>
        <GoogleIcon className={`${compactMobile ? "h-4 w-4" : "h-5 w-5"} shrink-0 sm:h-6 sm:w-6`} />
      </header>

      {/*
        `role="img"` is what makes the label legal here: a bare <div> is a generic element,
        and generic elements do not permit aria-label, so the rating was being dropped by
        assistive tech and flagged as malformed ARIA. The role also collapses the star
        glyphs into a single labelled image instead of five anonymous SVGs.
      */}
      <div className={`${compactMobile ? "mt-3 sm:mt-5" : "mt-5"} flex gap-0.5`} role="img" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className={`${compactMobile ? "h-4 w-4 sm:h-5 sm:w-5" : "h-5 w-5"} fill-amber-400 text-amber-400`} />
        ))}
      </div>

      <p className={`${compactMobile ? "mt-3 leading-5 sm:mt-5 sm:leading-relaxed" : "mt-5 leading-relaxed"} flex-1 text-sm text-gray-600 sm:text-base`}>
        &ldquo;{review.text}&rdquo;
      </p>

      <footer className={`${compactMobile ? "mt-4 pt-3 sm:mt-6 sm:pt-4" : "mt-6 pt-4"} flex items-center justify-between border-t border-gray-200 text-[11px] font-bold tracking-wider text-gray-400 uppercase`}>
        <span className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-blue-500" />
          Verified Visit
        </span>
        <span>Helpful?</span>
      </footer>
    </article>
  );
}

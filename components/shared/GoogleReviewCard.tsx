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
}: {
  review: Review;
  className?: string;
}) {
  return (
    <article className={`flex flex-col rounded-3xl bg-gray-50 p-6 sm:p-8 ${className}`}>
      <header className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white sm:h-14 sm:w-14 sm:text-xl ${review.color}`}
        >
          {review.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-bold text-dolce-ink sm:text-lg">
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
        <GoogleIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
      </header>

      {/*
        `role="img"` is what makes the label legal here: a bare <div> is a generic element,
        and generic elements do not permit aria-label, so the rating was being dropped by
        assistive tech and flagged as malformed ARIA. The role also collapses the star
        glyphs into a single labelled image instead of five anonymous SVGs.
      */}
      <div className="mt-5 flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
        &ldquo;{review.text}&rdquo;
      </p>

      <footer className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
        <span className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-blue-500" />
          Verified Visit
        </span>
        <span>Helpful?</span>
      </footer>
    </article>
  );
}

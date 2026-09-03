import { BadgeCheck, ExternalLink, Star } from "lucide-react";
import { reviews, type Review } from "@/lib/data/reviews";
import { GoogleIcon } from "@/components/shared/BrandIcons";
import { site } from "@/lib/site";

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex w-[300px] shrink-0 snap-center flex-col rounded-3xl bg-gray-50 p-6 sm:w-[380px] sm:p-8">
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

export default function TestimonialsSection() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <GoogleIcon className="h-5 w-5" />
          <span className="text-xs font-bold tracking-[0.15em] text-gray-700 uppercase">
            Google Reviews
          </span>
        </span>

        <h2 className="mt-6 font-sans text-3xl font-bold text-dolce-ink sm:text-4xl lg:text-5xl">
          What Our Clients Say
        </h2>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="text-4xl font-bold text-dolce-ink sm:text-5xl">4.9</span>
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400 sm:h-7 sm:w-7" />
            ))}
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-500 sm:text-base">
          Based on 250+ reviews across India
        </p>

        <a
          href={site.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline sm:text-base"
        >
          Write a Review
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Mobile: swipe. Desktop: gentle auto-scrolling marquee. */}
      <div className="scrollbar-hide mt-12 w-full snap-x snap-mandatory overflow-x-auto px-4 md:snap-none md:overflow-hidden md:px-0">
        <div className="flex w-max gap-6 pb-2 md:animate-marquee">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.author}-${i}`} review={review} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <div className="rounded-[2rem] bg-dolce-green px-6 py-10 text-center sm:px-10 sm:py-14">
          <h3 className="font-sans text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Have you visited us recently?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Share your experience and help others discover their natural beauty.
          </p>
          <a
            href={site.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 text-base font-bold text-dolce-ink shadow-lg transition-transform hover:-translate-y-0.5 sm:text-lg"
          >
            <GoogleIcon className="h-6 w-6" />
            Review us on Google
          </a>
        </div>
      </div>
    </section>
  );
}

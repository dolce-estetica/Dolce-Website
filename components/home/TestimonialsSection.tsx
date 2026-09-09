import { ExternalLink, Star } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import GoogleReviewCard from "@/components/shared/GoogleReviewCard";
import { GoogleIcon } from "@/components/shared/BrandIcons";
import { site } from "@/lib/site";

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
            <GoogleReviewCard key={`${review.author}-${i}`} review={review} />
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

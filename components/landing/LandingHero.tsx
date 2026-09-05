import Image from "next/image";
import { CalendarCheck, Phone, ShieldCheck, Star } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";

/**
 * Section 1 of the required structure — banner with service-specific heading
 * and subheading. Clean split layout: copy on the left, the service's real
 * photograph in a framed card on the right with a floating Google-rating
 * badge. On mobile the photo sits between the copy and the CTAs so the first
 * viewport shows text AND photography. Full-bleed overlay heroes were tried
 * and rejected — they read dark and muddy with stock photography; this
 * layout stays light and premium.
 */
export default function LandingHero({ page }: { page: LandingPage }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-dolce-sand/25 via-white to-white">
      {/* Soft sand blob behind the photo card for depth. */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-dolce-sand/30 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-start lg:gap-14 lg:py-20">
        {/* Copy */}
        <div>
          <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-dolce-bronze uppercase sm:text-xs sm:tracking-[0.25em]">
            {page.hero.eyebrow}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold text-dolce-green sm:text-5xl lg:text-[3.4rem]">
            {page.hero.heading}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {page.hero.subheading}
          </p>
        </div>

        {/* Photo — after the copy on mobile, right column on desktop */}
        <div className="relative mx-auto w-full max-w-md lg:mt-2 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-dolce-green/15 ring-1 ring-gray-100 sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src={page.hero.image}
              alt={page.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 576px, calc(100vw - 32px)"
              className="object-cover"
            />
          </div>

          {/* Floating rating badge */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-gray-100 backdrop-blur sm:left-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-dolce-green/10">
              <Star className="h-5 w-5 fill-dolce-bronze text-dolce-bronze" />
            </span>
            <span>
              <span className="block text-sm font-bold text-dolce-ink">4.6 on Google</span>
              <span className="block text-xs text-gray-500">Verified patient reviews</span>
            </span>
          </div>
        </div>

        {/* CTAs — below the photo on mobile, left column on desktop */}
        <div className="mt-4 lg:col-start-1 lg:mt-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-dolce-green px-8 py-4 text-sm font-bold text-white shadow-xl shadow-dolce-green/20 transition-colors hover:bg-dolce-green-light sm:text-base"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Consultation
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-dolce-green/25 bg-white px-8 py-4 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-green/5 sm:text-base"
            >
              <Phone className="h-5 w-5" />
              Call {site.phone}
            </a>
          </div>

          {page.hero.trustChips.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {page.hero.trustChips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-dolce-green/15 bg-dolce-green/5 px-3.5 py-1.5 text-xs font-semibold text-dolce-green"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-dolce-bronze" />
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { CalendarCheck, Phone } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";

/**
 * Section 1 of the required structure — banner with service-specific heading
 * and subheading over a real brand photograph. The two primary CTAs are the
 * anchors the sticky bar reuses: #book (lead form) and the phone line.
 */
export default function LandingHero({ page }: { page: LandingPage }) {
  return (
    <section className="relative isolate overflow-hidden bg-dolce-green">
      <Image
        src={page.hero.image}
        alt={page.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      {/* Overlay keeps white text readable over any photo, premium-green grade. */}
      <div className="absolute inset-0 bg-gradient-to-r from-dolce-green via-dolce-green/80 to-dolce-green/40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dolce-green to-transparent" />

      <div className="relative mx-auto flex min-h-[82svh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-dolce-sand uppercase sm:text-xs sm:tracking-[0.25em]">
          {page.hero.eyebrow}
        </p>
        <h1 className="max-w-3xl font-serif text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
          {page.hero.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {page.hero.subheading}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-dolce-green shadow-xl transition-colors hover:bg-dolce-sand sm:text-base"
          >
            <CalendarCheck className="h-5 w-5" />
            Book a Consultation
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:text-base"
          >
            <Phone className="h-5 w-5" />
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

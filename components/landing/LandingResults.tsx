import Image from "next/image";
import { Images } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import LandingHeading, { LandingSection } from "./LandingSection";

/**
 * Section 6 of the required structure — Before/After.
 *
 * Renders real, consented before/after photo pairs when `page.results.pairs`
 * is filled (client supplies the photos — drop them in /public and list them
 * in lib/data/landing-pages.ts). Until then it shows the honest panel below:
 * group policy is NO stock/AI before-after imagery, and outcome photos for
 * scheduled conditions are shared privately at the consultation.
 */
export default function LandingResults({ page }: { page: LandingPage }) {
  const hasPairs = page.results.pairs.length > 0;

  return (
    <LandingSection id="results" className="bg-dolce-green">
      <LandingHeading eyebrow="Before & after" title={page.results.heading} tone="dark" />
      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/80 sm:text-lg">
        {page.results.text}
      </p>

      {hasPairs ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.results.pairs.map((pair) => (
            <figure
              key={pair.label}
              className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-white/20"
            >
              <div className="grid grid-cols-2 gap-px bg-gray-100">
                <div className="relative aspect-square">
                  <Image
                    src={pair.before}
                    alt={`${pair.label} — before treatment`}
                    fill
                    sizes="(min-width: 640px) 224px, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                    Before
                  </span>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src={pair.after}
                    alt={`${pair.label} — after treatment`}
                    fill
                    sizes="(min-width: 640px) 224px, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 right-2 rounded-full bg-dolce-green px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                    After
                  </span>
                </div>
              </div>
              <figcaption className="px-5 py-4 text-sm font-semibold text-dolce-ink">
                {pair.label}
              </figcaption>
            </figure>
          ))}
          <p className="sm:col-span-2 lg:col-span-3 text-center text-xs text-white/50">
            Photographs of consenting patients, shared with permission. Individual results vary
            with diagnosis, skin type and the plan followed.
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-white/15 bg-white/5 p-8 text-center sm:p-10">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-dolce-bronze/20 text-dolce-sand">
            <Images className="h-7 w-7" />
          </span>
          <p className="text-base leading-relaxed text-white/85 sm:text-lg">
            <strong className="text-white">Real photos, shown in person.</strong> At your
            consultation we show you photographs of consenting patients with concerns like
            yours — on screen, in the room, with the doctor who can explain them. Nothing on
            this page is stock or AI-generated, because you deserve to trust what you see.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-sand"
          >
            See real cases at your consultation
          </a>
        </div>
      )}
    </LandingSection>
  );
}

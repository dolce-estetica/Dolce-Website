"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { LandingResultPair } from "@/lib/data/landing-pages";

export default function ResultsGallery({ pairs }: { pairs: LandingResultPair[] }) {
  const galleryId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const move = (index: number) => {
    const element = track.current;
    const card = element?.children[index] as HTMLElement | undefined;
    if (element && card) element.scrollTo({ left: card.offsetLeft - (element.firstElementChild as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <div className="mt-10" role="region" aria-roledescription="carousel" aria-label="Patient treatment results">
      <div
        ref={track}
        id={galleryId}
        tabIndex={0}
        aria-label="Swipe or use the arrow buttons to view patient results"
        className={`lp-results-track ${pairs.length === 1 ? "lp-results-single" : ""}`}
        onScroll={() => {
          const element = track.current;
          if (!element) return;
          const step = element.children[1] ? (element.children[1] as HTMLElement).offsetLeft - (element.children[0] as HTMLElement).offsetLeft : element.clientWidth;
          setActive(Math.round(element.scrollLeft / step));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(Math.max(0, Math.min(pairs.length - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
          }
        }}
      >
        {pairs.map((pair, index) => (
          <figure key={pair.label} className="lp-result-card" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${pairs.length}: ${pair.label}`}>
            {pair.before === pair.after ? (
              <div className="relative bg-white" style={{ aspectRatio: pair.aspectRatio ?? 2 }}>
                <Image src={pair.before} alt={`Before and after: ${pair.label}`} fill sizes="(min-width: 1024px) 580px, (min-width: 640px) 90vw, 100vw" className="object-contain" />
                {pair.labelLayout !== "embedded" && (
                  <>
                    <span className="lp-result-label left-3">Before</span>
                    <span className="lp-result-label right-3" style={pair.labelLayout === "stacked" ? { top: "calc(50% + 12px)" } : undefined}>After</span>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 bg-white">
                {[pair.before, pair.after].map((src, side) => (
                  <div key={src} className="relative aspect-[4/5]">
                    <Image src={src} alt={`${side === 0 ? "Before" : "After"}: ${pair.label}`} fill sizes="(min-width: 1024px) 290px, 50vw" className="object-contain" />
                    <span className={`lp-result-label ${side === 0 ? "left-3" : "right-3"}`}>{side === 0 ? "Before" : "After"}</span>
                  </div>
                ))}
              </div>
            )}
            <figcaption className="flex-1 p-5 text-left sm:p-6">
              <p className="text-base font-bold text-dolce-green">{pair.label}</p>
              {pair.caption && <p className="mt-2 text-sm leading-relaxed text-gray-600">{pair.caption}</p>}
              {pair.timeline && <p className="mt-2 text-sm font-medium text-dolce-green">{pair.timeline}</p>}
              <p className="mt-2 text-xs leading-relaxed text-gray-500">Individual results vary. Your doctor will explain the treatment plan and expected timeline.</p>
            </figcaption>
          </figure>
        ))}
      </div>
      {pairs.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-5 lg:hidden">
          <button type="button" className="lp-gallery-arrow" aria-label="Previous result" aria-controls={galleryId} disabled={active === 0} onClick={() => move(active - 1)}><ArrowLeft className="h-5 w-5" /></button>
          <p className="text-sm text-dolce-green" aria-live="polite">{active + 1} / {pairs.length}</p>
          <button type="button" className="lp-gallery-arrow" aria-label="Next result" aria-controls={galleryId} disabled={active >= pairs.length - 1} onClick={() => move(active + 1)}><ArrowRight className="h-5 w-5" /></button>
        </div>
      )}
    </div>
  );
}

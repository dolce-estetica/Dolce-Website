"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { treatmentCards } from "@/lib/data/treatments";
import { serviceCategories } from "@/lib/data/services";

/** The row is the five cards repeated so the strip always fills a wide screen. */
const cards = [...treatmentCards, ...treatmentCards, ...treatmentCards];

/** Fan the cards outward from the centre of each group of five. */
const rotations = [-12, -6, 0, 6, 12];

function maskFor(index: number) {
  if (index === 0) {
    return "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 50%, black 100%)";
  }
  if (index === 4) {
    return "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.35) 50%, black 100%)";
  }
  return undefined;
}

export default function TreatmentsSection() {
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    // Touch devices already scroll natively; only take over for mouse drags.
    if (e.pointerType === "touch" || !scroller.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: scroller.current.scrollLeft,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !scroller.current) return;
    scroller.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section id="treatments" className="relative w-full bg-white py-12 lg:py-20">
      <div className="relative z-10">
        <h2 className="mb-8 px-4 text-center font-sans text-3xl font-bold text-dolce-ink sm:text-4xl lg:mb-10 lg:text-5xl">
          Care &amp; Treatments
        </h2>

        <div className="relative mx-auto mb-10 w-full overflow-hidden">
          {/* Edge fades — narrower on phones so they don't swallow a whole card */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-32" />

          <div
            ref={scroller}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="scrollbar-hide cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
            style={{ perspective: "1100px" }}
          >
            <div className="flex items-center justify-start gap-4 px-4 pb-4 lg:gap-6">
              {cards.map((card, i) => (
                <div
                  key={`${card.src}-${i}`}
                  className="relative flex-shrink-0 overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    width: "clamp(200px, 60vw, 340px)",
                    height: "clamp(200px, 60vw, 340px)",
                    transform: `perspective(900px) rotateY(${rotations[i % 5]}deg)`,
                    transformOrigin: "center",
                    maskImage: maskFor(i % 5),
                    WebkitMaskImage: maskFor(i % 5),
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full rounded-3xl object-cover select-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-50 flex flex-col items-center px-4 py-4">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="group relative z-50 flex items-center gap-2 rounded-full border-2 border-dolce-moss bg-white px-8 py-3 text-base font-medium text-dolce-moss transition-all duration-300 hover:bg-dolce-moss hover:text-white hover:shadow-lg sm:px-14 sm:py-4 sm:text-lg"
          >
            See all Services
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="mt-8 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(serviceCategories).map(([category, items]) => (
                <div
                  key={category}
                  className="rounded-3xl border border-gray-100 bg-white p-6 text-left shadow-sm"
                >
                  <h3 className="mb-4 font-serif text-xl font-bold text-dolce-green">{category}</h3>
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/booking?category=${encodeURIComponent(
                            category,
                          )}&service=${encodeURIComponent(item)}`}
                          className="text-sm leading-relaxed text-gray-600 transition-colors hover:text-dolce-bronze"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

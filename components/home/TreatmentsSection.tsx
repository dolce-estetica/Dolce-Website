import Link from "next/link";
import Image from "next/image";
import { treatmentCards } from "@/lib/data/treatments";
import { serviceCategories } from "@/lib/data/services";
import DragScroller from "./DragScroller";
import ServicesDisclosure from "./ServicesDisclosure";

/**
 * Server component. Only the drag-scroll and the disclosure toggle need to run in the
 * browser, and those are separate client islands — so the fifteen cards and the whole
 * service catalogue are rendered once on the server and never hydrated.
 */

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

          <DragScroller
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
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    draggable={false}
                    // The card never paints wider than 340px, so there is no reason to
                    // send the full 1080px master to anyone.
                    sizes="(max-width: 640px) 60vw, 340px"
                    className="rounded-3xl object-cover select-none"
                  />
                </div>
              ))}
            </div>
          </DragScroller>
        </div>

        <div className="relative z-50 flex flex-col items-center px-4 py-4">
          <ServicesDisclosure>
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
          </ServicesDisclosure>
        </div>
      </div>
    </section>
  );
}

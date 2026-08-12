"use client";

import { useMemo, useState } from "react";
import { faqs } from "@/lib/data/faqs";
import FaqAccordion from "@/components/shared/FaqAccordion";

const categories = [
  "All",
  "General",
  "Chemical Peels",
  "Laser",
  "Botox",
  "Fillers",
  "Microneedling",
  "Skin Boosters",
  "Skin Care",
  "Hair Care",
];

export default function FaqBrowser() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => (active === "All" ? faqs : faqs.filter((f) => f.category === active)),
    [active],
  );

  return (
    <>
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
          Filter by:
        </p>
        {/* Chips scroll sideways on phones instead of wrapping into a tall block */}
        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
                active === category
                  ? "border-dolce-green bg-dolce-green text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-dolce-green/40 hover:text-dolce-green"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <FaqAccordion items={visible} showCategory={active === "All"} />

      {visible.length === 0 && (
        <p className="py-12 text-center text-gray-500">No questions in this category yet.</p>
      )}
    </>
  );
}

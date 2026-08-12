"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/data/faqs";

type Props = {
  items: Faq[];
  /** Show the small category label above each question. */
  showCategory?: boolean;
};

export default function FaqAccordion({ items, showCategory = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={`${item.category}-${item.question}`}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="min-w-0">
                {showCategory && (
                  <span className="mb-1 block text-[10px] font-bold tracking-[0.2em] text-dolce-bronze uppercase">
                    {item.category}
                  </span>
                )}
                <span className="block text-base font-semibold text-dolce-ink sm:text-lg">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-dolce-green transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 sm:px-6 sm:pb-6 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

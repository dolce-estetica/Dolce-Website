"use client";

import { useConcern } from "./ConcernContext";

/**
 * The concern chips on the pre-form section above #book.
 *
 * React state keeps the chips, main form and mobile form in sync.
 */
export default function ConcernPicker({ concerns }: { concerns: string[] }) {
  const { concern: active, setConcern } = useConcern();

  const pick = (concern: string) => {
    setConcern(concern);
    document.getElementById("book")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };

  return (
    <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
      {concerns.map((c) => (
        <li key={c}>
          <button
            type="button"
            onClick={() => pick(c)}
            aria-pressed={active === c}
            className={`inline-flex min-h-11 touch-manipulation items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              active === c
                ? "border-dolce-green bg-dolce-green text-white"
                : "border-[#DCE3D7] bg-white text-dolce-green hover:border-dolce-green hover:bg-[#FAFBF9]"
            }`}
          >
            {c}
          </button>
        </li>
      ))}
    </ul>
  );
}

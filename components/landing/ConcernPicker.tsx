"use client";

import { useState } from "react";

/**
 * The concern chips on the pre-form section above #book.
 *
 * Clicking a chip scrolls to the booking form AND pre-selects that concern
 * in the lead form's <select id="lp-concern">. The select is a React
 * controlled element, so the value is applied through the native value
 * setter before dispatching a bubbled change event — otherwise React's
 * state (and therefore the CRM payload) would stay empty.
 */
export default function ConcernPicker({ concerns }: { concerns: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  const pick = (concern: string) => {
    setActive(concern);
    const select = document.getElementById("lp-concern") as HTMLSelectElement | null;
    if (select) {
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
      if (setter) setter.call(select, concern);
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
      {concerns.map((c) => (
        <li key={c}>
          <button
            type="button"
            onClick={() => pick(c)}
            aria-pressed={active === c}
            className={`inline-flex touch-manipulation items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
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

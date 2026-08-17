"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * The "See all Services" toggle. Only the button needs state — the panel itself is
 * server-rendered and handed over as children, so the full service catalogue stays out of
 * the client bundle.
 */
export default function ServicesDisclosure({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
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

      {open && children}
    </>
  );
}

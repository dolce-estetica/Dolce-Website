"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { locations } from "@/lib/data/locations";

type Props = {
  /** "hero" is the glass pill over the video; "footer" is the dark panel version. */
  tone?: "hero" | "footer";
};

export default function LocationsMenu({ tone = "hero" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={
          tone === "hero"
            ? "group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 sm:w-auto sm:px-6"
            : "group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:bg-white/10"
        }
      >
        <div className="flex items-center gap-3">
          <div
            className={
              tone === "hero"
                ? "flex h-10 w-10 items-center justify-center rounded-full border border-dolce-sand/40 bg-dolce-sand/20 transition-all duration-300 group-hover:bg-dolce-sand group-hover:text-dolce-green"
                : "flex h-8 w-8 items-center justify-center rounded-lg border border-dolce-sand/30 bg-dolce-sand/10"
            }
          >
            <MapPin
              className={tone === "hero" ? "h-5 w-5 text-white" : "h-4 w-4 text-dolce-sand"}
            />
          </div>
          <span
            className={
              tone === "hero"
                ? "text-sm font-bold tracking-wide text-white uppercase drop-shadow-md"
                : "font-medium"
            }
          >
            {tone === "hero" ? "Our locations" : "Find our locations"}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            tone === "hero" ? "text-white/60" : "text-white/40"
          } ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-50 max-h-[60vh] w-full overflow-y-auto overscroll-contain rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 sm:w-80 ${
            tone === "hero" ? "top-full left-1/2 mt-3 -translate-x-1/2" : "bottom-full left-0 mb-3"
          }`}
        >
          {locations.map((loc) => (
            <a
              key={loc.city}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `Dolce Estetica ${loc.address}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl px-4 py-3 text-left transition-colors hover:bg-dolce-green/5"
            >
              <span className="block text-sm font-bold text-dolce-green">
                {loc.city}
                <span className="ml-2 text-[10px] font-medium tracking-wider text-dolce-bronze uppercase">
                  {loc.state}
                </span>
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                {loc.address}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

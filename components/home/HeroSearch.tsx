"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

/** The hero's concern-search box. The only part of the hero that needs form state. */
export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/booking?q=${encodeURIComponent(query.trim())}` : "/booking");
  };

  return (
    <form
      onSubmit={search}
      className="flex w-full max-w-2xl flex-col items-center gap-4 sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:border-white/20 sm:bg-white/10 sm:p-2 sm:shadow-2xl sm:backdrop-blur-xl"
    >
      <div className="relative flex w-full items-center rounded-full border border-white/20 bg-white/10 px-5 py-3.5 backdrop-blur-md sm:border-none sm:bg-transparent sm:px-6 sm:py-2 sm:backdrop-blur-none">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Share your concerns..."
          aria-label="Share your concerns"
          autoComplete="off"
          className="w-full bg-transparent text-base font-medium text-white placeholder-white/60 selection:bg-white/30 outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="group/search flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dolce-sand/40 bg-dolce-sand/20 transition-all duration-300 hover:bg-dolce-sand hover:text-dolce-green"
        >
          <Search className="h-5 w-5 text-white transition-colors group-hover/search:text-dolce-green" />
        </button>
      </div>
      <a href="/booking" className="w-full sm:w-auto">
        <span className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold whitespace-nowrap text-dolce-green shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#f0f0f0] hover:shadow-xl active:scale-95 sm:py-3">
          Book Now
          <ArrowRight className="h-4 w-4" />
        </span>
      </a>
    </form>
  );
}

import { site } from "@/lib/site";

/** Thin bar above the header: regions on the left, strapline on the right. */
export default function TopBar() {
  return (
    <div className="w-full overflow-hidden border-b border-white/10 bg-black/10 px-4 py-2 text-white/90 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] font-medium tracking-wide sm:text-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-4">
            <div className="group flex cursor-pointer items-center gap-1.5">
              <span className="text-white transition-colors group-hover:text-dolce-sand">
                United Kingdom
              </span>
              <span className="text-sm">🇬🇧</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="group flex cursor-pointer items-center gap-1.5">
              <span className="text-white transition-colors group-hover:text-dolce-sand">
                India
              </span>
              <span className="text-sm">🇮🇳</span>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-4 text-white/80 sm:flex">
          <span className="tracking-[0.2em]">{site.tagline}</span>
        </div>
      </div>
    </div>
  );
}

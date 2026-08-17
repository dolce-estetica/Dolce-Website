import Image from "next/image";
import LocationsMenu from "@/components/layout/LocationsMenu";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/shared/BrandIcons";
import { site } from "@/lib/site";
import HeroBackdrop from "./HeroBackdrop";
import HeroSearch from "./HeroSearch";

/**
 * Server component. The poster, the gradient and the social links are plain markup; only
 * the backdrop carousel, the search box and the locations menu are client islands.
 *
 * That split matters for more than bundle size: the poster is the largest element painted
 * on first load, and keeping it out of a client component means it is on screen before any
 * JavaScript has run.
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {/*
         * Always-on base layer — the loop's own first frame. Everything the backdrop adds
         * fades in over the top, so "slide 0" is just an unobscured poster.
         *
         * NOT sizes="100vw". This is a full-bleed `object-cover` background, so in a
         * portrait viewport it is the viewport *height* that decides how many pixels are
         * needed — the 16:9 art gets cropped to a tall sliver and scaled up. At 100vw a
         * phone received a 750px-wide file stretched about 4x, and it showed. Over-stating
         * the slot in vw asks for the resolution the crop actually needs; these smooth
         * backgrounds are ~25KB as AVIF even at 2048px, so sharpness is effectively free.
         */}
        <Image
          src="/bgs/hero-poster.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 250vw, 120vw"
          className="object-cover"
        />
        <HeroBackdrop />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-40 sm:px-8 sm:pt-36 sm:pb-32 md:px-12">
          <HeroSearch />

          <div className="mt-6 flex w-full max-w-2xl justify-center sm:w-auto">
            <LocationsMenu tone="hero" />
          </div>
        </div>

        <div className="absolute right-4 bottom-4 flex items-center gap-4 rounded-full border-2 border-white/10 bg-white/20 px-4 py-3 backdrop-blur-md sm:right-8 sm:bottom-8 sm:px-6 lg:px-10 lg:py-6">
          <a
            href={site.social.facebook}
            aria-label="Facebook"
            className="text-white transition-colors hover:text-dolce-sand active:scale-90"
          >
            <FacebookIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </a>
          <a
            href={site.social.twitter}
            aria-label="X"
            className="text-white transition-colors hover:text-dolce-sand active:scale-90"
          >
            <XIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </a>
          <a
            href={site.social.instagram}
            aria-label="Instagram"
            className="text-white transition-colors hover:text-dolce-sand active:scale-90"
          >
            <InstagramIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </a>
        </div>
      </div>
    </section>
  );
}

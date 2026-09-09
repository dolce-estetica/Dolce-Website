import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/shared/BrandIcons";

/**
 * Minimal footer for the ad landing pages, per client instruction:
 * logo on the left (NOT linked to the homepage); Instagram icon and the
 * Privacy Policy link on the right — nothing else, no other outbound links.
 */
export default function LandingFooter() {
  return (
    <footer className="w-full bg-dolce-green pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Image
          src="/assets/logo.webp"
          alt="Dolce Estetica"
          width={400}
          height={148}
          className="h-11 w-auto"
        />

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/dolceesteticaclinic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <Link
            href="/privacy-policy"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl border-t border-white/10 px-4 pt-4 text-center text-xs text-white/40 sm:px-6">
        © {new Date().getFullYear()} Dolce Estetica. All rights reserved.
      </div>
    </footer>
  );
}

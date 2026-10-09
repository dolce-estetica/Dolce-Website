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
    <footer className="w-full border-t border-[#E3E8DF] bg-white pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 text-dolce-green">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Image
          src="/assets/logo.webp"
          alt="Dolce Estetica"
          width={400}
          height={148}
          className="lp-brand-logo h-11 w-auto"
        />

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/dolceesteticaclinic/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3E8DF] bg-[#FAFBF9] transition-colors hover:bg-dolce-green/5"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-600 transition-colors hover:text-dolce-green"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl border-t border-[#E3E8DF] px-4 pt-4 text-center text-xs text-gray-500 sm:px-6">
        © {new Date().getFullYear()} Dolce Estetica. All rights reserved.
      </div>
    </footer>
  );
}

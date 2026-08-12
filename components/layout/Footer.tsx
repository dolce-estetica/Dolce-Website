import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/shared/BrandIcons";
import LocationsMenu from "./LocationsMenu";

const serviceLinks = [
  { label: "Skin Perfection", category: "Face & Skin Perfection" },
  { label: "Hair Revival", category: "Hair & Scalp Revival" },
  { label: "Body Transformation", category: "Body Skin Transformation" },
  { label: "Signature Programs", category: "Signature Dolce Programs" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Longevity", href: "/longevity" },
  { label: "Event & Media", href: "/event-and-media" },
  { label: "Careers", href: "/career" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const socialClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:bg-dolce-sand hover:text-dolce-green";

  return (
    <footer className="w-full bg-dolce-green pt-14 pb-8 text-white sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.png"
                alt="Dolce Estetica"
                width={280}
                height={140}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Dolce Estetica is a premium beauty and aesthetics clinic dedicated to enhancing your
              natural beauty through advanced technology and personalized care.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-dolce-sand sm:mb-6">Our Services</h3>
            <ul className="space-y-3.5">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link
                    href={`/booking?category=${encodeURIComponent(s.category)}`}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-dolce-sand"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-dolce-sand sm:mb-6">Quick Links</h3>
            <ul className="space-y-3.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-dolce-sand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-dolce-sand">Get In Touch</h3>
            <div className="space-y-4 text-sm text-white/70">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 transition-colors hover:text-dolce-sand"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-dolce-sand/30 group-hover:bg-dolce-sand/10">
                  <Mail className="h-4 w-4 text-dolce-sand" />
                </span>
                <span className="break-all">{site.email}</span>
              </a>
              <a
                href={site.phoneHref}
                className="group flex items-center gap-3 transition-colors hover:text-dolce-sand"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-dolce-sand/30 group-hover:bg-dolce-sand/10">
                  <Phone className="h-4 w-4 text-dolce-sand" />
                </span>
                {site.phone}
              </a>
              <LocationsMenu tone="footer" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a href={site.social.facebook} aria-label="Facebook" className={socialClass}>
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href={site.social.twitter} aria-label="X" className={socialClass}>
                <XIcon className="h-5 w-5" />
              </a>
              <a href={site.social.instagram} aria-label="Instagram" className={socialClass}>
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:mt-16 sm:flex-row">
          <p className="text-center text-xs text-white/50 sm:text-left">
            © {new Date().getFullYear()} Dolce Estetica. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { serviceCategories } from "@/lib/data/services";
import { navLinks, site } from "@/lib/site";

type Props = {
  /** "transparent" floats over the hero; "solid" sits on the deep green bar. */
  variant?: "transparent" | "solid";
};

export default function Navbar({ variant = "solid" }: Props) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Lock body scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const categories = Object.keys(serviceCategories);

  return (
    <>
      <header
        className={[
          "relative z-[100] w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6",
          variant === "solid" ? "bg-dolce-green" : "",
        ].join(" ")}
      >
        <div className="flex min-h-[56px] items-center justify-between gap-4 sm:min-h-[70px] lg:min-h-[90px]">
          <Link href="/" className="flex items-center gap-3" aria-label="Dolce Estetica home">
            <Image
              src="/assets/logo.webp"
              alt="Dolce Estetica"
              // The master is 400x148; the old 360x180 squashed it and reserved the
              // wrong box, which shifted the header once the file arrived.
              width={400}
              height={148}
              priority
              className="h-[42px] w-auto transition-all duration-300 sm:h-[56px] md:h-[70px] lg:h-[90px]"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="relative z-[101] hidden rounded-full bg-white/20 px-10 py-5 backdrop-blur-lg lg:flex lg:items-center lg:px-14 lg:py-6">
            <ul className="flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <li
                    key={link.label}
                    className="group relative flex h-full items-center"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex items-center gap-1 py-4 text-sm text-white transition-colors hover:text-dolce-sand lg:text-lg"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 w-[560px] -translate-x-1/2 pt-2">
                        <div className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
                          {categories.map((category) => (
                            <Link
                              key={category}
                              href={`/booking?category=${encodeURIComponent(category)}`}
                              className="rounded-2xl px-4 py-3 transition-colors hover:bg-dolce-green/5"
                            >
                              <span className="block text-base font-semibold text-dolce-green">
                                {category}
                              </span>
                              <span className="mt-1 block text-xs text-gray-500">
                                {serviceCategories[category].length} treatments
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white transition-colors hover:text-dolce-sand lg:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Mobile trigger */}
          <div className="ml-auto flex items-center lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="group relative rounded-2xl border-2 border-white/30 bg-white/10 p-3 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-white/20 active:scale-95"
            >
              <Menu className="h-7 w-7 text-white drop-shadow-md" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {/*
        `inert` matters as much as `aria-hidden` here. The closed panel is only moved
        off-screen with a transform, so its links and buttons stayed in the tab order —
        keyboard users could tab into an invisible menu, and marking the wrapper
        aria-hidden while it still held focusable children is malformed ARIA. `inert`
        takes the whole subtree out of both the tab order and the accessibility tree.
      */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-dolce-green shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Image
              src="/assets/logo.webp"
              alt="Dolce Estetica"
              width={400}
              height={148}
              className="h-11 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/20 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <li key={link.label}>
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-lg text-white transition-colors hover:bg-white/10"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <ul className="mt-1 mb-2 space-y-1 border-l border-white/15 pl-3">
                        {categories.map((category) => (
                          <li key={category}>
                            <Link
                              href={`/booking?category=${encodeURIComponent(category)}`}
                              className="block rounded-lg px-3 py-3 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-dolce-sand"
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-3 py-3.5 text-lg text-white transition-colors hover:bg-white/10 hover:text-dolce-sand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="space-y-3 border-t border-white/10 px-5 py-5">
            <Link
              href="/booking"
              className="block rounded-full bg-white px-6 py-3.5 text-center text-base font-bold text-dolce-green transition-colors hover:bg-dolce-sand"
            >
              Book Now
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

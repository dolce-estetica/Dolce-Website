import type { Metadata } from "next";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "./ContactForm";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Dolce Estetica",
  description:
    "Locate our premium clinics across India or send an inquiry to the Dolce Estetica team.",
};

export default function ContactPage() {
  const flagship = locations[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <Navbar variant="solid" />

      <section className="mx-auto max-w-7xl px-4 py-12 text-center lg:py-20">
        <h1 className="mb-4 font-serif text-4xl font-bold text-dolce-green sm:text-5xl lg:text-7xl">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-2xl text-gray-500 lg:text-lg">
          Experience aesthetic excellence. Locate our premium clinics or send us a request below.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dolce-green/5">
                  <MapPin className="h-5 w-5 text-dolce-green" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
                    {flagship.city} Clinic
                  </h2>
                  <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-dolce-bronze uppercase">
                    Our Flagship Outlet
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {flagship.address}
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-dolce-green hover:text-dolce-bronze"
                  >
                    <Phone className="h-4 w-4" />
                    {flagship.phone}
                  </a>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Dolce Estetica ${flagship.address}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-dolce-green/20 px-6 py-3.5 text-xs font-bold tracking-[0.2em] text-dolce-green uppercase transition-colors hover:bg-dolce-green hover:text-white"
              >
                <Navigation className="h-4 w-4" />
                Directions
              </a>
            </div>

            <div className="rounded-[2rem] bg-dolce-green p-6 text-white sm:p-8">
              <h2 className="text-[10px] font-bold tracking-[0.3em] text-dolce-sand uppercase">
                Connect
              </h2>
              <div className="mt-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                  Clinic Email
                </p>
                <a
                  href={`mailto:${site.clinicEmail}`}
                  className="mt-2 flex items-center gap-3 text-base font-medium break-all transition-colors hover:text-dolce-sand sm:text-lg"
                >
                  <Mail className="h-5 w-5 shrink-0 text-dolce-sand" />
                  {site.clinicEmail}
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {locations.slice(1).map((loc) => (
                <div
                  key={loc.city}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <p className="text-sm font-bold text-dolce-green">
                    {loc.city}
                    <span className="ml-2 text-[10px] font-medium tracking-wider text-dolce-bronze uppercase">
                      {loc.state}
                    </span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
              Send an Inquiry
            </h2>
            <p className="mt-2 mb-8 text-sm text-gray-500">Start your transformation today.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

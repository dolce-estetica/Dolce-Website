import type { Metadata } from "next";
import Link from "next/link";
import { treatmentPages } from "@/lib/data/treatment-pages";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Treatments | Dolce Estetica — Doctor-Led Aesthetic Medicine",
  description:
    "Explore doctor-led treatments at Dolce Estetica: laser hair reduction, medifacials, pigmentation care, skin boosters, hair restoration, medical weight management and body contouring.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-widest text-dolce-bronze uppercase">Treatments</p>
      <h1 className="mt-2 font-serif text-4xl text-dolce-ink sm:text-5xl">
        Doctor-led treatments, honest outcomes
      </h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        Every treatment at Dolce Estetica begins with a consultation — we prescribe what your skin,
        hair and body actually need. Explore each treatment below: how it works, who it suits, who it
        does not, and an honest account of what to expect.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treatmentPages.map((t) => (
          <Link
            key={t.slug}
            href={`/treatments/${t.slug}`}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="font-serif text-xl text-dolce-ink group-hover:text-dolce-green">{t.name}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">{t.directAnswer}</p>
            <p className="mt-4 text-sm font-semibold text-dolce-bronze">
              Explore {t.name} →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-dolce-green/5 p-8">
        <h2 className="font-serif text-2xl text-dolce-ink">Available at all our clinics</h2>
        <p className="mt-2 text-gray-600">
          {locations.map((l) => l.city).join(" · ")}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {locations.map((l) => (
            <Link
              key={l.slug}
              href={`/clinics/${l.slug}`}
              className="rounded-full border border-dolce-green/30 px-4 py-2 text-sm font-medium text-dolce-green hover:bg-dolce-green hover:text-white"
            >
              {l.city}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

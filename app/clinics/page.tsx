import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Our Clinics | Dolce Estetica — Kerala & Mangalore",
  description:
    "Find your nearest Dolce Estetica clinic: Edapally (Kochi), Cherthala, Calicut and Mangalore. Doctor-led aesthetic medicine, wellness and longevity care.",
  alternates: { canonical: "/clinics" },
};

export default function ClinicsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-widest text-dolce-bronze uppercase">Our Clinics</p>
      <h1 className="mt-2 font-serif text-4xl text-dolce-ink sm:text-5xl">
        Find your Dolce Estetica
      </h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        The same doctors-first philosophy, the same standards, the same warm interiors — in every city we serve.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {locations.map((l) => (
          <Link key={l.slug} href={`/clinics/${l.slug}`}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-dolce-ink group-hover:text-dolce-green">{l.city}</h2>
              {l.rating && <span className="text-sm font-semibold text-dolce-bronze">★ {l.rating.value} ({l.rating.count})</span>}
              {l.note && <span className="rounded-full bg-dolce-green/10 px-3 py-1 text-xs font-semibold text-dolce-green">{l.note}</span>}
            </div>
            <p className="mt-2 text-sm text-gray-600">{l.operatingAs ? `${l.operatingAs} · ` : ""}{l.address}</p>
            <p className="mt-3 text-sm font-semibold text-dolce-green">{l.phone}</p>
            <p className="mt-4 text-sm font-semibold text-dolce-bronze">Visit clinic page →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

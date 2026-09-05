import Image from "next/image";
import { GraduationCap } from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import LandingHeading, { LandingSection } from "./LandingSection";

/**
 * Section 5 of the required structure — Our Doctors.
 * Real people, real photographs (the /team portraits already used site-wide).
 */
const DOCTORS = [
  {
    name: "Dr Joseph Thomas",
    role: "Founder & Chief Executive Officer",
    image: "/team/Joseph.webp",
  },
  {
    name: "Dr Amrutha Suresan",
    role: "Head — Clinical Operations & Training",
    image: "/team/Amrutha.webp",
  },
];

export default function LandingDoctors({ page }: { page: LandingPage }) {
  return (
    <LandingSection id="doctors">
      <LandingHeading
        eyebrow="Our doctors"
        title="The people behind your plan"
        sub="Doctor-led is not a slogan here — it is how every consultation and every protocol runs."
      />
      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {DOCTORS.map((doc) => (
          <article
            key={doc.name}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
          >
            <div className="relative aspect-[4/4] overflow-hidden bg-dolce-green/5">
              <Image
                src={doc.image}
                alt={`${doc.name}, ${doc.role}, ${page.brand === "medlounges" ? "MedLounges" : "Dolce Estetica"}`}
                fill
                sizes="(min-width: 640px) 288px, calc(100vw - 48px)"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-dolce-ink">{doc.name}</h3>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-dolce-bronze">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0" />
                {doc.role}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-3xl rounded-3xl border-l-4 border-dolce-bronze bg-dolce-sand/20 p-6 text-base leading-relaxed text-gray-700">
        {page.doctorsNote}
      </p>
    </LandingSection>
  );
}

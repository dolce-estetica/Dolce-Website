import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About | Dolce Estetica",
  description:
    "Born from a collective of practicing doctors in aesthetic and wellness medicine, Dolce Estetica is built on research and a deep respect for the human journey.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <section id="about" className="relative w-full overflow-hidden bg-white">
        <div className="relative flex min-h-[70vh] flex-col lg:min-h-[80vh] lg:flex-row">
          {/* Phones get the portrait as a soft background behind the copy */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 lg:hidden"
            style={{
              backgroundImage: "url('/assets/about.png')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-24 lg:py-16">
            <div>
              <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.4em] text-dolce-bronze uppercase sm:tracking-[0.5em]">
                Revealing Radiance
              </span>
              <h1 className="mb-8 font-serif text-4xl leading-tight font-bold tracking-tight text-dolce-green sm:text-6xl lg:text-7xl">
                Dolce Estetica
              </h1>
              <div className="max-w-xl space-y-6 text-dolce-green/90 sm:space-y-8">
                <p className="text-lg leading-relaxed font-light sm:text-xl lg:text-2xl">
                  At Dolce Estetica, we believe beauty isn&apos;t created, it&apos;s revealed.
                  It&apos;s the quiet harmony between how you feel and how you choose to show up to
                  the world.
                </p>
                <p className="text-lg leading-relaxed font-light sm:text-xl lg:text-2xl">
                  Born from a collective of practicing doctors in aesthetic and wellness medicine,
                  Dolce Estetica embodies a deep respect for innovation and the human journey. Every
                  experience we design is built on research.
                </p>
                <div className="pt-4">
                  <span className="inline-block border-b-2 border-dolce-bronze pb-1 text-[10px] font-bold tracking-[0.3em] text-dolce-green uppercase sm:tracking-[0.4em]">
                    The Dolce Philosophy
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden w-full lg:block lg:w-1/2">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/assets/about.png')",
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0) 50%)",
              }}
            />
          </div>
        </div>
      </section>

      <section id="team" className="w-full bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-24">
          <div className="mb-10 lg:mb-20">
            <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-dolce-bronze uppercase">
              The Minds Behind Dolce
            </span>
            <h2 className="font-serif text-4xl leading-[0.95] font-bold tracking-tight text-dolce-green sm:text-6xl lg:text-8xl">
              Our Leadership
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="group flex flex-col">
                <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gray-50 shadow-sm transition-all duration-700 hover:shadow-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="px-2">
                  <h3 className="font-serif text-xl font-bold text-dolce-green transition-colors group-hover:text-dolce-bronze sm:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-dolce-green/40 uppercase">
                    {member.role}
                  </p>
                  <div className="mt-4 h-px w-8 bg-dolce-bronze/30 transition-all duration-500 group-hover:w-full group-hover:bg-dolce-bronze" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

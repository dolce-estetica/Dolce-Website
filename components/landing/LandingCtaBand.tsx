import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * The "CTA in between sections" the client asked for — a quiet, full-width
 * band that repeats the consultation offer between content sections.
 */
export default function LandingCtaBand({
  title = "Ready when you are.",
  text = "A doctor looks at your concern, explains the diagnosis and gives you the full, itemised plan — before anything begins.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-dolce-green via-dolce-moss to-dolce-green px-8 py-10 text-center shadow-xl sm:flex-row sm:text-left">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {text}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-sand"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a Consultation
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>
      </div>
    </section>
  );
}

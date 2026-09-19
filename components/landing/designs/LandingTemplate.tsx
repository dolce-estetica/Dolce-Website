import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardCheck,
  ChevronDown,
  HeartPulse,
  Images,
  LineChart,
  Layers,
  MapPin,
  Microscope,
  Scissors,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import type { LandingPage } from "@/lib/data/landing-pages";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/site";
import LandingLeadForm from "../LandingLeadForm";
import ConcernPicker from "../ConcernPicker";
import GoogleReviewCard from "@/components/shared/GoogleReviewCard";
import { ExternalLink } from "lucide-react";
import LandingStickyCta from "../LandingStickyCta";
import { LP_DISCLAIMER, ReviewCard, ReviewsFootnote, Stars, rotatedReviews } from "../kit";

/**
 * CAMPAIGN TEMPLATE — the client's issue spec: a ditto copy of the reference
 * LP's STRUCTURE and styling (bodycraftclinics.com/laser-hair-reduction/),
 * in OUR palette instead of theirs (no pink/charcoal/coral):
 *
 *   hero (full-bleed photo, heavy scrim, centered stack, kicker → extrabold
 *   heading → subtext → 2 pill CTAs → 3 translucent trust chips, floating
 *   header) → impact band (brand green, bronze numerals) → WHY cards (white
 *   rounded-3xl on cream, circular bronze-line icon badge, centered) →
 *   services cards → THE PROCESS (STEP 01/02/03, bronze labels) → FAQ (cream
 *   rows, bronze chevron) → BEFORE/AFTER ("Real People Real Results", brand
 *   green) → REVIEWS (Google score, bronze stars) → final CTA band (brand
 *   green, bronze button) → lead form → locations → doctors.
 *
 * Palette (campaign-scoped, light): cream #FBF8F1 sections, white cards,
 * brand green #1c3816 bands (their "charcoal"), bronze #8A7142/#A88D5E accent
 * (their "coral"), all-sans Plus Jakarta extrabold headings, full-pill
 * buttons. Compliance: no prices, no superlatives, honest before/after.
 *
 * The sticky bottom Book Now bar is NOT touched here (client instruction).
 */

type Icon = typeof Star;

/** Per-page decorations only — the palette is shared campaign-wide. */
const PAGE_EXTRAS: Record<
  string,
  {
    kicker: string;
    serviceImages?: (string | undefined)[];
    serviceIcons?: Icon[];
    processImage?: { src: string; alt: string };
    timelineIcons?: Icon[];
    stickyLabel: string;
    stickyVariant: "green" | "bronze" | "slate";
    formHeading: string;
    submitLabel: string;
    /** 4-item service grids get a clean single row on desktop */
    fourColServices?: boolean;
    /** show a concern-picker band instead of the final CTA (form follows) */
    concernsCta?: boolean;
    /** reviews render in the home page's Google card style (scrollable row) */
    homeReviews?: boolean;
    /** hide the hero trust-chip row */
    hideHeroChips?: boolean;
    /** concern pre-selected in the lead form + sticky sheet */
    defaultConcern?: string;
    /** process section renders as an icon timeline with connecting lines */
    timelineProcess?: boolean;
    /** render service card images with a shorter aspect ratio */
    shortServiceImages?: boolean;
  }
> = {
  "dermatology-clinic": {
    kicker: "Safe • Effective • Dermatologist supervised",
    timelineProcess: true,
    timelineIcons: [Stethoscope, Microscope, ClipboardCheck],
    // Real South Indian imagery: our own dermatologist at work, the brand
    // glow portrait, and a shirodhara scalp photo (Pixabay where noted).
    serviceImages: [
      "/lp/derm-skin-treatment.webp",      // Skin: medical skin care & examination
      "/lp/derm-face-treatment.webp",      // Face: facial rejuvenation & tone care
      "/lp/derm-body-treatment.jpg",      // Body: body skin care & detan
      "/lp/derm-hair-scalp-treatment.jpg", // Hair & Scalp: scalp & hair fall treatment
    ],
    serviceIcons: [Layers, Smile, HeartPulse, Sparkles],
    stickyLabel: "Book your dermatology consultation",
    stickyVariant: "green",
    formHeading: "Book your dermatology consultation",
    submitLabel: "Book My Consultation",
    fourColServices: true,
    concernsCta: true,
    homeReviews: true,
    hideHeroChips: true,
    defaultConcern: "General skin check-up",
  },
  "hair-treatment": {
    kicker: "Diagnose first • Treat the cause • Track progress",
    timelineProcess: true,
    timelineIcons: [Microscope, HeartPulse, LineChart],
    hideHeroChips: true,
    concernsCta: true,
    defaultConcern: "Hair fall / shedding",
    serviceImages: [
      "/treatments/hair-fall.webp",
      "/treatments/understanding-hair-thinning.jpg",
      "/treatments/scalp-detox.webp",
      "/treatments/hair-regrowth.webp",
      "/treatments/dandruff.webp",
    ],
    stickyLabel: "Book your hair consultation",
    stickyVariant: "bronze",
    formHeading: "Book your hair consultation",
    submitLabel: "Book My Consultation",
  },
  "laser-hair-removal": {
    kicker: "Patch test first • Doctor-set settings • All skin types",
    timelineProcess: true,
    concernsCta: true,
    defaultConcern: "Full body laser hair removal",
    timelineIcons: [ClipboardCheck, ShieldCheck, LineChart],
    hideHeroChips: true,
    // Real photos for the six treated areas (Pixabay Content License — free
    // for commercial use, no attribution required). Sources:
    //   face     pixabay.com/photos/beauty-354565    underarms pixabay.com/photos/sport-1685812
    //   arms-legs pixabay.com/photos/stretching-498256 bikini  pixabay.com/photos/girl-358768
    //   full-body pixabay.com/photos/girl-677576     touchups pixabay.com/photos/woman-586185
    shortServiceImages: true,
    serviceImages: [
      "/lp/lhr-face.webp",
      "/lp/lhr-underarms.jpg",
      "/lp/vaser-arms.webp",
      "/lp/lhr-legs.png",
      "/lp/lhr-bikini.png",
      "/treatments/deep-clense.webp",
    ],
    stickyLabel: "Book your laser consultation",
    stickyVariant: "green",
    formHeading: "Book your laser consultation",
    submitLabel: "Book My Consultation",
  },
  "skin-treatments": {
    kicker: "Assess first • Treat in sequence • Protect after",
    timelineProcess: true,
    timelineIcons: [Microscope, Layers, ShieldCheck],
    hideHeroChips: true,
    concernsCta: true,
    defaultConcern: "Acne / breakouts",
    serviceImages: [
      "/treatments/acne.jpg",
      "/treatments/glutathione-pigmentation.jpeg",
      "/treatments/scar.webp",
      "/treatments/skin-aging.jpeg",
      "/treatments/skin-rejuvenation.webp",
      "/treatments/chemical-peel.jpeg",
    ],
    stickyLabel: "Book your skin consultation",
    stickyVariant: "green",
    formHeading: "Book your skin consultation",
    submitLabel: "Book My Consultation",
  },
  hydrafacial: {
    kicker: "Cleanse • Extract • Hydrate • One session",
    timelineProcess: true,
    timelineIcons: [Stethoscope, Sparkles, ShieldCheck],
    hideHeroChips: true,
    concernsCta: true,
    defaultConcern: "Dull skin / want a glow",
    serviceImages: [
      "/treatments/deep-clense.webp",
      "/treatments/deep-hydration.webp",
      "/treatments/acne.jpg",
      "/treatments/glutathione-pigmentation.jpeg",
      "/treatments/skin-rejuvenation.webp",
    ],
    processImage: {
      src: "/lp/facial-massage.jpg",
      alt: "Relaxing facial treatment in progress at Dolce Estetica",
    },
    stickyLabel: "Book your HydraFacial session",
    stickyVariant: "green",
    formHeading: "Book your HydraFacial session",
    submitLabel: "Book My Session",
  },
  "glutathione-treatment": {
    kicker: "Doctor assessed • In-clinic sessions • Honest expectations",
    timelineProcess: true,
    timelineIcons: [ClipboardCheck, HeartPulse, Check],
    hideHeroChips: true,
    concernsCta: true,
    defaultConcern: "Dull skin / want brightness",
    fourColServices: true,
    shortServiceImages: true,
    serviceImages: [
      "/treatments/glutathione-skin-brightening.webp",
      "/treatments/glutathione-pigmentation.jpeg",
      "/treatments/uneven.webp",
      "/treatments/dull-and-tired.webp",
    ],
    stickyLabel: "Book your IV consultation",
    stickyVariant: "bronze",
    formHeading: "Book your suitability assessment",
    submitLabel: "Book My Assessment",
  },
  "vaser-liposuction": {
    kicker: "Surgeon led • Itemised quote • MedLounges",
    timelineProcess: true,
    timelineIcons: [Stethoscope, Scissors, HeartPulse],
    hideHeroChips: true,
    concernsCta: true,
    defaultConcern: "Abdomen / belly fat",
    // Real photos for the six contour areas (Pixabay Content License — free
    // for commercial use, no attribution required). Sources:
    //   abdomen  pixabay.com/photos/belly-2354      waist  pixabay.com/photos/belly-2473
    //   arms     pixabay.com/photos/training-828726  thighs pixabay.com/photos/stretching-498256
    //   back     pixabay.com/photos/woman-567021    multi  pixabay.com/photos/yoga-7437515
    serviceImages: [
      "/lp/vaser-abdomen.webp",
      "/lp/vaser-waist.jpg",
      "/lp/vaser-arms.webp",
      "/lp/vaser-thighs.jpg",
      "/lp/vaser-back.jpg",
      "/lp/vaser-body-contouring.png",
    ],
    processImage: {
      src: "/lp/surgeon.jpg",
      alt: "Surgical team in an operating theatre at MedLounges",
    },
    stickyLabel: "Book your surgeon consultation",
    stickyVariant: "slate",
    formHeading: "Book your surgeon consultation",
    submitLabel: "Book Surgeon Consultation",
  },
};


const CREAM = "#FBF8F1";
const GREEN = "#1c3816"; // brand band color (their "charcoal")
const BRONZE_TEXT = "#8A7142"; // accent on light backgrounds
const SAND = "#C9B896"; // bright bronze for use on green / over the scrim

/** Campaign WHY pillars — the same four points on every landing page. */
const WHY_PILLARS: { title: string; text: string; icon: typeof Stethoscope }[] = [
  {
    title: "Doctor-Led Medical Precision",
    text: "Every treatment plan is designed and supervised by certified doctors, following evidence-based clinical protocols for safe, natural-looking outcomes.",
    icon: Stethoscope,
  },
  {
    title: "Advanced Cellular Diagnostics",
    text: "Genomic testing and AI-assisted skin analysis uncover the root causes behind ageing and skin concerns, so treatment works at a cellular level.",
    icon: Microscope,
  },
  {
    title: "Synergy of Aesthetics & Longevity",
    text: "Skin and hair rejuvenation combined with metabolic wellness and physician-guided longevity care, so you look vibrant and feel energetic.",
    icon: Sparkles,
  },
  {
    title: "Premium State-of-the-Art Infrastructure",
    text: "Clinics across South India equipped with US-FDA-approved technologies, maintaining international clinical standards in a calm, luxurious setting.",
    icon: HeartPulse,
  },
];

export default function LandingTemplate({ page }: { page: LandingPage }) {
  const extras = PAGE_EXTRAS[page.slug];
  const reviews = rotatedReviews(page.slug);
  const isMedlounges = page.brand === "medlounges";

  const faqSection = (
    <>      {/* ===== 6 — FAQ: cream rows, bronze chevron ===== */}
      <section id="faq" className="scroll-mt-4 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              Your questions, answered
            </h2>
          </div>
          <div className="mt-10 space-y-3.5">
            {page.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl px-6 py-5 ring-1 ring-[#E8E0CC] transition-shadow hover:shadow-md"
                style={{ backgroundColor: CREAM }}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-bold text-gray-800 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
                    style={{ color: BRONZE_TEXT }}
                  >
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </>
  );


  return (
    <>
      {/* ===== 0 — HEADER (DESKTOP): sticky at the top; hidden on phones, which use the bottom bar ===== */}
      <header className="sticky top-0 z-[135] hidden border-b border-white/10 shadow-lg lg:block" style={{ backgroundColor: GREEN }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" aria-label="Dolce Estetica home" className="flex items-center">
            <Image
              src="/assets/logo.webp"
              alt={isMedlounges ? "MedLounges" : "Dolce Estetica"}
              width={400}
              height={148}
              priority
              className="h-14 w-auto"
            />
          </Link>
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-[#8A7142] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#6E5930]"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Now
          </a>
        </div>
      </header>

      {/* ===== 1 — HERO: full-bleed photo, heavy scrim, centered stack ===== */}
      <section className="relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={page.hero.image}
            alt={page.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,22,14,0.60) 0%, rgba(12,22,14,0.62) 55%, rgba(12,22,14,0.72) 100%)",
            }}
          />
        </div>

        {/* floating header (MOBILE ONLY — scrolls away with the hero; desktop has a sticky header) */}
        <header className="absolute inset-x-0 top-0 z-10 lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" aria-label="Dolce Estetica home" className="flex items-center">
              <Image
                src="/assets/logo.webp"
                alt={isMedlounges ? "MedLounges" : "Dolce Estetica"}
                width={400}
                height={148}
                priority
                className="h-12 w-auto drop-shadow-md sm:h-14"
              />
            </Link>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-[#8A7142] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#6E5930] sm:px-7 sm:py-3"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Now
            </a>
          </div>
        </header>

        {/* centered content stack */}
        <div className="mx-auto max-w-3xl px-4 pt-24 pb-16 text-center sm:px-6">
          <p className="text-xs font-extrabold tracking-[0.3em] uppercase sm:text-sm" style={{ color: SAND }}>
            {extras.kicker}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {page.hero.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {page.hero.subheading}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#book"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8A7142] px-9 py-4 text-sm font-extrabold text-white shadow-xl transition-colors hover:bg-[#6E5930] sm:w-auto sm:text-base"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Consultation
            </a>
          </div>

          {/* 3 translucent trust chips inside the hero (skipped where requested) */}
          {!extras.hideHeroChips && (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {page.hero.trustChips.slice(0, 3).map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/90 sm:text-sm"
                >
                  <ShieldCheck className="h-4 w-4" style={{ color: SAND }} />
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ===== 2 — IMPACT STATS BAND: brand green, bronze numerals ===== */}
      <section aria-label="Our numbers" className="px-4 py-9 sm:px-6" style={{ backgroundColor: GREEN }}>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-7 sm:grid-cols-4">
          {page.impact.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1.5 px-3 text-center ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              {(() => {
                const STAT_ICONS: Record<string, typeof Star> = { "7+ Years": Stethoscope, "4 clinics": MapPin, "4.6★": Star, "15,000+": Smile };
                const StatIcon = STAT_ICONS[item.value] ?? ShieldCheck;
                return <StatIcon className="mb-1 h-5 w-5" style={{ color: SAND }} aria-hidden />;
              })()}
              <dd
                className="font-display text-2xl font-extrabold tracking-tight sm:text-[1.75rem]"
                style={{ color: SAND }}
              >
                {item.value}
              </dd>
              <dt className="max-w-[20ch] text-[11px] leading-snug text-white/65 sm:text-xs">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ===== 3 — WHY CARDS: white rounded-3xl on cream, circular bronze-line badge ===== */}
      <section id="why" className="scroll-mt-4 px-4 py-16 sm:px-6 sm:py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {isMedlounges ? "Why you'll be in safe hands" : "Why you'll love Dolce Estetica"}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: "#A88D5E", color: BRONZE_TEXT }}
                >
                  <pillar.icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-base font-extrabold text-dolce-green">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4 — SERVICES / OFFER CARDS ===== */}
      <section id="services" className="scroll-mt-4 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {page.services.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">{page.services.intro}</p>
          </div>

          <div
            className={`mt-12 ${
              page.services.items.length === 5
                ? "flex flex-wrap justify-center gap-5"
                : `grid gap-5 sm:grid-cols-2 ${extras.fourColServices ? "lg:grid-cols-4" : "lg:grid-cols-3"}`
            }`}
          >
            {page.services.items.map((item, i) => {
              const img = extras.serviceImages?.[i];
              const Icon = extras.serviceIcons?.[i];
              return (
                <a
                  key={item.name}
                  href="#book"
                  className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#E8E0CC] transition-all hover:-translate-y-1 hover:shadow-xl ${
                    page.services.items.length === 5
                      ? "w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)] max-w-sm"
                      : ""
                  }`}
                >
                  {img ? (
                    <div
                      className={`relative overflow-hidden ${
                        extras.shortServiceImages ? "aspect-[16/9.5]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, calc(100vw - 40px)"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#FBF8F1] to-white"
                      style={{ color: BRONZE_TEXT }}
                    >
                      {Icon && <Icon className="h-10 w-10" strokeWidth={1.5} />}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-extrabold text-dolce-green">{item.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold"
                      style={{ color: BRONZE_TEXT }}
                    >
                      Book consultation
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>



      {/* 6 — FAQ, or doctors first on pages that prefer people before answers */}

      {/* ===== 7 — BEFORE/AFTER: "Real People Real Results", brand green ===== */}
      <section id="results" className="scroll-mt-4 px-4 py-16 sm:px-6 sm:py-24" style={{ backgroundColor: GREEN }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Real people, real results
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{page.results.text}</p>
          {page.results.pairs.length > 0 ? (
            <>
              <div
                className={`mx-auto mt-12 flex flex-wrap justify-center gap-6 ${
                  page.slug === "glutathione-treatment" ? "max-w-5xl" : "max-w-4xl"
                }`}
              >
                {page.results.pairs.map((pair) => (
                  <figure
                    key={pair.label}
                    className={`w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl ${
                      page.slug === "glutathione-treatment"
                        ? "max-w-[270px] sm:max-w-[290px] sm:w-[calc(33.333%-1rem)]"
                        : pair.before === pair.after
                        ? "max-w-xs sm:max-w-sm sm:w-[calc(50%-0.75rem)]"
                        : "max-w-sm sm:w-[calc(50%-0.75rem)]"
                    }`}
                  >
                    {pair.before === pair.after ? (
                      <div
                        className={`relative overflow-hidden bg-white ${
                          pair.before.includes("glutathione") || pair.before.includes("vaser")
                            ? "aspect-square"
                            : "aspect-[2/1]"
                        }`}
                      >
                        <Image
                          src={pair.before}
                          alt={pair.label}
                          fill
                          sizes="(min-width: 640px) 384px, calc(100vw - 48px)"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={pair.before}
                            alt={`Before, ${pair.label}`}
                            fill
                            sizes="(min-width: 640px) 320px, calc(100vw - 48px)"
                            className="object-cover object-top"
                          />
                          <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase">
                            Before
                          </span>
                        </div>
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={pair.after}
                            alt={`After, ${pair.label}`}
                            fill
                            sizes="(min-width: 640px) 320px, calc(100vw - 48px)"
                            className="object-cover object-top"
                          />
                          <span
                            className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase"
                            style={{ backgroundColor: "#8A7142" }}
                          >
                            After
                          </span>
                        </div>
                      </div>
                    )}
                    <figcaption className="p-5 text-center">
                      <p className="text-sm font-extrabold text-dolce-green">{pair.label}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-white/60">
                More before-and-afters, matched to your skin concern, are shown in person at your
                consultation, with the doctor.
              </p>
              <a
                href="#book"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#8A7142] px-7 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-[#6E5930]"
              >
                See real cases at your consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                style={{ borderColor: "#A88D5E", color: SAND }}
              >
                <Images className="h-6 w-6" />
              </span>
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                <strong className="text-white">Shown at your consultation.</strong> Photographs of
                consenting patients, in person, by the doctor. Never stock or AI-generated images.
              </p>
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8A7142] px-7 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-[#6E5930]"
              >
                See real cases at your consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===== 8 — REVIEWS: Google score + bronze stars ===== */}
      <section id="testimonials" className="scroll-mt-4 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              Hear it from our patients
            </h2>
          </div>
          {extras.homeReviews ? (
            <>
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                  <span className="text-4xl font-bold text-dolce-ink sm:text-5xl">4.6</span>
                  <Stars rating={5} className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Based on Google patient reviews</p>
                <a
                  href={site.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
                >
                  Write a Review
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="scrollbar-hide -mx-4 mt-12 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                <div className="flex w-max snap-x gap-6">
                  {reviews.map((r) => (
                    <GoogleReviewCard key={r.author} review={r} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 flex items-center justify-center gap-2.5">
                <Stars rating={5} className="h-5 w-5" />
                <p className="text-sm font-bold text-gray-700">4.6 on Google · loved by patients across Kerala</p>
              </div>
              <div
                className={`mt-12 grid gap-5 ${reviews.length === 2 ? "mx-auto max-w-3xl md:grid-cols-2" : "md:grid-cols-3"
                  }`}
              >
                {reviews.map((r) => (
                  <ReviewCard key={r.author} review={r} />
                ))}
              </div>
              <ReviewsFootnote />
            </>
          )}
        </div>
      </section>

      {/* ===== 9 — PRE-FORM BAND: concerns picker (derm) or final CTA (others) ===== */}
      {extras.concernsCta && (
        <section className="px-4 py-14 sm:px-6" style={{ backgroundColor: GREEN }}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              What would you like help with today?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Pick a concern below and mention it when our team calls, we&apos;ll have the
              right specialist ready for you.
            </p>
            <ConcernPicker concerns={page.concerns} />
          </div>
        </section>
      )}

      {/* ===== 10 — LEAD FORM ===== */}
      <section id="book" className="scroll-mt-4 px-4 py-16 sm:px-6 sm:py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {extras.formHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Fill this in and our team will call you back within 2 hours, at the clinic you prefer.
            </p>
          </div>
          <div className="mt-10">
            <LandingLeadForm page={page} submitLabel={extras.submitLabel} defaultConcern={extras.defaultConcern} />
          </div>
        </div>
      </section>

      {/* ===== 11 — LOCATIONS ===== */}
      <section id="locations" className="scroll-mt-4 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              Our clinics across South India
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <a
                key={loc.slug}
                href={loc.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#E8E0CC] transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2"
                  style={{ borderColor: "#A88D5E", color: BRONZE_TEXT }}
                >
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-dolce-green">
                  {loc.city}
                  <span
                    className="ml-2 align-middle text-[10px] font-bold tracking-wider uppercase"
                    style={{ color: BRONZE_TEXT }}
                  >
                    {loc.state}
                  </span>
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-600">{loc.address}</p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: BRONZE_TEXT }}
                >
                  View on Google Maps <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ last / doctors last, per page preference */}

      {/* ===== FAQ — always last before the disclaimer ===== */}
      {faqSection}

      <p className="mx-auto max-w-6xl bg-white px-4 py-12 text-xs leading-relaxed text-gray-400 sm:px-6">
        {LP_DISCLAIMER}
      </p>

      {/* sticky bottom bar — untouched per client instruction */}
      <LandingStickyCta label={extras.stickyLabel} variant={extras.stickyVariant} />
    </>
  );
}

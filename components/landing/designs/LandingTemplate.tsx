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
import { ConcernProvider, ConcernLink } from "../ConcernContext";
import ResultsGallery from "../ResultsGallery";
import GoogleReviewCard from "@/components/shared/GoogleReviewCard";
import { ExternalLink } from "lucide-react";
import LandingStickyCta from "../LandingStickyCta";
import { LP_DISCLAIMER, ReviewsFootnote, Stars, rotatedReviews } from "../kit";

/** Shared campaign structure and content with a white-first, responsive theme.
 * Green is reserved for actions, headings and the compact impact band.
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
    /**
     * Responsive object-position classes for the hero photo, for banners
     * whose subject is off-centre at phone crop widths (mobile-first:
     * base class targets phones, larger breakpoints can re-centre).
     */
    heroImagePosition?: string;
    /**
     * Overrides the hero's min-height classes (default "min-h-[92svh]").
     * A shorter phone hero zooms a landscape banner OUT, showing more of
     * the image instead of a tight cover crop.
     */
    heroMinHeightClass?: string;
    /**
     * Phone-only hero compaction: tighter paddings and one-step-smaller
     * hero type, so the text stack stops forcing the section taller than
     * its min-height. With object-cover the section height IS the zoom,
     * so this lets a landscape banner zoom further OUT on phones.
     * sm+ restores the standard hero sizes and spacings.
     */
    compactMobileHero?: boolean;
  }
> = {
  "dermatology-clinic": {
    kicker: "Safe • Effective • Dermatologist supervised",
    timelineProcess: true,
    timelineIcons: [Stethoscope, Microscope, ClipboardCheck],
    // Hero banner (1600x900): the face sits on the right (~75% of the width),
    // sunlit wall + plant on the left. Phones show only ~43% of a 16:9
    // image's width at 60svh, so zoom out and anchor onto the face. Desktop
    // keeps the full scene but biases up a little so the wide 2.2:1 crop
    // doesn't trim her hairline.
    heroMinHeightClass: "min-h-[60svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[75%_50%] lg:object-[50%_38%]",
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
    // Hero banner (1600x900): the man examining his scalp sits on the LEFT
    // (~28% of the width), empty wall on the right. Phones show only ~43% of
    // a 16:9 image's width at 60svh, so anchor onto the head. Desktop (lg)
    // shows the whole scene but biases up so the raised hands and hairline
    // survive the wide crop.
    heroMinHeightClass: "min-h-[60svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[30%_50%] lg:object-[50%_32%]",
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
    // Hero banner (1600x900): the treatment action (handpiece on the lower
    // leg + gloved hands) sits on the RIGHT (~70% of the width), legs cross
    // the left half. Phones show only ~43% of a 16:9 image's width at 60svh,
    // so anchor onto the handpiece — and compactMobileHero trims the phone
    // text stack (which, not the min-height, sets the section height) so the
    // banner zooms out a little further. Desktop (lg) shows the whole scene
    // centred at the standard hero size.
    heroMinHeightClass: "min-h-[52svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[70%_50%] lg:object-center",
    compactMobileHero: true,
    // Real photos for the six treated areas (Pixabay Content License — free
    // for commercial use, no attribution required). Sources:
    //   face     pixabay.com/photos/beauty-354565    underarms pixabay.com/photos/sport-1685812
    //   arms-legs pixabay.com/photos/stretching-498256 bikini  pixabay.com/photos/girl-358768
    //   full-body pixabay.com/photos/girl-677576     touchups pixabay.com/photos/woman-586185
    shortServiceImages: true,
    fourColServices: true,
    serviceImages: [
      "/lp/lhr-face.webp",
      "/lp/lhr-underarms.jpg",
      "/lp/lhr-legs.png",
      "/lp/lhr-bikini.png",
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
    // Hero banner (1536x1024, 3:2): the face sits on the right (~55-85% of
    // the width, high in the frame), soft wall + blurred plant on the left.
    // Phones show only ~49% of a 3:2 image's width at 60svh, so anchor onto
    // the face; desktop (lg) biases up hard — wide 2.2:1 crops show just
    // ~68% of the height and her face fills the top half.
    heroMinHeightClass: "min-h-[60svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[68%_50%] lg:object-[50%_25%]",
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
    // Hero banner (1536x1024, 3:2): the handpiece-on-cheek action sits at
    // ~42-56% of the width, the patient's face at ~50-65% and the therapist's
    // at ~67-77% — the whole treatment band fits the ~49% phone window
    // anchored at 60%. Desktop (lg) biases up so wide crops keep the
    // therapist's face (she stands high in the frame).
    heroMinHeightClass: "min-h-[60svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[60%_50%] lg:object-[50%_30%]",
    serviceImages: [
      "/treatments/deep-clense.webp",
      "/treatments/hydrafacial-hydration.webp",
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
    // Hero banner (1536x1024, 3:2): the patient's face sits top-centre-right
    // (~66% of the width) and the nurse inserting the IV line at ~78-95%,
    // quiet sunlit wall on the left. Phones show only ~49% of a 3:2 image's
    // width at 60svh, so anchor at 75% to keep the face AND the IV action.
    // Desktop (lg) biases up hard — wide 2.2:1 crops show just ~68% of the
    // height, and her face sits in the top third of the source.
    heroMinHeightClass: "min-h-[60svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[90%_50%] lg:object-[50%_25%]",
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
    // Hero banner (1600x900): the contoured torso sits on the right (~68%
    // of the width), quiet sunlit wall with plant shadows on the left.
    // Phones show only ~43% of a 16:9 image's width at 60svh, so zoom out
    // and anchor onto the waistline; desktop (lg) shows the whole scene
    // centred at the standard hero size.
    heroMinHeightClass: "min-h-[60svh] sm:min-h-[92svh]",
    heroImagePosition: "object-[68%_50%] lg:object-center",
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


const CREAM = "#FAFBF9";
const GREEN = "#1c3816"; // brand accent and compact impact band
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

/**
 * Verified Google Business Profile links (maps?cid=…) for the four clinics.
 * Unlike the hand-built name+coords URLs in locations.ts (mapsLink), which
 * Google resolves as a *search* when the name doesn't match the listing —
 * exactly what happens at Edappally, whose listing is "Medlounges Express -
 * Skin and Hair Care Clinic" — a cid link always opens the exact profile
 * page. CIDs resolved from each listing's public Maps data and cross-checked
 * against the clinic coordinates/addresses on 22 Sep 2026.
 */
const GMB_PROFILE_LINKS: Record<string, string> = {
  // Edapally: client-provided official GMB share link (resolves to the
  // "Medlounges Express Edapally" listing on NH 66).
  "edapally-kochi": "https://maps.app.goo.gl/Xbh9TLq98YWkSSKYA?g_st=ic",
  cherthala: "https://www.google.com/maps?cid=14938211385420558108",
  calicut: "https://www.google.com/maps?cid=14795562384658342585",
  mangalore: "https://www.google.com/maps?cid=8732014371873302934",
};

export default function LandingTemplate({ page }: { page: LandingPage }) {
  const extras = PAGE_EXTRAS[page.slug];
  const reviews = rotatedReviews(page.slug);
  const isMedlounges = page.brand === "medlounges";
  const isCampaign = Boolean(page.campaign);
  const defaultConcern = isCampaign ? undefined : extras.defaultConcern;
  const pillars = isCampaign ? page.why.map((pillar, i) => ({ ...pillar, icon: WHY_PILLARS[i % WHY_PILLARS.length].icon })) : WHY_PILLARS;

  const faqSection = (
    <>      {/* ===== 6 — FAQ: cream rows, bronze chevron ===== */}
      <section id="faq" className="scroll-mt-6 lg:scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {isCampaign ? "Quick Answers Before You Book" : "Your questions, answered"}
            </h2>
          </div>
          <div className="mt-10 space-y-3.5">
            {page.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl px-6 py-5 ring-1 ring-[#E3E8DF] transition-shadow hover:shadow-md"
                style={{ backgroundColor: CREAM }}
              >
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-left text-base font-bold text-gray-800 [&::-webkit-details-marker]:hidden">
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
    <ConcernProvider defaultConcern={defaultConcern}>
    <div className={isCampaign ? "lp-campaign" : undefined}>
      {/* White header across phone and desktop; the phone CTA stays in its bottom bar. */}
      <header className="z-[135] border-b border-[#E3E8DF] bg-white lg:sticky lg:top-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link href="/" aria-label="Dolce Estetica home" className="flex items-center">
            <Image
              src="/assets/logo.webp"
              alt={isMedlounges ? "MedLounges" : "Dolce Estetica"}
              width={400}
              height={148}
              priority
              className="lp-brand-logo h-11 w-auto sm:h-14"
            />
          </Link>
          <a
            href="#book"
            className="lp-header-cta hidden items-center gap-2 rounded-full bg-dolce-green px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-dolce-green-light lg:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Now
          </a>
        </div>
      </header>

      {isCampaign ? (
        <section className={`lp-hero relative isolate overflow-hidden bg-dolce-green ${page.slug === "hair-treatment" ? "lp-hero-hair" : ""}`}>
          {/* These WebP heroes are already compressed and capped at 1600px.
              Serve them directly to avoid a cold image-optimizer delay on the LCP. */}
          <Image src={page.hero.image} alt={page.hero.imageAlt} fill preload unoptimized className={`object-cover ${extras.heroImagePosition ?? ""}`} />
          <div className="lp-hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-14 sm:min-h-[620px] sm:px-8 lg:px-6">
            <div className="lp-hero-copy max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-[10px] font-bold tracking-[0.1em] text-white sm:text-xs">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />{page.hero.eyebrow}
              </p>
              <h1 className="mt-6 font-display text-[clamp(2rem,7.8vw,3.75rem)] leading-[1.12] font-bold tracking-tight text-white">{page.hero.heading}</h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{page.hero.subheading}</p>
              <a href="#book" className="lp-gold-button mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold sm:w-auto">
                Book My Consultation <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </a>
            </div>
          </div>
        </section>
      ) : (
      <section className="bg-white px-5 pt-8 pb-9 sm:px-6 sm:py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="text-[10px] leading-relaxed font-bold tracking-[0.17em] text-dolce-green uppercase sm:text-xs">
              {extras.kicker}
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-[1.16] font-bold tracking-tight text-dolce-green sm:text-5xl lg:text-[3.25rem]">
              {page.hero.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-lg">
              {page.hero.subheading}
            </p>
            <div className="mt-7 sm:mt-8">
              <a
                href="#book"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-dolce-green px-6 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-dolce-green-light sm:w-auto sm:px-9 sm:text-base"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Consultation
              </a>
            </div>
            {!extras.hideHeroChips && (
              <ul className="mt-6 flex flex-wrap items-center gap-2.5">
                {page.hero.trustChips.slice(0, 3).map((chip) => (
                  <li key={chip} className="inline-flex items-center gap-2 rounded-full border border-[#E3E8DF] bg-[#FAFBF9] px-3 py-2 text-xs font-semibold text-dolce-green">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#FAFBF9] sm:rounded-[2rem] lg:aspect-[5/4]">
            <Image
              src={page.hero.image}
              alt={page.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 612px, (min-width: 1024px) 48vw, 100vw"
              className={`object-cover ${extras.heroImagePosition ?? ""}`}
            />
          </div>
        </div>
      </section>

      )}

      {/* ===== 2 — IMPACT STATS BAND: brand green, bronze numerals ===== */}
      <section aria-label="Our numbers" className="px-4 py-9 sm:px-6" style={{ backgroundColor: GREEN }}>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-7 sm:grid-cols-4">
          {page.impact.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1.5 px-3 text-center ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              {(() => {
                const STAT_ICONS: Record<string, typeof Star> = { "7+ Years": Stethoscope, "4 Clinics": MapPin, "4 clinics": MapPin, "4.6★": Star, "15,000+": Smile };
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
      <section id="why" className="scroll-mt-6 lg:scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {page.campaign?.whyHeading ?? (isMedlounges ? "Why you'll be in safe hands" : "Why you'll love Dolce Estetica")}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
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
      <section id="services" className="scroll-mt-6 lg:scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24">
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
                <ConcernLink
                  key={item.name}
                  concern={item.concern}
                  className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#E3E8DF] transition-all hover:-translate-y-1 hover:shadow-xl ${
                    page.services.items.length === 5
                      ? "w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)]"
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
                      className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#FAFBF9] to-white"
                      style={{ color: BRONZE_TEXT }}
                    >
                      {Icon && <Icon className="h-10 w-10" strokeWidth={1.5} />}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-extrabold text-dolce-green">{item.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
                    <span
                      className="lp-service-cta mt-5 inline-flex min-h-11 items-center justify-between gap-2 text-sm font-extrabold"
                      style={{ color: BRONZE_TEXT }}
                    >
                      {item.cta ?? "Book consultation"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </ConcernLink>
              );
            })}
          </div>
        </div>
      </section>



      {/* 6 — FAQ, or doctors first on pages that prefer people before answers */}

      {/* ===== 7 — BEFORE/AFTER: "Real People Real Results", white surface ===== */}
      <section id="results" className="scroll-mt-6 lg:scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24" style={{ backgroundColor: CREAM }}>
        <div className={`mx-auto text-center ${isCampaign ? "max-w-7xl" : "max-w-3xl"}`}>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
            {isCampaign ? page.results.heading : "Real people, real results"}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">{page.results.text}</p>
          {page.results.pairs.length > 0 ? (
            <>
              {isCampaign ? <ResultsGallery pairs={page.results.pairs} /> : <div
                className={`mx-auto mt-12 flex flex-wrap justify-center gap-6 ${
                  page.slug === "glutathione-treatment" ? "max-w-5xl" : "max-w-4xl"
                }`}
              >
                {page.results.pairs.map((pair) => (
                  <figure
                    key={pair.label}
                    className={`w-full overflow-hidden rounded-[2rem] bg-white shadow-sm ${
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
              </div>}
              <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-gray-500">
                More before-and-afters, matched to your skin concern, are shown in person at your
                consultation, with the doctor.
              </p>
              <a
                href="#book"
                className="lp-results-cta mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-dolce-green px-7 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-dolce-green-light"
              >
                {isCampaign ? "Get Similar Results" : "See real cases at your consultation"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-5 rounded-[2rem] border border-[#E3E8DF] bg-white p-8 sm:p-10">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                style={{ borderColor: "#A88D5E", color: BRONZE_TEXT }}
              >
                <Images className="h-6 w-6" />
              </span>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                <strong className="text-dolce-green">Shown at your consultation.</strong> Photographs of
                consenting patients, in person, by the doctor. Never stock or AI-generated images.
              </p>
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-dolce-green px-7 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-dolce-green-light"
              >
                {isCampaign ? "Get Similar Results" : "See real cases at your consultation"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===== 8 — REVIEWS: Google score + bronze stars ===== */}
      <section id="testimonials" className="scroll-mt-6 lg:scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {isCampaign ? "In Their Own Words" : "Hear it from our patients"}
            </h2>
          </div>
          {extras.homeReviews ? (
            <>
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                  <span className="text-4xl font-bold text-dolce-ink sm:text-5xl">4.6</span>
                  <Stars rating={5} className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm text-gray-500">{isCampaign ? "4.6 on Google, from real patients." : "Based on Google patient reviews"}</p>
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
              <div className="scrollbar-hide -mx-4 mt-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-12 sm:px-0">
                <div className="flex w-max snap-x items-start gap-4 sm:items-stretch sm:gap-6">
                  {reviews.map((r) => (
                    <GoogleReviewCard
                      key={r.author}
                      review={r}
                      compactMobile
                      className="w-[85vw] max-w-[300px] shrink-0 snap-center sm:w-[380px] sm:max-w-none"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 flex items-center justify-center gap-2.5">
                <Stars rating={5} className="h-5 w-5" />
                <p className="text-sm font-bold text-gray-700">{isCampaign ? "4.6 on Google, from real patients." : "4.6 on Google · loved by patients across Kerala"}</p>
              </div>
              {/* Compact phone cards; preserve the existing 380px cards at sm+. */}
              <div className="scrollbar-hide -mx-4 mt-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-12 sm:px-0">
                <div className="flex w-max snap-x items-start gap-4 sm:items-stretch sm:gap-5">
                  {reviews.map((r) => (
                    <GoogleReviewCard
                      key={r.author}
                      review={r}
                      compactMobile
                      className="w-[85vw] max-w-[300px] shrink-0 snap-center sm:w-[380px] sm:max-w-none"
                    />
                  ))}
                </div>
              </div>
              <ReviewsFootnote />
            </>
          )}
        </div>
      </section>

      {/* ===== 9 — PRE-FORM BAND: concerns picker (derm) or final CTA (others) ===== */}
      {extras.concernsCta && (
        <section className="border-y border-[#E3E8DF] bg-white px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-dolce-green sm:text-3xl">
              {isCampaign ? "Not Sure Where To Start? Tell Us" : "What would you like help with today?"}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {page.campaign?.concernIntro ?? "Pick a concern below and mention it when our team calls, we’ll have the right specialist ready for you."}
            </p>
            <ConcernPicker concerns={page.concerns} />
          </div>
        </section>
      )}

      {/* ===== 10 — LEAD FORM ===== */}
      <section id="book" className="scroll-mt-6 lg:scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {isCampaign ? "Start Your Consultation" : extras.formHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {page.campaign?.formIntro ?? "Fill this in and our team will call you back within 2 hours, at the clinic you prefer."}
            </p>
          </div>
          <div className="mt-10">
            <LandingLeadForm page={page} submitLabel={extras.submitLabel} defaultConcern={defaultConcern} />
          </div>
        </div>
      </section>

      {/* ===== 11 — LOCATIONS ===== */}
      <section id="locations" className="scroll-mt-6 lg:scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-dolce-green sm:text-4xl">
              {isCampaign ? "Find Your Nearest Dolce Clinic" : "Our clinics across South India"}
            </h2>
          </div>
          {page.campaign && <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-gray-600">{page.campaign.locationsIntro}</p>}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <a
                key={loc.slug}
                href={GMB_PROFILE_LINKS[loc.slug] ?? loc.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#E3E8DF] transition-all hover:-translate-y-1 hover:shadow-lg"
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

      <p className="mx-auto max-w-6xl bg-white px-4 py-12 text-xs leading-relaxed text-gray-600 sm:px-6">
        {LP_DISCLAIMER}
      </p>

      {/* sticky bottom bar — light surface with a green action */}
      <LandingStickyCta
        slug={page.slug}
        gold={isCampaign}
        label={extras.stickyLabel}
        variant={extras.stickyVariant}
        concerns={page.concerns}
        defaultConcern={defaultConcern}
      />
    </div>
    </ConcernProvider>
  );
}

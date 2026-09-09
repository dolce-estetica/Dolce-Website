import type { Review } from "./reviews";
import { reviews } from "./reviews";

/**
 * GOOGLE ADS LANDING PAGES, Dolce Estetica & MedLounges.
 *
 * Source of requirements: "Dolce Ads Landing Page Structure.xlsx" (client,
 * Sep 2026). One config below = one landing page at /<slug> (top-level; the
 * old /lp/<slug> URLs 301 to it). The page
 * template lives at app/lp/[slug]/page.tsx and renders every page with the
 * same 9-section structure the client specified: banner → impact numbers →
 * why choose us → services → doctors → before/after → testimonials → lead
 * form → FAQ, with a sticky "Book Now" CTA and CTAs between sections.
 *
 * COMPLIANCE: the group rules from treatment-pages.ts apply here too:
 *   - NO prices, ranges or "onwards" anywhere. Cost questions are answered
 *     with what determines the cost + "quoted at consultation".
 *   - NO "permanent", "cure", "100%", "best", "No.1" or outcome guarantees.
 *     Baldness, obesity and skin disorders are scheduled under the DMR Act
 *     1954, so hair / body / skin copy stays assessment-framed.
 *   - Before/after PHOTOS: the section renders real photo pairs ONLY when
 *     `results.pairs` is filled with consented, client-supplied photos.
 *     Until then it shows an honest "shared at consultation" panel.
 *   - Testimonials reuse ONLY the real Google reviews from reviews.ts.
 *     Never invent reviews.
 *
 * GOOGLE ADS POLICY NOTE: the /hair-fall-consultation page exists because
 * Google's healthcare ad policy disallows ads landing on pages that promote
 * PRP-style regenerative treatments. The hair-treatment page below lists PRP
 * (the client asked for it), so route Google Ads for hair to
 * /hair-fall-consultation and use /lp/hair-treatment for organic/meta/etc.
 *
 * IMAGES: heroes use the real brand photography in /public. When the client
 * sends service-specific and before/after photos, swap them here, nothing
 * else needs to change.
 */

export type LandingBrand = "dolce" | "medlounges";

export type LandingResultPair = { before: string; after: string; label: string };

export type LandingPage = {
  slug: string;
  brand: LandingBrand;
  name: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    image: string;
    imageAlt: string;
    /** Short credibility chips under the hero CTAs (Bodycraft-style badges). */
    trustChips: string[];
  };
  impact: { value: string; label: string }[];
  why: { title: string; text: string }[];
  services: {
    heading: string;
    intro: string;
    items: { name: string; text: string }[];
  };
  /** "How it works", three numbered steps, optional supporting photo. */
  process: {
    heading: string;
    steps: { title: string; text: string }[];
    image?: string;
    imageAlt?: string;
  };
  doctorsNote: string;
  results: {
    heading: string;
    text: string;
    /** Real consented before/after pairs. Empty = honest panel is shown instead. */
    pairs: LandingResultPair[];
  };
  /** Options for the "primary concern" dropdown on the lead form. */
  concerns: string[];
  faqs: { q: string; a: string }[];
};

export const landingBrandNames: Record<LandingBrand, string> = {
  dolce: "Dolce Estetica",
  medlounges: "MedLounges",
};

/* ------------------------------------------------------------------ */
/* Shared blocks, identical facts across every page, so they are      */
/* defined once. Verifiable only: doctor-led, 4 real clinics, the      */
/* Google rating shown site-wide, itemised quotes.                     */
/* ------------------------------------------------------------------ */

const IMPACT = [
  { value: "Doctor-led", label: "Every protocol, every clinic" },
  { value: "4 clinics", label: "Kochi · Cherthala · Calicut · Mangalore" },
  { value: "4.6★", label: "Google patient rating" },
  { value: "Itemised", label: "Full quote before treatment" },
];

const WHY = [
  {
    title: "Doctor-Led Medical Precision",
    text: "Every treatment plan is designed, supervised, and delivered by certified medical doctors. We use evidence-based protocols to ensure your safety and give you natural, predictable results.",
  },
  {
    title: "Advanced Cellular Diagnostics",
    text: "We test instead of guessing. With AI skin assessments and cellular diagnostics, we uncover the root causes of aging and skin concerns to treat them from deep within.",
  },
  {
    title: "Synergy of Aesthetics & Longevity",
    text: "We combine outer skin and hair rejuvenation with inner metabolic health and cellular biohacks, helping you look vibrant and feel energized every day.",
  },
  {
    title: "Premium State-of-the-Art Infrastructure",
    text: "Our modern clinics feature US-FDA approved medical technology and international clinical standards in a relaxing, tranquil environment across South India.",
  },
];

const TESTIMONIALS: Review[] = reviews;

export const landingPages: LandingPage[] = [
  /* ==================================================================
   * 1, DERMATOLOGY CLINIC (Dolce)
   * ================================================================== */
  {
    slug: "dermatology-clinic",
    brand: "dolce",
    name: "Dermatology Clinic",
    metaTitle: "Dermatologist Consultation | Dolce Estetica, Skin, Hair & Body",
    metaDescription:
      "See a qualified dermatologist for skin, face, body, hair and scalp concerns. Doctor-led consultation before any treatment. Clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      eyebrow: "Doctor-led dermatology · 4 clinics",
      heading: "Your skin deserves a specialist, not a guess.",
      subheading:
        "Acne, pigmentation, hair fall or anything else that bothers your skin, examined and explained properly by a dermatologist before any treatment.",
      image: "/gallery/clinic-excellence.jpg",
      imageAlt: "Dermatologist gently performing a skin treatment on a relaxed patient at Dolce Estetica",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "7+ Years", label: "Of dermatology expertise" },
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
      { value: "4.6★", label: "Google rating from real patients" },
      { value: "15,000+", label: "Happy patients treated" },
    ],
    why: WHY,
    services: {
      heading: "What our doctors treat",
      intro:
        "One clinic for every skin, hair and body concern, medical and aesthetic, so you are not sent elsewhere when a problem needs a specialist's eye.",
      items: [
        {
          name: "Skin",
          text: "Acne, pigmentation, eczema, psoriasis, fungal infection, allergies, warts, moles and long-term skin condition management.",
        },
        {
          name: "Face",
          text: "Dullness, uneven tone, fine lines, open pores, under-eye concerns and tailored facial rejuvenation plans.",
        },
        {
          name: "Body",
          text: "Body pigmentation and detan, stretch marks, skin tags, back and chest acne, and overall body-skin health.",
        },
        {
          name: "Hair & Scalp",
          text: "Hair fall, thinning, dandruff, scalp itching and infections, diagnosed properly before anything is recommended.",
        },
      ],
    },
    process: {
      heading: "How your consultation works",
      steps: [
        {
          title: "Consultation & diagnosis",
          text: "A dermatologist examines your concern, takes a full history and explains in plain words what it actually is.",
        },
        {
          title: "Investigations where needed",
          text: "Blood tests or a closer look with dermatoscopy when an internal cause or something deeper is suspected.",
        },
        {
          title: "Plan, quote & treatment",
          text: "A written, itemised plan: treat now, treat in stages, or simply monitor. Your call, with the full cost up front.",
        },
      ],
    },
    doctorsNote:
      "Every consultation at our clinics is doctor-led. Your dermatologist examines you, takes a full history and explains the diagnosis in plain language before any treatment is discussed.",
    results: {
      heading: "Before & after, shown honestly",
      text: "Real results from real Dolce patients, shared with their written consent. Every skin is different, so your own results depend on your diagnosis, skin type and the plan your doctor builds for you, which is why every treatment starts with an in-person assessment.",
      pairs: [
        {
          before: "/lp/results-derm-acne-before.jpg",
          after: "/lp/results-derm-acne-after.jpg",
          label: "Acne & pigmentation care",
        },
        {
          before: "/lp/results-ml-abdomen-before.jpg",
          after: "/lp/results-ml-abdomen-after.jpg",
          label: "Abdomen & flank contouring",
        },
        {
          before: "/lp/results-ml-chin-before.jpg",
          after: "/lp/results-ml-chin-after.jpg",
          label: "Chin & jawline contouring",
        },
        {
          before: "/lp/results-ml-chest-before.jpg",
          after: "/lp/results-ml-chest-after.jpg",
          label: "Chest contouring",
        },
      ],
    },
    concerns: [
      "Acne or acne scars",
      "Pigmentation / dark patches",
      "Hair fall or thinning",
      "Scalp problem (dandruff, itching)",
      "Skin allergy or rash",
      "Anti-ageing / fine lines",
      "Under-eye dark circles",
      "General skin check-up",
      "Something else",
    ],
    faqs: [
      {
        q: "Do I need an appointment, or can I walk in?",
        a: "Consultations run by appointment at all four clinics, Edapally (Kochi), Cherthala, Calicut and Mangalore. Book on this page or on WhatsApp and we will find you the earliest slot.",
      },
      {
        q: "What happens at a dermatology consultation?",
        a: "The doctor examines your concern in good light, takes a full history, how long it has been there, what changes you have noticed, what runs in the family, and explains the diagnosis. Where an internal cause is possible, blood tests are ordered before any treatment plan.",
      },
      {
        q: "How much does treatment cost?",
        a: "It depends entirely on the diagnosis, treating a fungal infection and managing pigmentation are completely different plans. That is why we quote at the consultation, in full and in writing, after the doctor has seen you. Nothing begins before you have the complete figure.",
      },
      {
        q: "Will I be pushed into a treatment package?",
        a: "No. Plenty of consultations end with simple medication, a home-care routine or simply reassurance. If a treatment is genuinely right for you the doctor will explain why; if it is not, we will tell you that too.",
      },
      {
        q: "Do you treat children and older patients?",
        a: "Yes, all ages are seen, from childhood eczema and birthmark assessment to age-related skin concerns. Mention the patient's age when you book and we will allot a suitable slot.",
      },
    ],
  },

  /* ==================================================================
   * 2, HAIR TREATMENT (Dolce)
   * ================================================================== */
  {
    slug: "hair-treatment",
    brand: "dolce",
    name: "Hair Treatment",
    metaTitle: "Hair Fall & Hair Loss Treatment | Dolce Estetica, Doctor-Led Care",
    metaDescription:
      "Doctor-led assessment and treatment for hair fall, hair thinning, PRP therapy and scalp concerns. Find the cause before treating it. Clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      eyebrow: "Doctor-led hair care · 4 clinics",
      heading: "Hair fall has a cause. We find it first.",
      subheading:
        "Thyroid, iron, post-delivery shedding or hereditary patterns. Our doctors diagnose the exact cause of your hair fall before treating it.",
      image: "/lp/hair.jpg",
      imageAlt: "Woman receiving a scalp and hair treatment at a salon clinic",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "4.6★", label: "Google rating from real patients" },
      { value: "7+ Years", label: "Of hair-treatment expertise" },
      { value: "15,000+", label: "Happy patients treated" },
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
    ],
    why: WHY,
    services: {
      heading: "Hair & scalp treatments",
      intro:
        "Every plan starts with a scalp examination and, where indicated, blood investigations, because hair fall from an internal cause cannot be fixed at the scalp alone.",
      items: [
        {
          name: "Hair fall control",
          text: "A doctor identifies why you are shedding, nutritional, hormonal, post-illness or hereditary, and treats that specific cause.",
        },
        {
          name: "Hair thinning & density",
          text: "Early thinning is assessed with a scalp examination, and a medical plan is built around what is actually driving it.",
        },
        {
          name: "PRP therapy",
          text: "Platelet-rich plasma from your own blood, administered by doctors as part of a diagnosed treatment plan, never as a standalone package sold before assessment.",
        },
        {
          name: "Scalp treatment",
          text: "Dandruff, itching, oiliness, folliculitis and other scalp conditions treated medically, so the ground your hair grows from is healthy.",
        },
      ],
    },
    process: {
      heading: "How hair fall treatment works",
      steps: [
        {
          title: "Scalp & history examination",
          text: "The doctor examines your pattern and pace of hair fall, and takes the history that points to its cause.",
        },
        {
          title: "Find the cause",
          text: "Thyroid, iron and other internal causes look identical in the mirror, investigations are ordered where indicated.",
        },
        {
          title: "Treat the diagnosis",
          text: "A medical plan built around your cause, with realistic expectations set honestly and reviews at sensible intervals.",
        },
      ],
    },
    doctorsNote:
      "Baldness and hair loss have multiple medical causes, and outcomes differ from person to person. Our doctors examine first, investigate where needed, and give you an honest view of what is realistic, no regrowth promises, ever.",
    results: {
      heading: "Results, discussed honestly",
      text: "Hair responds over months, not weeks, and no responsible clinic promises regrowth before knowing the cause. At your consultation the doctor will show you what realistic improvement looks like for your specific diagnosis, and photographs of consenting patients with similar cases, in person, never as stock or AI-generated images online.",
      pairs: [
        {
          before: "/lp/results-hair-1-before.jpg",
          after: "/lp/results-hair-1-after.jpg",
          label: "Hair fall treatment",
        },
        {
          before: "/lp/results-hair-2-before.jpg",
          after: "/lp/results-hair-2-after.jpg",
          label: "Hair density improvement",
        },
      ],
    },
    concerns: [
      "Hair fall / shedding",
      "Hair thinning / less density",
      "Bald patches / receding line",
      "Dandruff or itchy scalp",
      "Oily / flaky scalp",
      "Want to discuss PRP",
      "Something else",
    ],
    faqs: [
      {
        q: "Why see a doctor for hair fall instead of starting a treatment?",
        a: "Because the mirror cannot tell the difference between low iron, a thyroid issue, post-delivery shedding and hereditary loss, and each is treated completely differently. Treating the scalp while an internal cause continues rarely works. The consultation finds your cause first.",
      },
      {
        q: "What is PRP, and am I a candidate?",
        a: "PRP (platelet-rich plasma) uses a concentrate from your own blood, administered as part of a medical hair plan. Whether it suits you depends on the diagnosis, it helps some patterns and is pointless for others. The doctor will tell you honestly which group you fall in before anything is suggested.",
      },
      {
        q: "How much does hair treatment cost?",
        a: "It depends on the diagnosis, a nutritional correction, a scalp medication course and a PRP plan are all priced differently. You get the full, itemised figure in writing at your consultation, before anything begins. EMI options are available on courses.",
      },
      {
        q: "How soon will I see a difference?",
        a: "Honestly: months. Hair cycles are slow, and any clinic promising regrowth in weeks is selling, not treating. What you get from us is a diagnosis, a plan with realistic expectations for your case, and reviews at sensible intervals.",
      },
      {
        q: "Which doctors will I see?",
        a: "Consultations are doctor-led at every clinic, Edapally (Kochi), Cherthala, Calicut and Mangalore. Your doctor examines your scalp, orders investigations where needed and stays with your case through follow-ups.",
      },
    ],
  },

  /* ==================================================================
   * 3, LASER HAIR REMOVAL (Dolce)
   * ================================================================== */
  {
    slug: "laser-hair-removal",
    brand: "dolce",
    name: "Laser Hair Removal",
    metaTitle: "Laser Hair Removal in Kochi, Calicut, Cherthala & Mangalore | Dolce",
    metaDescription:
      "Doctor-supervised laser hair removal for face, underarms, arms, legs, bikini area and full body. Patch test and consultation first, transparent session pricing. Book your consultation.",
    hero: {
      eyebrow: "Doctor-supervised · Face to full body",
      heading: "Smooth skin, without the weekly routine.",
      subheading:
        "Laser hair reduction for the face, underarms, arms, legs, bikini area or full body, planned by a doctor and always starting with a patch test.",
      image: "/lp/lhr.jpg",
      imageAlt: "Practitioner performing laser hair removal with a handpiece",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
      { value: "15,000+", label: "Happy patients treated" },
      { value: "7+ Years", label: "Of laser-treatment expertise" },
      { value: "4.6★", label: "Google rating from real patients" },
    ],
    why: WHY,
    services: {
      heading: "Areas we treat",
      intro:
        "Every plan begins with a consultation and patch test on your skin tone, Indian skin needs careful laser settings, and that is exactly what the doctor plans for.",
      items: [
        {
          name: "Face",
          text: "Upper lip, chin, sideburns, jawline and full-face reduction, the area most of our patients start with.",
        },
        {
          name: "Underarms",
          text: "A quick, popular area that usually responds well, ideal as a first experience of laser hair reduction.",
        },
        {
          name: "Arms & legs",
          text: "Full arms, forearms, full legs or lower legs, planned as sensible session packages, not open-ended commitments.",
        },
        {
          name: "Bikini area",
          text: "Bikini-line and Brazilian reduction, handled with trained staff, strict privacy and a woman-led clinic team where possible.",
        },
        {
          name: "Full body",
          text: "A complete head-to-toe plan with a per-session structure you can see in full before starting, the quote covers everything, nothing appears later.",
        },
        {
          name: "Touch-ups & maintenance",
          text: "Already had sessions elsewhere? We assess where you are and plan honest maintenance rather than restarting you from zero.",
        },
      ],
    },
    process: {
      heading: "How laser hair removal works",
      steps: [
        {
          title: "Consultation & patch test",
          text: "The doctor assesses your skin and hair, then patch tests so you know exactly how your skin responds before you commit.",
        },
        {
          title: "Sessions at safe settings",
          text: "Trained staff perform every session under clinical protocols, with parameters set for your skin tone.",
        },
        {
          title: "Review & maintenance",
          text: "Progress is reviewed through your course, with occasional maintenance once reduction holds.",
        },
      ],
    },
    doctorsNote:
      "Laser hair reduction is a medical procedure, settings that suit one skin tone can burn another. At Dolce Estetica the doctor sets your parameters after a patch test, and trained staff perform every session under clinical protocols.",
    results: {
      heading: "What to expect, honestly",
      text: "Laser hair reduction thickens and slows regrowth over a course of sessions, most patients need multiple sessions, spaced weeks apart, followed by occasional maintenance. It is reduction, not permanent removal of every last hair, and hormonal areas sometimes need more sessions. At your consultation we show you what this has realistically meant for patients with your hair and skin type, in person, never as stock or AI images.",
      pairs: [
        {
          before: "/lp/results-lhr-upperlip-before.jpg",
          after: "/lp/results-lhr-upperlip-after.jpg",
          label: "Arm hair reduction",
        },
        {
          before: "/lp/results-lhr-underarm-before.jpg",
          after: "/lp/results-lhr-underarm-after.jpg",
          label: "Underarm hair reduction",
        },
        {
          before: "/lp/results-lhr-arms-before.jpg",
          after: "/lp/results-lhr-arms-after.jpg",
          label: "Legs & lower body hair reduction",
        },
      ],
    },
    concerns: [
      "Full body laser hair removal",
      "Face, upper lip / chin / sideburns",
      "Underarms",
      "Arms",
      "Legs",
      "Bikini / Brazilian",
      "Touch-ups after sessions elsewhere",
      "Not sure, advise me",
    ],
    faqs: [
      {
        q: "Is laser hair removal permanent?",
        a: "It is long-term reduction, not permanent removal of every hair. Most patients see a large, lasting reduction over a course of sessions, with fine regrowth handled by occasional maintenance. We will not promise you 'permanent', no honest clinic can, but we will show you what to expect for your hair and skin type.",
      },
      {
        q: "Is it safe for Indian skin?",
        a: "Yes, when the laser and its settings are chosen for your skin tone, which is exactly why we patch test first and why a doctor sets your parameters. Indian skin pigment absorbs laser energy differently, and the wrong setting is what causes burns and pigmentation.",
      },
      {
        q: "How many sessions will I need?",
        a: "Most areas need multiple sessions spaced several weeks apart, because hair grows in cycles and the laser only affects follicles in the active phase. Hormonal areas like the face sometimes need more. Your plan and the full cost are confirmed at the consultation before you start.",
      },
      {
        q: "How much does it cost?",
        a: "The cost depends on the areas treated, your hair type and the number of sessions in your plan. You receive the complete, itemised figure at your consultation, for the whole plan, not per session with extras hidden later. EMI options are available.",
      },
      {
        q: "Does it hurt?",
        a: "Most patients describe it as a warm snap, uncomfortable rather than painful, and it varies by area. Modern lasers cool the skin as they work. We would rather you hear this honestly at a patch test than a sales promise, the patch test is exactly the moment to judge it for yourself.",
      },
    ],
  },

  /* ==================================================================
   * 4, SKIN TREATMENTS (Dolce)
   * ================================================================== */
  {
    slug: "skin-treatments",
    brand: "dolce",
    name: "Skin Treatments",
    metaTitle: "Skin Treatments, Acne, Pigmentation, Anti-Ageing | Dolce Estetica",
    metaDescription:
      "Doctor-led skin treatments: acne, pigmentation, acne scars, anti-ageing, rejuvenation and chemical peels. Personalised plans at clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      eyebrow: "Doctor-led skin care · 4 clinics",
      heading: "Skin concerns treated in the right order.",
      subheading:
        "Acne before scars, diagnosis before fading, assessment before lines. Every skin concern treated in the right order by a dermatologist.",
      image: "/lp/skin.jpg",
      imageAlt: "Woman receiving a facial skin treatment",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "15,000+", label: "Happy patients treated" },
      { value: "4.6★", label: "Google rating from real patients" },
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
      { value: "7+ Years", label: "Of skin-treatment expertise" },
    ],
    why: WHY,
    services: {
      heading: "Treatments we offer",
      intro:
        "Medical-grade skin care planned around your diagnosis and your skin type, with strict sun protection built into every plan, because Indian skin pigments easily.",
      items: [
        {
          name: "Acne treatment",
          text: "Active breakouts controlled first, medical peels and prescribed treatment, because treating scars while acne is still active just creates new ones.",
        },
        {
          name: "Pigmentation care",
          text: "Melasma, tan, dark patches and uneven tone, diagnosed by type, because pigment sits at different depths and each needs a different approach.",
        },
        {
          name: "Acne scar treatment",
          text: "Microneedling and fractional CO2 for pitted scars, including spot-by-spot treatment for individual deep scars instead of full-face resurfacing by default.",
        },
        {
          name: "Anti-ageing",
          text: "Fine lines, laxity and volume loss assessed by a doctor, then treated with a plan that keeps you looking like yourself, just rested.",
        },
        {
          name: "Skin rejuvenation",
          text: "Dullness, texture and glow plans built on medical treatments and a home routine you can actually sustain, not a one-off facial.",
        },
        {
          name: "Chemical peels",
          text: "Medical-grade peels chosen for your concern and skin tone, performed in-clinic, with aftercare that protects Indian skin from post-peel pigmentation.",
        },
      ],
    },
    process: {
      heading: "How skin treatment works",
      steps: [
        {
          title: "Skin assessment",
          text: "A doctor examines your skin in proper light and identifies whether you are dealing with acne, marks, scarring or a mix.",
        },
        {
          title: "Sequence-correct treatment",
          text: "Active concerns are settled before resurfacing begins, the order is what protects your result.",
        },
        {
          title: "Protect & follow up",
          text: "Strict sun protection and a home routine carry the result, with reviews through your course.",
        },
      ],
    },
    doctorsNote:
      "Every skin plan at Dolce Estetica is written by a doctor after examining your skin in proper light. Skin disorders are medical conditions, they deserve diagnosis before treatment, and honesty about what treatment can achieve.",
    results: {
      heading: "Results, shown honestly",
      text: "Improvement, not erasure, a course softens texture and shadow so scars become far less noticeable in normal light, and pigmentation lightens gradually with strict sun protection. Photos of consenting patients with concerns like yours are shown at your consultation, in person. We do not publish stock or AI-generated before/after images and we do not promise perfect skin to anyone.",
      pairs: [
        {
          before: "/lp/results-skin-1.jpg",
          after: "/lp/results-skin-1.jpg",
          label: "Acne & pigmentation care",
        },
        {
          before: "/lp/results-skin-2.jpg",
          after: "/lp/results-skin-2.jpg",
          label: "Skin brightening & clarity",
        },
      ],
    },
    concerns: [
      "Acne / breakouts",
      "Pigmentation / dark patches / tan",
      "Acne scars / pits",
      "Fine lines / anti-ageing",
      "Dull skin / glow",
      "Open pores / texture",
      "Chemical peel enquiry",
      "Something else",
    ],
    faqs: [
      {
        q: "Which treatment is right for my skin?",
        a: "The one that matches your diagnosis, which is why a consultation comes first. Acne, marks and scarring are three different problems needing three different plans, and treating them in the wrong order makes things worse. The doctor examines your skin and tells you what sequence fits yours.",
      },
      {
        q: "Are chemical peels safe on Indian skin?",
        a: "Yes, when the peel is chosen and timed for your skin tone, that is a medical decision, not a menu choice. Indian skin runs a real risk of post-treatment pigmentation, which is why every peel plan here comes with strict sun protection and aftercare built in.",
      },
      {
        q: "How much do skin treatments cost?",
        a: "It depends on what you actually have, a few deep scars cost far less to treat than a full face, and a pigmentation course differs from an acne course. You get the complete, itemised quote in writing at your consultation, before anything begins. EMI options are available on courses.",
      },
      {
        q: "How many sessions will I need?",
        a: "Scar and pigmentation treatments work as courses spaced several weeks apart, with collagen continuing to remodel for months after, so the final result is judged well after the last session, not immediately. Your doctor gives you a realistic session estimate at the consultation.",
      },
      {
        q: "Can I get a 'glow' treatment before an event?",
        a: "Yes, tell us the date when you book. Event skin prep works best started a few weeks ahead, and the doctor will plan what is safely possible in the time you have, rather than an aggressive treatment that risks pigmentation right before your function.",
      },
    ],
  },

  /* ==================================================================
   * 5, HYDRAFACIAL (Dolce)
   * ================================================================== */
  {
    slug: "hydrafacial",
    brand: "dolce",
    name: "HydraFacial",
    metaTitle: "HydraFacial in Kochi, Calicut, Cherthala & Mangalore | Dolce Estetica",
    metaDescription:
      "Doctor-led HydraFacial treatments for deep cleansing, hydration, acne-prone skin, pigmentation and rejuvenation. Clinics at Edapally (Kochi), Cherthala, Calicut and Mangalore.",
    hero: {
      eyebrow: "Signature skin renewal · 4 clinics",
      heading: "The facial that works while you watch.",
      subheading:
        "Deep cleansing, painless extraction and hydration in one session. Walk in dull, walk out glowing, with no downtime.",
      image: "/gallery/aesthetic-art.jpg",
      imageAlt: "Radiant, confident woman with healthy glowing skin after a facial treatment",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "7+ Years", label: "Of aesthetic expertise" },
      { value: "15,000+", label: "Happy patients treated" },
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
      { value: "4.6★", label: "Google rating from real patients" },
    ],
    why: WHY,
    services: {
      heading: "What we treat",
      intro:
        "A three-step medical-grade treatment, cleanse and peel, extract and hydrate, protect and finish, tailored to your skin's condition on the day.",
      items: [
        {
          name: "Deep cleansing",
          text: "Gentle exfoliation and acid peel loosen dead skin and unclog pores, preparing skin for extraction without irritation.",
        },
        {
          name: "Painless extraction",
          text: "The vortex tip vacuumes out blackheads and impurities from pores, the part manual extractions usually leave red and sore, done here without the trauma.",
        },
        {
          name: "Intensive hydration",
          text: "Antioxidant and hyaluronic serums are infused deep into freshly cleaned skin, where they actually absorb instead of sitting on the surface.",
        },
        {
          name: "Acne-prone skin",
          text: "A version planned for breakout-prone skin that deep-cleans without the aggressive scrubbing that makes acne worse.",
        },
        {
          name: "Pigmentation & dullness",
          text: "Brightening boosters selected for your concern, layered on skin that has just been cleaned enough to receive them properly.",
        },
        {
          name: "Rejuvenation & maintenance",
          text: "A monthly cadence that keeps skin clean, hydrated and even, or a pre-event session for same-week glow with no downtime.",
        },
      ],
    },
    process: {
      heading: "How HydraFacial works",
      steps: [
        {
          title: "Skin assessment",
          text: "Your skin is assessed on the day, active acne or sensitivity changes what the session should include.",
        },
        {
          title: "Cleanse, extract, hydrate",
          text: "Dead skin and impurities are lifted away painlessly while tailored serums are infused into clean skin.",
        },
        {
          title: "Protect & maintain",
          text: "Sun protection afterwards, and a cadence your doctor suggests so the glow compounds instead of fading.",
        },
      ],
      image: "/lp/facial-massage.jpg",
      imageAlt: "Relaxing facial treatment during a skin care session",
    },
    doctorsNote:
      "Even a 'lunchtime facial' deserves clinical judgment, active acne, sensitive skin and certain conditions change what the treatment should include. Your skin is assessed before the session and the serums are chosen for you, not from a fixed menu.",
    results: {
      heading: "Results, what to expect",
      text: "Most patients leave the clinic visibly brighter and smoother, HydraFacial is loved precisely because the glow is immediate, with no redness or downtime. The effect builds over a course of sessions and holds best with a maintenance cadence your doctor will suggest. Photos of consenting patients are shown at the clinic, never stock or AI-generated images online.",
      pairs: [
        {
          before: "/lp/results-hydra-cleanse-before.jpg",
          after: "/lp/results-hydra-cleanse-after.jpg",
          label: "Deep cleansing & pore extraction",
        },
        {
          before: "/lp/results-hydra-glow-before.jpg",
          after: "/lp/results-hydra-glow-after.jpg",
          label: "Instant skin hydration & glow",
        },
        {
          before: "/lp/results-hydra-texture-before.jpg",
          after: "/lp/results-hydra-texture-after.jpg",
          label: "Pore refinement & texture renewal",
        },
        {
          before: "/lp/results-hydra-radiance-before.jpg",
          after: "/lp/results-hydra-radiance-after.jpg",
          label: "Pre-event radiance & tone brightening",
        },
      ],
    },
    concerns: [
      "Dull skin / want a glow",
      "Blackheads / clogged pores",
      "Oily / acne-prone skin",
      "Dehydrated skin",
      "Pigmentation / uneven tone",
      "Pre-event / bridal prep",
      "Monthly maintenance plan",
      "Not sure, advise me",
    ],
    faqs: [
      {
        q: "Is there any downtime after a HydraFacial?",
        a: "No, that is the point of the treatment. Skin may look slightly flushed for an hour or two; most patients return straight to work or an event the same day. Sun protection afterwards is the only strict instruction.",
      },
      {
        q: "How often should I get a HydraFacial?",
        a: "For maintenance, roughly monthly keeps results compounding; for a specific concern like congestion or dullness, your doctor may suggest a short course first. The cadence is confirmed at your skin assessment, not sold as a default package.",
      },
      {
        q: "Can I have a HydraFacial if I have acne?",
        a: "Often yes, the deep-cleansing step helps congested skin, but active, inflamed acne changes what the session should include. That is why the skin is assessed first, so the treatment helps your breakouts instead of aggravating them.",
      },
      {
        q: "How much does a HydraFacial cost?",
        a: "It depends on the version suited to your skin and whether it is a single session or a course. The full, itemised figure is given at your consultation, before the first session, not after. Courses can be taken on EMI.",
      },
      {
        q: "How is this different from a regular salon facial?",
        a: "A salon facial mostly massages and temporarily freshens the surface. A HydraFacial physically extracts impurities from pores and infuses serums into cleaned skin, and it happens in a clinic where a doctor has assessed your skin first and can spot anything that needs medical treatment rather than a facial.",
      },
    ],
  },

  /* ==================================================================
   * 6, GLUTATHIONE IV TREATMENT (Dolce)
   * ================================================================== */
  {
    slug: "glutathione-treatment",
    brand: "dolce",
    name: "Glutathione Treatment (IV Drip)",
    metaTitle: "Glutathione IV Treatment, Skin Brightening | Dolce Estetica",
    metaDescription:
      "Doctor-administered glutathione IV drips for dull skin, uneven tone and pigmentation support. Assessed by a doctor before the first session. Clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      eyebrow: "Doctor-administered IV therapy",
      heading: "Brightness that starts in the bloodstream.",
      subheading:
        "The body's own master antioxidant, delivered by IV drip under a doctor's supervision, as part of a plan that treats the cause of your dullness.",
      image: "/assets/about.webp",
      imageAlt: "Soft, luminous skin after a glow treatment, the radiance glutathione therapy aims for",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "4.6★", label: "Google rating from real patients" },
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
      { value: "7+ Years", label: "Of IV-therapy expertise" },
      { value: "15,000+", label: "Happy patients treated" },
    ],
    why: WHY,
    services: {
      heading: "What the treatment addresses",
      intro:
        "IV glutathione works from within. It sits alongside, never instead of, proper diagnosis and sun protection. Your doctor confirms suitability before the first session.",
      items: [
        {
          name: "Skin brightening",
          text: "Glutathione supports a brighter, more luminous appearance over a course of sessions, gradual and natural-looking, never a sudden shade change.",
        },
        {
          name: "Pigmentation support",
          text: "Used alongside prescribed pigmentation treatment, it helps even out tone from within while topical care works from the surface.",
        },
        {
          name: "Uneven skin tone",
          text: "For patchiness and tone differences across the face and body, planned as part of a full even-tone protocol.",
        },
        {
          name: "Dull & tired skin",
          text: "Stress, sleep and pollution deplete antioxidants, IV therapy replenishes them directly, with hydration included in every session.",
        },
      ],
    },
    process: {
      heading: "How glutathione IV therapy works",
      steps: [
        {
          title: "Suitability assessment",
          text: "A doctor reviews your history, skin and goals, and tells you honestly whether IV glutathione fits your plan.",
        },
        {
          title: "In-clinic IV sessions",
          text: "Comfortable, supervised sessions at doctor-set doses and gaps, with hydration built into every visit.",
        },
        {
          title: "Maintenance & sun care",
          text: "Brightness holds with maintenance and strict sun protection, the plan is mapped at your first consultation.",
        },
      ],
    },
    doctorsNote:
      "IV therapy is a medical procedure: suitability, dose and session gaps are decided by a doctor, and every session happens in-clinic under supervision, never as a home kit or a salon add-on.",
    results: {
      heading: "Results, the honest version",
      text: "Glutathione IV is gradual: brightness builds over a course of sessions and holds with maintenance and strict sun protection. It does not change your fundamental skin colour, and results genuinely vary between people, anyone promising a specific shade change is guessing. Your doctor will set realistic expectations for your skin at the first consultation, and show you what it has meant for consenting patients in person.",
      pairs: [
        {
          before: "/lp/results-glut-pigment-before.jpg",
          after: "/lp/results-glut-pigment-after.jpg",
          label: "Pigmentation & spot softening",
        },
        {
          before: "/lp/results-glut-session-before.jpg",
          after: "/lp/results-glut-session-after.jpg",
          label: "In-clinic IV drip & skin hydration",
        },
      ],
    },
    concerns: [
      "Dull skin / want brightness",
      "Uneven skin tone",
      "Pigmentation / dark patches",
      "Tanned skin",
      "Overall glow + wellness",
      "Not sure, advise me",
    ],
    faqs: [
      {
        q: "Is glutathione IV safe?",
        a: "When a doctor has assessed you first, checking your history and confirming suitability, and every session happens in a clinic under supervision. That is exactly how it is done here. It is not for everyone, and the consultation is where that is decided honestly.",
      },
      {
        q: "Will it make me fair?",
        a: "No, and we will not pretend otherwise. Glutathione supports brightness, evenness and a healthier appearance of the skin you have, it does not change your fundamental skin colour. Clinics promising a specific shade change are selling, not practising medicine.",
      },
      {
        q: "How many sessions will I need?",
        a: "Brightness typically builds over a course of sessions spaced days to weeks apart, followed by maintenance. The exact plan depends on your skin, your goal and how your body responds, your doctor maps it out at the first consultation, with the full cost itemised before you begin.",
      },
      {
        q: "Are there side effects?",
        a: "IV therapy carries the usual small risks of any IV procedure, which is why it is doctor-led in a clinic setting, and why the assessment first matters. Most patients find sessions comfortable and uneventful; the doctor will walk you through everything before your first session.",
      },
      {
        q: "Can I do glutathione alongside my pigmentation treatment?",
        a: "Often yes, IV therapy is planned as a complement to topical and in-clinic pigmentation care, plus the sun protection both depend on. Bring your current products and history to the consultation and the doctor will build one coherent plan.",
      },
    ],
  },

  /* ==================================================================
   * 7, VASER LIPOSUCTION (MedLounges)
   * ================================================================== */
  {
    slug: "vaser-liposuction",
    brand: "medlounges",
    name: "VASER Liposuction",
    metaTitle: "VASER Liposuction, Body Contouring | MedLounges (Dolce Estetica Group)",
    metaDescription:
      "VASER liposuction for abdomen, waist, arms, thighs, back and body contouring. Surgeon consultation, honest candidacy assessment and full cost in writing. Medlounges, the body contouring brand of the Dolce Estetica group.",
    hero: {
      eyebrow: "Medlounges · Surgical body contouring",
      heading: "Reshape what diet and gym won't move.",
      subheading:
        "VASER ultrasound targets stubborn fat on the abdomen, waist, arms, thighs and back. A surgical contouring procedure, planned by a surgeon who tells you honestly whether it is right for you.",
      image: "/lp/vaser.jpg",
      imageAlt: "Operating theatre prepared for a surgical body contouring procedure",
      trustChips: ["4 clinics in South India", "4.6★ Google-rated care", "Consultation before treatment"],
    },
    impact: [
      { value: "15,000+", label: "Happy patients treated" },
      { value: "7+ Years", label: "Of surgical expertise" },
      { value: "4.6★", label: "Google rating from real patients" },
      { value: "4 clinics", label: "Kochi, Cherthala, Calicut and Mangalore" },
    ],
    why: WHY,
    services: {
      heading: "Areas we contour",
      intro:
        "VASER's ultrasound energy targets fat selectively, sparing nerves, blood vessels and connective tissue, which allows defined contouring, including delicate areas.",
      items: [
        {
          name: "Abdomen",
          text: "Upper and lower abdominal fat, including the stubborn band that survives diets, the most commonly contoured area.",
        },
        {
          name: "Waist & flanks",
          text: "Love handles and muffin-top areas that reshape the whole torso when treated together with the abdomen.",
        },
        {
          name: "Arms",
          text: "Full-arm contouring with the gentleness VASER is known for, an area where precision matters most.",
        },
        {
          name: "Thighs",
          text: "Inner and outer thighs, planned as a set so the legs stay balanced and natural in proportion.",
        },
        {
          name: "Back & bra area",
          text: "Upper and lower back rolls, including the fat around the bra band that clothing shows first.",
        },
        {
          name: "Multi-area body contouring",
          text: "Combined areas planned in one surgical session where safe, discussed fully, with recovery time explained honestly.",
        },
      ],
    },
    process: {
      heading: "How VASER liposuction works",
      steps: [
        {
          title: "Surgeon consultation",
          text: "Examination, health review and an honest answer on candidacy, with photographs and the full surgical quote in writing.",
        },
        {
          title: "The procedure",
          text: "VASER ultrasound gently loosens fat before precise removal, planned for the areas you want reshaped.",
        },
        {
          title: "Recovery & follow-up",
          text: "Walking within a day or two, desk work within about a week, with the final contour emerging over months as swelling settles.",
        },
      ],
      image: "/lp/surgeon.jpg",
      imageAlt: "Surgical team in an operating theatre",
    },
    doctorsNote:
      "Every VASER journey starts with a surgeon's consultation: examination, health assessment, and an honest discussion of candidacy, realistic outcomes and recovery. Medlounges and Dolce Estetica are run by the same medical leadership, patients of either are cared for across the group.",
    results: {
      heading: "Results & recovery, the honest version",
      text: "VASER liposuction permanently removes the treated fat cells, but the result is a reshaped contour, not weight loss, and keeping it depends on your lifestyle. Swelling masks the final shape for weeks, with full definition appearing over months as it settles. Photos of consenting patients are shown at the surgical consultation, in person, never as stock or AI-generated images online.",
      pairs: [
        {
          before: "/lp/results-ml-abdomen-before.jpg",
          after: "/lp/results-ml-abdomen-after.jpg",
          label: "Abdomen & flank contouring",
        },
        {
          before: "/lp/results-ml-chin-before.jpg",
          after: "/lp/results-ml-chin-after.jpg",
          label: "Chin & jawline contouring",
        },
        {
          before: "/lp/results-ml-chest-before.jpg",
          after: "/lp/results-ml-chest-after.jpg",
          label: "Chest contouring",
        },
      ],
    },
    concerns: [
      "Abdomen / belly fat",
      "Waist / love handles",
      "Arms",
      "Thighs",
      "Back / bra area",
      "Multiple areas / full contouring",
      "Not sure, advise me",
    ],
    faqs: [
      {
        q: "Am I a candidate for VASER liposuction?",
        a: "The best candidates are close to a stable weight, healthy, and bothered by specific areas of stubborn fat that diet and exercise have not moved. It is not a weight-loss treatment and not right for everyone, the surgeon's consultation exists precisely to answer this question honestly for your body and health.",
      },
      {
        q: "How is VASER different from regular liposuction?",
        a: "VASER uses ultrasound energy to loosen fat cells before removal, which allows finer, more selective contouring and is designed to spare nerves, vessels and connective tissue, meaning smoother results and, typically, more comfortable recovery than conventional liposuction.",
      },
      {
        q: "How long is recovery?",
        a: "Most patients are up and walking within a day or two and back to desk work within about a week, with compression garments worn for several weeks as advised. Swelling settles progressively, the final contour emerges over months, and your surgeon maps this timeline for you personally before surgery.",
      },
      {
        q: "How much does VASER liposuction cost?",
        a: "It depends on the number and size of areas treated, anaesthesia and theatre time. After the surgeon's consultation you receive one complete, itemised surgical quote covering everything, procedure, facility, anaesthesia and aftercare, so nothing appears after your decision. EMI options are available.",
      },
      {
        q: "Is the fat gone permanently?",
        a: "The fat cells removed in the treated areas do not return. The remaining cells can still enlarge if weight is gained, so the result holds best with a stable, healthy lifestyle, which is why we frame VASER as contouring, not a fix. We would rather you hear that now than after surgery.",
      },
    ],
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}

export { TESTIMONIALS as LANDING_TESTIMONIALS };

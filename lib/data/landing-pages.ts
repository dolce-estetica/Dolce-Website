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
 * The four campaign blocks with `campaign` metadata use the client-supplied
 * Google Docs revision from 9 October 2026. Source URLs and asset gaps are in
 * docs/qa/2026-10-09-campaign-briefs/verification.md.
 *
 * Original spreadsheet copy guidelines (before the campaign revision):
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

export type LandingResultPair = { before: string; after: string; label: string; caption?: string; timeline?: string };

export type LandingPage = {
  slug: string;
  brand: LandingBrand;
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** Client Google Docs campaign refresh, October 2026. */
  campaign?: {
    whyHeading: string;
    concernIntro: string;
    formIntro: string;
    locationsIntro: string;
  };
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
    items: { name: string; text: string; cta?: string; concern?: string }[];
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
    campaign: {
      "whyHeading": "Why Patients Trust Dolce Estetica",
      "concernIntro": "Tap your concern and mention it on the call, so the right specialist is ready for you.",
      "formIntro": "Our team calls you back within 2 hours to confirm your clinic and slot",
      "locationsIntro": "For appointments at any of our clinics. Book here and we will find your earliest slot."
    },
    slug: "dermatology-clinic",
    brand: "dolce",
    name: "Dermatology Clinic",
    metaTitle: "Dermatologist Consultation | Dolce Estetica, Skin, Hair & Body",
    metaDescription:
      "See a qualified dermatologist for skin, face, body, hair and scalp concerns. Doctor-led consultation before any treatment. Clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      "eyebrow": "15,000+ PATIENTS TRUST DOLCE",
      "heading": "South India's #1 Destination for Cosmetic & Holistic Wellness",
      "subheading": "Your trusted aesthetic clinic for: Expert Dermatology | Advanced Testing | Custom Treatments | Clear Pricing",
      "image": "/lp/dermatology-hero.webp",
      "imageAlt": "Woman with clear, glowing skin touching her cheek in warm sunlight",
      "trustChips": [
        "4 clinics in South India",
        "4.6★ Google-rated care",
        "Consultation before treatment"
      ]
    },
    impact: [
      {
        "value": "7+ Years",
        "label": "Of dermatology expertise"
      },
      {
        "value": "4 Clinics",
        "label": "Kochi, Cherthala, Calicut and Mangalore"
      },
      {
        "value": "4.6★",
        "label": "Google rating from real patients"
      },
      {
        "value": "15,000+",
        "label": "Patients treated"
      }
    ],
    why: [
      {
        "title": "Doctor-Led Care",
        "text": "We do not delegate your care. You will always consult directly with a certified dermatologist before, during, and after your treatment"
      },
      {
        "title": "AI-Assisted Diagnosis",
        "text": "We look underneath the surface. Clinical AI imaging captures the microscopic details of your skin and scalp to eliminate any diagnostic guesswork"
      },
      {
        "title": "Natural-Looking Results",
        "text": "We respect your skin's biology. Our treatments are calibrated to enhance, not alter, Indian skin types with flat, upfront pricing and no surprises"
      },
      {
        "title": "Modern Technology",
        "text": "We do not compromise on safety. Our aesthetic clinic spaces are built for privacy and equipped exclusively with US-FDA-cleared devices"
      }
    ],
    services: {
      "heading": "Tell Us Your Concern. We’ll Take It From Here",
      "intro": "Looking for a dermatologist near me? Your skin, hair, and body are in trusted hands. Our doctors examine every concern before suggesting any treatment",
      "items": [
        {
          "name": "Skin",
          "text": "Stop hiding breakouts and scars. We isolate the precise internal trigger to clear your skin from within",
          "cta": "Get My Skin Checked",
          "concern": "Acne or acne scars"
        },
        {
          "name": "Face",
          "text": "Your face deserves better. Receive a clinical, medical-grade roadmap to erase dullness and open pores",
          "cta": "Fix My Face Concerns",
          "concern": "Anti-ageing and fine lines"
        },
        {
          "name": "Body",
          "text": "Achieve completely even skin tone. Advanced clinical tech safely erases stubborn tan, stretch marks, and acne",
          "cta": "Treat My Body Concerns",
          "concern": "Pigmentation or dark patches"
        },
        {
          "name": "Hair and Scalp",
          "text": "True restoration happens beneath the surface. We medically evaluate your scalp health before prescribing anything",
          "cta": "Stop My Hair Fall",
          "concern": "Hair fall or thinning"
        }
      ]
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
      "heading": "Real Results, Zero Filters",
      "text": "Real patients, no filters. Explore real treatment results. Results vary by skin, hair, and diagnosis.",
      "pairs": [
        {
          "before": "/lp/derma-skin-treat.webp",
          "after": "/lp/derma-skin-treat.webp",
          "label": "Skin & acne treatment results"
        },
        {
          "before": "/lp/dermatology-skin-treat.webp",
          "after": "/lp/dermatology-skin-treat.webp",
          "label": "Dermatological skin care results"
        },
        {
          "before": "/lp/results-hair-1-before.jpg",
          "after": "/lp/results-hair-1-after.jpg",
          "label": "Hair fall treatment"
        }
      ]
    },
    concerns: [
      "Acne or acne scars",
      "Pigmentation or dark patches",
      "Hair fall or thinning",
      "Scalp problems",
      "Skin allergy or rash",
      "Anti-ageing and fine lines",
      "Under-eye dark circles",
      "General skin check-up",
      "Something else"
    ],
    faqs: [
      {
        "q": "Is the first consultation free?",
        "a": "The consultation fee at our dermatologist clinic depends on the treatment you have selected. After your assessment, you get a full written estimate before any treatment starts, with no hidden charges"
      },
      {
        "q": "Not sure what I need?",
        "a": "Tell us your concern and the doctor will recommend only what suits you. Whether you searched for a dermatologist near me or an aesthetic clinic, many visits end with simple medication or advice"
      },
      {
        "q": "What should I bring?",
        "a": "Skincare or hair products and medicines you have used in the last 6 months. Bring recent thyroid, hormone, or blood reports if you have them, so tests are not repeated."
      },
      {
        "q": "Are lasers and peels safe for Indian skin?",
        "a": "When chosen and done by a qualified doctor, at a dermatologist clinic, yes. Your doctor picks settings for your skin tone and tests a small area first when needed."
      },
      {
        "q": "How long until I see results?",
        "a": "It depends on the concern and treatment. Your doctor gives a realistic timeline for you at the consultation."
      }
    ],
  },

  /* ==================================================================
   * 2, HAIR TREATMENT (Dolce)
   * ================================================================== */
  {
    campaign: {
      "whyHeading": "Why Our Clients Choose Dolce Estetica",
      "concernIntro": "Tap your concern so the right specialist is ready for you.",
      "formIntro": "Our team calls you back within 2 hours to confirm your clinic and slot",
      "locationsIntro": "For hair treatment appointments at any of our clinics. Book here and we will find your earliest slot."
    },
    slug: "hair-treatment",
    brand: "dolce",
    name: "Hair Treatment",
    metaTitle: "Hair Fall & Hair Loss Treatment | Dolce Estetica, Doctor-Led Care",
    metaDescription:
      "Doctor-led assessment and treatment for hair fall, hair thinning, PRP therapy and scalp concerns. Find the cause before treating it. Clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      "eyebrow": "15,000+ PATIENTS TRUST DOLCE",
      "heading": "Best Personalized Hair Loss Treatment | Advanced Hair Care",
      "subheading": "Skip temporary surface fixes. Get doctor-led hair treatments backed by science for visible, lasting results",
      "image": "/lp/hair-treatment-hero.webp",
      "imageAlt": "Man parting his hair with both hands to examine his scalp and hairline",
      "trustChips": [
        "4 clinics in South India",
        "4.6★ Google-rated care",
        "Consultation before treatment"
      ]
    },
    impact: [
      {
        "value": "7+ Years",
        "label": "Of dermatology expertise"
      },
      {
        "value": "4 Clinics",
        "label": "Kochi, Cherthala, Calicut and Mangalore"
      },
      {
        "value": "4.6★",
        "label": "Google rating from real patients"
      },
      {
        "value": "15,000+",
        "label": "Patients treated"
      }
    ],
    why: [
      {
        "title": "Doctor-Led Care",
        "text": "We do not delegate your care. You will always consult directly with a certified dermatologist for hair loss before, during, and after your treatment"
      },
      {
        "title": "AI-Assisted Diagnosis",
        "text": "We look underneath the surface. Clinical AI imaging captures the microscopic details of your skin and scalp to eliminate any diagnostic guesswork"
      },
      {
        "title": "Natural-Looking Results",
        "text": "We respect your hair's biology. Our treatments awaken dormant follicles naturally to restore density calibrated perfectly for Indian hair genetics"
      },
      {
        "title": "Modern Technology",
        "text": "We do not compromise on safety. Our spaces are built for privacy and equipped exclusively with US-FDA-cleared devices"
      }
    ],
    services: {
      "heading": "Your Hair Concern Gets Targeted Solutions",
      "intro": "A surface-level fix will never solve an internal problem. That is why every hair loss treatment at Dolce Estetica begins with a deep-layer scalp analysis and medical blood diagnostics, led by a dermatologist for hair loss who treats the actual physiological trigger",
      "items": [
        {
          "name": "Hair Fall",
          "text": "Stop counting lost strands. With a specialist you get the targeted medical protocol isolates hidden hormonal and nutritional triggers to freeze hair fall right at the root",
          "cta": "Stop My Hair Fall Now",
          "concern": "Hair fall or thinning"
        },
        {
          "name": "Hair Thinning",
          "text": "Protect your existing hair density before it is too late. Our targeted clinical therapies actively reverse follicle shrinking, thickening every single strand from the base",
          "cta": "Reclaim My Hair Density",
          "concern": "Hair fall or thinning"
        },
        {
          "name": "Hair Regrowth",
          "text": "Wake Up Dormant Roots. Trust the evidence-based strategy that combines custom physician topicals with deep-tissue cellular scalp stimulation",
          "cta": "Activate New Hair Growth",
          "concern": "Hair fall or thinning"
        },
        {
          "name": "PRP Therapy",
          "text": "Tap into your body's natural healing power. In-clinic, high-concentration platelet-rich plasma safely reactivates sleeping follicles to fast-track visible volume",
          "cta": "Boost My Follicles with PRP",
          "concern": "Hair fall or thinning"
        },
        {
          "name": "Scalp Treatment",
          "text": "Healthy hair cannot grow in a toxic environment. Advanced clinical micro-exfoliation instantly wipes away stubborn dandruff scales, oil imbalances, and deep scalp irritation",
          "cta": "Reset My Scalp Health",
          "concern": "Scalp problems"
        }
      ]
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
      "heading": "Real Results, Zero Filters",
      "text": "Every transformation maps a documented clinical journey, capturing actual follicular progression in its truest form",
      "pairs": [
        {
          "before": "/lp/results-hair-1-before.jpg",
          "after": "/lp/results-hair-1-after.jpg",
          "label": "Hair fall treatment"
        },
        {
          "before": "/lp/results-hair-2-before.jpg",
          "after": "/lp/results-hair-2-after.jpg",
          "label": "Hair density improvement"
        },
        {
          "before": "/lp/hair-treatment-before-after.webp",
          "after": "/lp/hair-treatment-before-after.webp",
          "label": "Hair restoration & regrowth results"
        }
      ]
    },
    concerns: [
      "Acne or acne scars",
      "Pigmentation or dark patches",
      "Hair fall or thinning",
      "Scalp problems",
      "Skin allergy or rash",
      "Anti-ageing and fine lines",
      "Under-eye dark circles",
      "General skin check-up",
      "Something else"
    ],
    faqs: [
      {
        "q": "Why should I see a dermatologist for hair loss instead of just buying a proven hair fall product?",
        "a": "Shampoos and oils only treat the outer layer of your hair, but thinning usually starts deep down due to stress, hormones, or nutritional gaps. Masking the symptoms won't solve the core issue. We find and fix the root cause first."
      },
      {
        "q": "Does PRP actually work for hair thinning, or is it just marketing hype?",
        "a": "It works incredibly well, but only if your hair roots are still alive. PRP uses your own blood cells to jumpstart weak, shrinking follicles. If a root is completely dead, no amount of PRP will bring it back. If you aren't a good fit for it, we will tell you honestly on day one instead of asking for your money"
      },
      {
        "q": "What is the true cost of hair loss treatment? Will I face hidden add-ons?",
        "a": "The cost depends entirely on what is causing your hair loss and how many sessions you need. We don't believe in surprise bills or pushy upselling. You will get a flat, fully written estimate before any treatment begins, and that number will not change. What you see is exactly what you pay"
      },
      {
        "q": "Honestly, how long does it take to see visible hair regrowth?",
        "a": "Hair grows slowly, so anyone promising overnight results is lying to you. Usually, it takes about 4 to 6 weeks just to get sudden shedding under control. So when you meet our doctors, they will explain the whole journey to you with accurate plan"
      },
      {
        "q": "Will my care be managed by an actual doctor, or delegated to a technician?",
        "a": "You will be treated by a certified dermatologist from start to finish. Your scans, your treatments, and your check-ins are always handled directly by your doctor"
      }
    ],
  },

  /* ==================================================================
   * 3, LASER HAIR REMOVAL (Dolce)
   * ================================================================== */
  {
    campaign: {
      "whyHeading": "Why Our Clients Choose Dolce Estetica",
      "concernIntro": "Tap your target area to let us know your concern, so the right laser specialist is fully ready for you.",
      "formIntro": "Our team calls you back within 2 hours to confirm your clinic location and preferred laser slot.",
      "locationsIntro": "For laser appointments at any of our clinics. Book here and we will find your earliest slot."
    },
    slug: "laser-hair-removal",
    brand: "dolce",
    name: "Laser Hair Removal",
    metaTitle: "Laser Hair Removal in Kochi, Calicut, Cherthala & Mangalore | Dolce",
    metaDescription:
      "Doctor-supervised laser hair removal for face, underarms, arms, legs, bikini area and full body. Patch test and consultation first, transparent session pricing. Book your consultation.",
    hero: {
      "eyebrow": "15,000+ PATIENTS TRUST DOLCE",
      "heading": "Full Body Laser Hair Reduction – Painless, FDA-Approved",
      "subheading": "Achieve smooth, carefree skin with laser hair removal treatment made just for you",
      "image": "/lp/laser-hair-removal-hero.webp",
      "imageAlt": "Therapist in gloves gliding a laser hair removal handpiece over a client's lower leg",
      "trustChips": [
        "4 clinics in South India",
        "4.6★ Google-rated care",
        "Consultation before treatment"
      ]
    },
    impact: [
      {
        "value": "7+ Years",
        "label": "Of dermatology expertise"
      },
      {
        "value": "4 Clinics",
        "label": "Kochi, Cherthala, Calicut and Mangalore"
      },
      {
        "value": "4.6★",
        "label": "Google rating from real patients"
      },
      {
        "value": "15,000+",
        "label": "Patients treated"
      }
    ],
    why: [
      {
        "title": "Doctor-Led Care",
        "text": "We do not delegate your skin safety. You will always consult directly with a certified dermatologist to assess your hair profile and skin tone before your session begins."
      },
      {
        "title": "Precision Parameter Matching",
        "text": "We eliminate the guesswork. Our doctors carefully tune the clinical lasers to match your exact hair density and skin tone, ensuring safe and effective results right at the root"
      },
      {
        "title": "Natural, Smooth Results",
        "text": "We respect your skin's biology. Our laser hair removal treatments permanently reduce growth while maintaining skin softness, backed by flat, upfront pricing and zero surprise bills."
      },
      {
        "title": "Advanced Cooling Technology",
        "text": "We do not compromise on comfort. We operate exclusively with gold-standard, US-FDA-cleared systems using advanced skin-chilling tech for a pain-free experience."
      }
    ],
    services: {
      "heading": "Your Smooth Skin, On Your Schedule",
      "intro": "Looking for laser hair reduction near me? Get permanent smoothness from head to toe. A dermatologist evaluates your skin type and hair density to customize the perfect laser parameters for you",
      "items": [
        {
          "name": "Face & Delicate Areas",
          "text": "Smooth, fuzz-free skin without the breakouts. Safely precision-target your upper lip, chin, or sidelocks; minus the pain of threading and waxing",
          "cta": "Smooth My Face Areas",
          "concern": "Upper Lip & Chin"
        },
        {
          "name": "Full Arms & Underarms",
          "text": "Effortless, even-toned skin from shoulder to fingertips. Effectively clear hair across your arms, hands, and underarms without the hassle.",
          "cta": "Clear My Arm Hair",
          "concern": "Full Arms or Legs"
        },
        {
          "name": "Full Legs & Bikini",
          "text": "Experience total freedom in your wardrobe. High-speed laser tech quickly and painlessly processes large surface zones",
          "cta": "Smooth My Legs & Bikini Area",
          "concern": "Bikini Line"
        },
        {
          "name": "Full Body Grooming",
          "text": "The ultimate full-body transformation. A comprehensive, multi-zone full body laser hair removal protocol customized safely for both men and women across chests, backs, and abdomens.",
          "cta": "View Full Body Packages",
          "concern": "Full Body Laser"
        }
      ]
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
      "heading": "Real Results, Zero Filters",
      "text": "Real journey, no filters. See authentic laser progress from an existing Dolce patient. Your doctor will discuss session counts and realistic timelines at your consultation.",
      "pairs": [
        {
          "before": "/lp/lhr-before-after.webp",
          "after": "/lp/lhr-before-after.webp",
          "label": "Laser hair reduction results"
        }
      ]
    },
    concerns: [
      "Full Body Laser",
      "Underarms",
      "Full Arms or Legs",
      "Upper Lip & Chin",
      "Bikini Line",
      "Chest & Abdomen",
      "Back Grooming",
      "Facial Sidelocks",
      "Consultation Only"
    ],
    faqs: [
      {
        "q": "Does laser hair removal treatment hurt?",
        "a": "Not at all. We use next-generation systems equipped with built-in sapphire cooling tech that instantly chills the skin surface, turning the laser pulses into a completely comfortable, pain-free sensation"
      },
      {
        "q": "How many sessions will I actually need?",
        "a": "Hair grows in cycles. For permanent reduction with full body laser hair removal, most areas require 6 to 8 sessions spaced a few weeks apart to catch every follicle in its active growth phase"
      },
      {
        "q": "Will I face hidden package charges?",
        "a": "Never. We practice absolute pricing integrity. You receive a flat, fully written, itemized estimate based entirely on your chosen body areas before your first session begins; what you see is exactly what you pay."
      },
      {
        "q": "Is it safe for all Indian skin tones?",
        "a": "Yes, perfectly safe. Because our treatments are strictly dermatologist-led, your doctor custom-selects the exact laser wavelengths and pulse settings to protect your skin's melanin while destroying the hair root."
      },
      {
        "q": "What should I do before my first session?",
        "a": "Shave the target area 24 hours before your visit, but avoid waxing, plucking, or threading for at least 3 weeks, as the laser needs the hair root intact under the skin to work effectively."
      }
    ],
  },

  /* ==================================================================
   * 4, SKIN TREATMENTS (Dolce)
   * ================================================================== */
  {
    campaign: {
      "whyHeading": "Why Our Clients Choose Dolce Estetica",
      "concernIntro": "Tap your concern and the right specialist will be there for you.",
      "formIntro": "Our team calls you back within 2 hours to confirm your clinic and slot",
      "locationsIntro": "Looking for a skin clinic near me? For appointments at any of our clinics. Book here and we will find your earliest slot."
    },
    slug: "skin-treatments",
    brand: "dolce",
    name: "Skin Treatments",
    metaTitle: "Skin Treatments, Acne, Pigmentation, Anti-Ageing | Dolce Estetica",
    metaDescription:
      "Doctor-led skin treatments: acne, pigmentation, acne scars, anti-ageing, rejuvenation and chemical peels. Personalised plans at clinics in Kochi, Cherthala, Calicut and Mangalore.",
    hero: {
      "eyebrow": "15,000+ PATIENTS TRUST DOLCE",
      "heading": "Transform Your Skin From the First Session",
      "subheading": "No more filters, concealer, or second-guessing. Trust a skin doctor and doctor-led treatments for clear, glowing skin",
      "image": "/lp/skin-treatments-hero.webp",
      "imageAlt": "Woman with clear, glowing skin touching her cheek against a soft beige wall",
      "trustChips": [
        "4 clinics in South India",
        "4.6★ Google-rated care",
        "Consultation before treatment"
      ]
    },
    impact: [
      {
        "value": "7+ Years",
        "label": "Of skin-treatment expertise"
      },
      {
        "value": "4 Clinics",
        "label": "Kochi, Cherthala, Calicut and Mangalore"
      },
      {
        "value": "4.6★",
        "label": "Google rating from real patients"
      },
      {
        "value": "15,000+",
        "label": "Patients treated"
      }
    ],
    why: [
      {
        "title": "Doctor-Led Care",
        "text": "Your plan is designed and supervised by a certified dermatologist, your skin specialist at every step. You consult the doctor directly before, during, and after every treatment"
      },
      {
        "title": "AI-Assisted Skin Analysis",
        "text": "We look beneath the surface. Clinical AI imaging reads your skin in fine detail, so your plan is based on diagnosis and not guesswork"
      },
      {
        "title": "Safe for Indian Skin",
        "text": "Indian skin pigments easily, so every treatment is chosen and made according to your skin tone, with strict sun protection and aftercare added"
      },
      {
        "title": "Modern Technology",
        "text": "We do not compromise on safety. Our clinics use modern, US-FDA-approved devices selected for effective, controlled treatments"
      }
    ],
    services: {
      "heading": "A Doctor-Led Plan for Every Skin Concern",
      "intro": "If you are searching for a skin clinic near me, start with a diagnosis. Acne, pigmentation, and scars are different battles, so every plan at Dolce Estetica begins with a doctor's assessment and the right care in the right sequence",
      "items": [
        {
          "name": "Acne",
          "text": "Get breakouts under control first. Medical peels and prescribed protocols treat the root cause, so today's pimples do not become tomorrow's scars",
          "cta": "Clear My Breakouts",
          "concern": "Acne or breakouts"
        },
        {
          "name": "Pigmentation",
          "text": "Understand your pigmentation before treating it. Your doctor assesses the type and depth of pigmentation, then recommends targeted clinical care to help restore a more even skin tone",
          "cta": "Even Out My Skin Tone",
          "concern": "Pigmentation, dark patches or tan"
        },
        {
          "name": "Acne Scars",
          "text": "Deep acne scars need more than surface-level care. Advanced microneedling and fractional CO₂ laser treatments work deeper into the skin to improve the appearance of pits, texture, and scar shadows",
          "cta": "Smooth My Scars",
          "concern": "Acne scars or pits"
        },
        {
          "name": "Anti-Ageing",
          "text": "Your skin changes with time. Our dermatologists assess your skin profile and recommend treatments to soften fine lines, restore natural-looking volume, and improve firmness",
          "cta": "Refresh My Skin",
          "concern": "Fine lines or anti-ageing"
        },
        {
          "name": "Skin Rejuvenation",
          "text": "Bring back your glow with clinical treatments and a home routine you can actually follow. Designed to improve dullness, uneven texture, and overall skin quality",
          "cta": "Get My Glow Back",
          "concern": "Dull skin or glow"
        },
        {
          "name": "Chemical Peel",
          "text": "See the real results with custom medical-grade peels matched to your skin tone, safely performed in-clinic with dedicated post-care protection",
          "cta": "Plan My Peel",
          "concern": "Chemical peel enquiry"
        }
      ]
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
      "heading": "Real Results, Zero Filters",
      "text": "We never use stock or AI-generated before-and-after images. See how scars soften, pigmentation improves, and skin quality changes across real cases like yours",
      "pairs": [
        {
          "before": "/lp/skin-treatments-before-after.webp",
          "after": "/lp/skin-treatments-before-after.webp",
          "label": "Skin treatment results"
        },
        {
          "before": "/lp/derma-skin-treat.webp",
          "after": "/lp/derma-skin-treat.webp",
          "label": "Acne & pigmentation care"
        },
        {
          "before": "/lp/dermatology-skin-treat.webp",
          "after": "/lp/dermatology-skin-treat.webp",
          "label": "Dermatological skin care"
        }
      ]
    },
    concerns: [
      "Acne or breakouts",
      "Pigmentation, dark patches or tan",
      "Acne scars or pits",
      "Fine lines or anti-ageing",
      "Dull skin or glow",
      "Open pores or texture",
      "Chemical peel enquiry",
      "Something else"
    ],
    faqs: [
      {
        "q": "Which treatment is right for my skin?",
        "a": "The one that matches your diagnosis, which is why the consultation comes first. Acne, marks, and scars each need their own plan, and the order matters. Your skin doctor examines your skin and tells you exactly what to do first"
      },
      {
        "q": "Are chemical peels safe on Indian skin?",
        "a": "Yes, when the peel is chosen according to your skin tone. That is a medical decision, not a menu choice. Indian skin can become pigmented after treatment, so every peel plan comes with strict sun protection and aftercare."
      },
      {
        "q": "How much do skin treatments cost?",
        "a": "It depends on what you actually have. A few deep scars cost far less to treat than a full face, and a pigmentation course differs from an acne course. You get a complete, itemised quote in writing before anything begins. EMI options are available on courses."
      },
      {
        "q": "How many sessions will I need?",
        "a": "Scars and pigmentation are treated as courses, spaced a few weeks apart. Your skin keeps rebuilding collagen for months after, so the final result shows well after your last session. Your doctor gives you a realistic estimate on day one."
      },
      {
        "q": "Can I get a glow treatment before an event?",
        "a": "Yes. Tell us the date when you book. Event prep works best when started a few weeks ahead, and your skin specialist will plan what is safe in the time you have, not an aggressive treatment that risks pigmentation right before your function"
      }
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
      // Hero photo swapped to the client's 2026 banner set (30 Sep 2026).
      // UNDO: restore image "/lp/hydrafacial-hero.webp" and alt "Therapist performing a HydraFacial with a serum handpiece on a relaxed South Indian patient in a bright clinic".
      image: "/lp/hydrafacial-hero.jpg",
      imageAlt:
        "Therapist gliding a hydrafacial handpiece across a relaxed client's cheek in a bright clinic",
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
          name: "Deep Cleansing",
          text: "Gentle exfoliation and vortex extraction loosen dead skin cells, unclog congested pores, and remove impurities without irritation.",
        },
        {
          name: "Hydration",
          text: "Antioxidant and hyaluronic serums are infused deep into freshly cleaned skin to restore moisture and long-lasting glow.",
        },
        {
          name: "Acne",
          text: "Targeted decongestion and salicylic infusions for breakout-prone skin, calming active inflammation without harsh scrubbing.",
        },
        {
          name: "Pigmentation",
          text: "Brightening boosters and active serums selected for your skin tone, layered on freshly exfoliated skin to lighten dark spots.",
        },
        {
          name: "Skin Rejuvenation",
          text: "Cellular renewal and nourishing peptides that restore smooth texture, elasticity, and immediate pre-event radiance.",
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
          before: "/lp/hydrafacial-before-after.webp",
          after: "/lp/hydrafacial-before-after.webp",
          label: "HydraFacial skin rejuvenation results",
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
      // Hero photo swapped to the client's 2026 banner set (30 Sep 2026).
      // UNDO: restore image "/assets/about.webp" and alt "Soft, luminous skin after a glow treatment, the radiance glutathione therapy aims for".
      image: "/lp/glutathione-treatment-hero.jpg",
      imageAlt:
        "Woman reclining in a clinic chair receiving a glutathione IV drip while a nurse inserts the line",
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
          before: "/lp/glutathione-result-1.jpeg",
          after: "/lp/glutathione-result-1.jpeg",
          label: "Skin tone brightening & radiance",
        },
        {
          before: "/lp/glutathione-result-2.jpeg",
          after: "/lp/glutathione-result-2.jpeg",
          label: "Pigmentation & spot reduction",
        },
        {
          before: "/lp/glutathione-result-3.jpeg",
          after: "/lp/glutathione-result-3.jpeg",
          label: "In-clinic IV therapy results",
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
      // Hero photo swapped to the client's 2026 banner set (30 Sep 2026).
      // UNDO: restore image "/lp/vaser-lipo-hero.webp" and alt "Toned, contoured abdomen after body sculpting, photographed against a dark studio background".
      image: "/lp/vaser-liposuction-hero.jpg",
      imageAlt:
        "Woman's toned, contoured waistline and abdomen in warm studio light",
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
          text: "Upper and lower abdominal fat, including stubborn bands that resist diet and exercise.",
        },
        {
          name: "Waist",
          text: "Love handles and flank areas reshaped with ultrasound precision to sculpt the torso.",
        },
        {
          name: "Arms",
          text: "Selective arm fat liquefaction and tightening, preserving nerves and connective tissue.",
        },
        {
          name: "Thighs",
          text: "Inner and outer thigh sculpting planned to maintain natural, balanced proportions.",
        },
        {
          name: "Back",
          text: "Upper and lower back contouring, targeting bra-line bulges and stubborn rolls.",
        },
        {
          name: "Body Contouring",
          text: "Comprehensive multi-area surgical contouring planned safely in one structured session.",
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
          before: "/lp/vaser-lipo-contour-1.jpeg",
          after: "/lp/vaser-lipo-contour-1.jpeg",
          label: "Abdomen & waist VASER contouring",
        },
        {
          before: "/lp/vaser-lipo-contour-2.jpeg",
          after: "/lp/vaser-lipo-contour-2.jpeg",
          label: "Full body & flank VASER contouring",
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

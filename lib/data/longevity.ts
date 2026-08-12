/**
 * Longevity & wellness content.
 *
 * IMPORTANT: the copy below is written conservatively and deliberately avoids
 * naming specific tests, drugs, dosages or outcome claims. Before this page
 * goes live it must be reviewed by the clinical team so every service listed
 * is one the clinic actually delivers, and by whoever signs off on advertising
 * compliance. Treat the wording as a structure to fill in, not as final copy.
 */

export type LongevityPillar = {
  title: string;
  summary: string;
  points: string[];
};

export const longevityPillars: LongevityPillar[] = [
  {
    title: "Health & Biomarker Assessment",
    summary:
      "Every longevity journey opens with a consultation and a structured review of your health history, lifestyle and current concerns.",
    points: [
      "Doctor-led consultation, not a sales conversation",
      "Baseline assessment agreed with you before anything is booked",
      "Findings explained in plain language, with a written plan",
    ],
  },
  {
    title: "Metabolic & Weight Management",
    summary:
      "Physician-supervised weight and metabolic care, built around sustainable change rather than short cycles.",
    points: [
      "Supervised by a doctor throughout",
      "Nutrition and activity guidance matched to your routine",
      "Progress reviewed at scheduled intervals",
    ],
  },
  {
    title: "Skin Longevity",
    summary:
      "Preventive care for skin health over decades — the long view rather than a single treatment.",
    points: [
      "Preventive ageing programmes",
      "Long-term skin and hair maintenance",
      "Seasonal reviews to adjust your protocol",
    ],
  },
  {
    title: "Hair & Scalp Vitality",
    summary:
      "Early intervention for hair and scalp health, because the earlier concerns are addressed the more options remain.",
    points: [
      "Scalp health assessment",
      "Maintenance protocols between clinical sessions",
      "Guidance on what is and is not likely to help",
    ],
  },
];

export type LongevityStep = { step: string; title: string; body: string };

export const longevitySteps: LongevityStep[] = [
  {
    step: "01",
    title: "Consultation first",
    body: "You meet a doctor before you commit to anything. We listen to your concerns, review your history and tell you honestly what is worth doing — including when the answer is nothing yet.",
  },
  {
    step: "02",
    title: "A plan you can read",
    body: "You leave with a written plan: what we recommend, in what order, over what timeframe, and what it will cost. No obligation to proceed.",
  },
  {
    step: "03",
    title: "Care over time",
    body: "Longevity is measured in years, not sessions. We review progress at agreed intervals and adjust the plan as your needs change.",
  },
];

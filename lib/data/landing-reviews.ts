import { reviews } from "./reviews";
import type { Review } from "./reviews";

/**
 * Landing-page reviews, organised by treatment (Sep 2026).
 *
 * The previous 19 entries in this file were reviews scraped from the
 * MedLounges (Thiruvalla wellness hospital) Google listing — liposuction,
 * tonsillectomy and wellness-hospital stays naming MedLounges doctors.
 * All 19 have been removed; the clinic does not want reviews pointing to
 * that brand on its pages.
 *
 * Reviews now come from the Dolce Estetica pool in lib/data/reviews.ts
 * (single source of truth — this file only groups authors per treatment,
 * it does not duplicate review text). Each review belongs to exactly one
 * treatment topic, chosen by what the review actually mentions. Reviews
 * that praise the clinic without naming a treatment are "general".
 *
 * TOPIC counts vs GENERAL: dermatology 5, hair 6, laser hair removal 1,
 * skin 3, hydrafacial 2, glutathione 3, vaser 12 (recovered batch below),
 * general 33.
 * Pages are padded with general reviews up to BASE_PER_PAGE so every page
 * has a comfortably scrollable reviews row; the padding walks through all
 * 33 general reviews so each of them appears somewhere across the 7 pages.
 */

const TOPIC_AUTHORS: Record<string, string[]> = {
  "dermatology-clinic": [
    "Saumya Aneesh", // consultation, doctor explained everything
    "Millennia George", // dermatologist consultation
    "Ashly Lukose", // acne scar microneedling sessions
    "Ricin Cherian", // acne marks and pimples
    "Akshay Shijimol", // AI skin analyzer and scalp analyzer
  ],
  "hair-treatment": [
    "Anjana S", // medspa treatment for damaged hair
    "Resmibiju", // dandruff treatment
    "Veena R Nair", // medspa, stronger healthier hair
    "Sreekumar", // hair transformation
    "Anakha Pradeepan", // dandruff treatment, Korean hair spa
    "Abhinav Sachin", // dandruff treatment
  ],
  "laser-hair-removal": [
    "Anjali VV", // hair and laser treatment with Dr Risha
  ],
  "skin-treatments": [
    "Karan Bharadwaj", // go-to for skin treatments
    "Ajaykumar Mg", // pigmentation treatment
    "ANCY ALPHA ACADEMY", // skin tone improvement
  ],
  hydrafacial: [
    "Gopika S Nair", // hydrafacial
    "Divya Soman", // hydrafacial
  ],
  "glutathione-treatment": [
    "Mariya Stephy", // IV glutathione sessions
    "Aneena Agnas Thomas", // plan included glutathione and chemical peel
    "Achu Achu", // IV glutathione and chemical peel
  ],
  "vaser-liposuction": [], // no Dolce review mentions liposuction yet
};

function topicReviews(slug: string): Review[] {
  const authors = TOPIC_AUTHORS[slug] ?? [];
  return reviews.filter((r) => authors.includes(r.author));
}

/** Reviews that name no specific treatment — shared social proof. */
const GENERAL_REVIEWS: Review[] = reviews.filter(
  (r) => !Object.values(TOPIC_AUTHORS).flat().includes(r.author),
);

/**
 * Recovered from the removed MedLounges batch (Sep 2026): the reviews whose
 * text does NOT contain the word "medlounge" — the client asked for these to
 * be shown on the MedLounges-branded VASER page. They still come from the
 * MedLounges listing (some mention its doctors by name: Dr. Naina, Dr. Neena,
 * Dr. nainz), so revisit if that becomes a problem.
 */
const VASER_LIPO_REVIEWS: Review[] = [
  {
    author: "Dijish Damodaran",
    rating: 5,
    relative_time: "Edited 5 months ago",
    text: "An Excellent centre for Health wellness. 100% Recommend… this words are from my real experience…..\nI always wanted to do liposuction to get a better look , but I was worried about ...",
    initial: "D",
    color: "bg-rose-500",
    isLocalGuide: true,
    reviewsCount: 16,
  },
  {
    author: "avlyn eriz",
    rating: 5,
    relative_time: "2 months ago",
    text: "I recently visited a wellness hospital for a massage therapy session, and the experience was excellent from start to finish. The facility was clean, peaceful, and designed to create a relaxing atmosphere. The staff were professional, welcoming, and attentive, ensuring that I felt comfortable throughout my visit.",
    initial: "A",
    color: "bg-pink-600",
    isLocalGuide: true,
    reviewsCount: 13,
  },
  {
    author: "Raji Dev",
    rating: 5,
    relative_time: "2 months ago",
    text: "Good experience  doctors explained each and everything before procedure . The nurses were very kind, caring, and professional. They always checked on me, answered my questions, and made me feel comfortable throughout my stay. Thank you for the excellent care and support.",
    initial: "R",
    color: "bg-blue-600",
    isLocalGuide: false,
    reviewsCount: 4,
  },
  {
    author: "Renju R",
    rating: 5,
    relative_time: "2 months ago",
    text: "I recently underwent liposuction at this clinic and had a very positive experience. The staff were professional, friendly, and caring throughout the entire process. They took the time to answer all my questions and made me feel comfortable and well-informed.",
    initial: "R",
    color: "bg-green-600",
    isLocalGuide: false,
    reviewsCount: 6,
  },
  {
    author: "Me “Memon” Mon",
    rating: 5,
    relative_time: "2 months ago",
    text: "Liposuction procedure team. Catherine & Lintu RN’s you were  my north star.  all the nurses staff  are amazing you are all an  asset to the team & health  care. Exceptional medical service.  Dr. Naina you’re amazing an artist.",
    initial: "M",
    color: "bg-orange-600",
    isLocalGuide: false,
    reviewsCount: 3,
  },
  {
    author: "Sajith Gopalakrishnan",
    rating: 5,
    relative_time: "4 months ago",
    text: "My procedure was over on 17/04/2026\nand when I stepped out, I felt very confident. The facilities are of such a premium standard, and the beautiful ambiance didn’t give a typical hospital feel at all",
    initial: "S",
    color: "bg-rose-500",
    isLocalGuide: false,
    reviewsCount: 8,
  },
  {
    author: "P T Augustine",
    rating: 5,
    relative_time: "4 months ago",
    text: "I had an excellent experience at this hospital. The service was top-notch, and the coordination between the staff and management was seamless. I felt deeply respected and cared for throughout my stay. Their support made a stressful time much easier",
    initial: "P",
    color: "bg-violet-600",
    isLocalGuide: false,
    reviewsCount: 1,
  },
  {
    author: "A Google User",
    rating: 5,
    relative_time: "6 months ago",
    text: "Hi.. Im shihab... 11.02.2026.. Liposuction surgery done overall good experience... Dr nainz & dr Charles. All nurses  Effectively listening to patients and communicating clearly with healthcare team members... After one month will update my body condition.",
    initial: "A",
    color: "bg-cyan-700",
    isLocalGuide: false,
    reviewsCount: 1,
  },
  {
    author: "Saumya Subin",
    rating: 5,
    relative_time: "9 months ago",
    text: "I had my liposuction surgery on June 3rd and now, six months later, I couldn’t be happier with the entire experience and results. From the very first consultation, Dr. Neena made me feel confident and well-informed. She explained every detail with such patience and professionalism, and her calm and caring approach truly put me at ease.",
    initial: "S",
    color: "bg-blue-600",
    isLocalGuide: true,
    reviewsCount: 6,
  },
  {
    author: "Vishnu",
    rating: 5,
    relative_time: "3 months ago",
    text: "Just wanted to share my experience after a recent tonsillectomy here. Dr. Priyanka was my doctor and she was honestly great to work with. The whole hospital service was solid, and the nurses were super helpful and attentive the entire time. Really happy with the care I received.",
    initial: "V",
    color: "bg-green-600",
    isLocalGuide: false,
    reviewsCount: 1,
  },
  {
    author: "Nimmy Kurian",
    rating: 5,
    relative_time: "3 months ago",
    text: "There is moderate pain and swelling than I expected,but nurses and doctors explained to me clearly.nurses are amazing they encouraged for early ambulation and helped me throughout my hospital stay.All staffs are wonderful and am happy with care.",
    initial: "N",
    color: "bg-orange-600",
    isLocalGuide: false,
    reviewsCount: 2,
  },
  {
    author: "sharon Kakkanattu Jolly",
    rating: 5,
    relative_time: "Edited 6 months ago",
    text: "I wish to share my honest experience, I  came here for liposuction, got next day appointment for the procedure. Explained everything  very well\n.I noticed good teamwork and support from the staff members. Also wanted  to  mention Special thanks to nurses and doctors who helped me in pain.",
    initial: "S",
    color: "bg-rose-500",
    isLocalGuide: false,
    reviewsCount: 5,
  },
];

/**
 * Every page shows at least this many cards so the reviews row has enough
 * content to scroll comfortably (10 ≈ three desktop grid rows).
 */
const BASE_PER_PAGE = 10;

/**
 * Walk GENERAL_REVIEWS page by page (derm → hair → laser → skin → hydra →
 * glutathione → vaser) so every general review shows up on some page instead
 * of the same few fillers repeating everywhere. When the pages together need
 * more than 33 fillers the cursor wraps and the earliest slices repeat on a
 * later page — never twice within one page.
 */
let generalCursor = 0;

function padWithGeneral(topic: Review[]): Review[] {
  const need = Math.max(0, BASE_PER_PAGE - topic.length);
  const filler: Review[] = [];
  for (let i = 0; filler.length < need && i < GENERAL_REVIEWS.length; i++) {
    filler.push(GENERAL_REVIEWS[(generalCursor + i) % GENERAL_REVIEWS.length]);
  }
  generalCursor = (generalCursor + need) % GENERAL_REVIEWS.length;
  return [...topic, ...filler];
}

export const PAGE_REVIEWS: Record<string, Review[]> = {
  "dermatology-clinic": padWithGeneral(topicReviews("dermatology-clinic")),
  "hair-treatment": padWithGeneral(topicReviews("hair-treatment")),
  "laser-hair-removal": padWithGeneral(topicReviews("laser-hair-removal")),
  "skin-treatments": padWithGeneral(topicReviews("skin-treatments")),
  hydrafacial: padWithGeneral(topicReviews("hydrafacial")),
  "glutathione-treatment": padWithGeneral(topicReviews("glutathione-treatment")),
  "vaser-liposuction": padWithGeneral([
    ...topicReviews("vaser-liposuction"),
    ...VASER_LIPO_REVIEWS,
  ]),
};

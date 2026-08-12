/** Images used by the "Care & Treatments" carousel on the home page. */
export type TreatmentCard = { src: string; alt: string };

export const treatmentCards: TreatmentCard[] = [
  { src: "/treatments/acne-free-skin.png", alt: "Clear, acne-free skin" },
  { src: "/treatments/bright-even.png", alt: "Bright, even and luminous tone" },
  { src: "/treatments/hair-regrowth.png", alt: "Hair regrowth and density boost" },
  { src: "/treatments/body-detan.png", alt: "Body detan and brightening" },
  { src: "/treatments/instant-glow.png", alt: "Instant glow solutions" },
];

export type ClinicEvent = { id: number; title: string; image: string; description: string };

export const events: ClinicEvent[] = [
  {
    id: 1,
    title: "Mirror of Confidence Summit 2026",
    image: "/assets/Summit.jpeg",
    description:
      "Experience a transformative journey into the future of beauty, health, and holistic rejuvenation. The Mirror of Confidence Summit 2026 brings together leading practitioners, innovators, and wellness experts to share insights, techniques, and breakthrough advancements in aesthetic care. Discover curated sessions, interactive demos, and expert-led discussions designed to elevate your understanding of modern wellness and empower a more confident, radiant you.",
  },
];

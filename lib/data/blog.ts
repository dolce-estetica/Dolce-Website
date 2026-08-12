/**
 * Blog posts. The previous site loaded these from its CMS at runtime; with the
 * CMS out of scope this file is the source of truth — add an entry here to
 * publish a post.
 */
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  date: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "welcome-to-dolce-estetica",
    title: "Welcome to Dolce Estetica",
    excerpt:
      "Beauty isn't created, it's revealed. An introduction to our doctor-led approach to aesthetics and wellness.",
    coverImage: "/assets/blog-placeholder.jpg",
    author: "Dolce Estetica",
    date: "2026-01-15",
    content: [
      "At Dolce Estetica, we believe beauty isn't created, it's revealed. It's the quiet harmony between how you feel and how you choose to show up to the world.",
      "Born from a collective of practicing doctors in aesthetic and wellness medicine, Dolce Estetica embodies a deep respect for innovation and the human journey. Every experience we design is built on research.",
      "Our clinics across Kerala, Karnataka and Tamil Nadu offer physician-supervised skin, hair, body and wellness care — consultation first, evidence-based treatments, transparent pricing.",
    ],
  },
];

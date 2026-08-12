/** Contact details and shared links, kept in one place. */
export const site = {
  name: "Dolce Estetica",
  tagline: "Excellence in Aesthetics",
  phone: "+91 88919 29337",
  phoneHref: "tel:+918891929337",
  email: "skincare@dolceestetica.com",
  clinicEmail: "info@dolceestetica.com",
  whatsappNumber: "918891929337",
  whatsappHref:
    "https://wa.me/918891929337?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20Dolce%20Estetica%20services.",
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Dolce+Estetica",
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },
} as const;

export type NavLink = { label: string; href: string; hasDropdown?: boolean };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Treatments & Services", href: "/booking", hasDropdown: true },
  { label: "Longevity", href: "/longevity" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Event & Media", href: "/event-and-media" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

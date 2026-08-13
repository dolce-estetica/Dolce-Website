export type ClinicLocation = {
  city: string;
  slug: string;
  state: string;
  address: string;
  landmark?: string;
  phone: string;
  altPhones?: string[];
  mapUrl: string;
  mapsLink: string;
  geo: { lat: number; lng: number };
  rating?: { value: number; count: number };
  note?: string;
};

/**
 * REAL clinic locations only — verified against public listings (Google Maps,
 * JustDial, official Facebook/Instagram posts) on 12 Aug 2026.
 * Add new cities ONLY when a clinic actually launches. Adding a row here
 * automatically adds it to the sitemap, the /clinics pages and the schema.
 */
export const locations: ClinicLocation[] = [
  {
    city: "Edapally, Kochi",
    slug: "edapally-kochi",
    state: "Kerala",
    address: "2nd Floor, East, NH 66 Service Road, Edappally, Ernakulam, Kerala 682024",
    landmark: "On the NH-66 service road, north of Edappally Junction",
    phone: "+91 85901 67674",
    altPhones: ["+91 97787 88925"],
    mapUrl: "https://maps.google.com/maps?q=Dolce%20Estetica%20Ernakulam%20Edappally&output=embed",
    mapsLink: "https://www.google.com/maps/place/Dolce+Estetica+Ernakulam/@10.0207491,76.3108261,17z",
    geo: { lat: 10.0207491, lng: 76.3108261 },
  },
  {
    city: "Cherthala",
    slug: "cherthala",
    state: "Kerala",
    address: "Building No. 1240A, CMC 11, CVR Heights, Cherthala, Alappuzha, Kerala 688524",
    landmark: "Near Kodathi Kavala",
    phone: "+91 96331 12711",
    altPhones: ["+91 98477 87200"],
    mapUrl: "https://maps.google.com/maps?q=Dolce%20Estetica%20Cherthala&output=embed",
    mapsLink: "https://www.google.com/maps/place/Dolce+Estetica/@9.6904291,76.3434761,17z",
    geo: { lat: 9.6904291, lng: 76.3434761 },
    rating: { value: 4.6, count: 66 },
  },
  {
    city: "Calicut",
    slug: "calicut",
    state: "Kerala",
    address: "13/720, Wayanad Road, Eranhipalam, Kozhikode, Kerala 673006",
    landmark: "Wayanad Road, near Eranhipalam / Mini Bypass junction",
    phone: "+91 79944 88023",
    mapUrl: "https://maps.google.com/maps?q=Dolce%20Estetica%20Calicut&output=embed",
    mapsLink: "https://www.google.com/maps/place/Dolce+Estetica+Calicut/@11.2798021,75.7861571,17z",
    geo: { lat: 11.2798021, lng: 75.7861571 },
  },
  {
    city: "Mangalore",
    slug: "mangalore",
    state: "Karnataka",
    address: "Vishwageetha Complex, Bondel Road, Padavinangady, Mangaluru, Karnataka 575008",
    landmark: "Padavinangady, on the Airport/Bondel road",
    phone: "+91 79944 88159",
    altPhones: ["+91 88919 29337"],
    mapUrl: "https://maps.google.com/maps?q=Dolce%20Estetica%20Mangalore&output=embed",
    mapsLink: "https://www.google.com/maps/place/Dolce+Estetica+Mangalore/@12.9117828,74.8693136,17z",
    geo: { lat: 12.9117828, lng: 74.8693136 },
    note: "Newly opened — August 2026",
  },
];

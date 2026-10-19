import { locations, type ClinicLocation } from "./locations";

type LandingLocation = Pick<ClinicLocation, "city" | "slug" | "state" | "address" | "mapsLink">;

/** Campaign clinic cards and both booking forms share this list. */
export const landingLocations: LandingLocation[] = [
  ...locations,
  {
    city: "Pala",
    slug: "pala",
    state: "Kerala",
    // Address and exact Maps profile from the client-supplied Google listing:
    // https://share.google/wQnAjLNEtKFxFC8ND (verified 19 October 2026).
    address: "Mukkadan Arcade, 3rd Floor, Above KFC Pala, Lalam Junction, Erattupetta Road, Pala, Kerala 686575",
    mapsLink: "https://www.google.com/maps/place/Dolce+Estetica/data=!4m2!3m1!1s0x0:0x37fcefce836a672b",
  },
];

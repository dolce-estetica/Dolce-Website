/**
 * SERVER-ONLY — clinic → CRM centre UUID map for /api/lead-intake.
 *
 * Values are the `id` column of the active rows in the dolce-crm `centres`
 * table (dolce-crm/apps/web → drizzle schema org.ts), as pulled from the
 * production database. Keep them in sync if a centre is ever re-created.
 *
 * Never import this from a client component: centre ids are internal.
 */
export const CENTRE_IDS: Record<string, string> = {
  "Edapally, Kochi": "21e32ef5-8a4d-40cb-8605-0f9e42ae05c0", // Dolce Edapally (ML001 — Medlounges Express Edappally)
  Cherthala: "44fa87da-021f-4192-ba87-ffeb6ed15f6f", // Dolce Cherthala
  Calicut: "c5bb384f-d045-46ff-b924-67b4593047d0", // Dolce Estetica Calicut
  Mangalore: "cf261530-f443-49fa-af7b-c922b0871985", // Dolce Mangalore
  // "Not sure, help me choose" routes to the head branch (Edapally).
};

export const DEFAULT_CENTRE_KEY = "Edapally, Kochi";

/** Resolves a clinic dropdown value to a CRM centre UUID, or null when the
 *  clinic is unknown or its UUID hasn't been filled in yet. "Not sure, help
 *  me choose" — a real dropdown option — routes to the head branch instead
 *  of being dropped: with the n8n safety net gone this proxy is the only
 *  capture, so an unmapped choice must never lose the lead. */
export function centreIdForClinic(clinic: string | undefined): string | null {
  if (!clinic) return null;
  if (clinic === "Not sure, help me choose") return CENTRE_IDS[DEFAULT_CENTRE_KEY] ?? null;
  const id = CENTRE_IDS[clinic];
  return id && id.length > 0 ? id : null;
}

/** True once every centre slot (incl. the default branch) has a UUID. */
export function centreMapConfigured(): boolean {
  return Object.values(CENTRE_IDS).every((id) => id.length > 0);
}

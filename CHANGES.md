# DOLCE Website — SEO/AEO + Funnel Upgrade (12 Aug 2026)
Applied by the CMO Brain session. Build verified: `next build` → 29 pages, all prerendered.

## FIXED (blocker)
- `lib/data/locations.ts` — REPLACED fake 10-city placeholder data with the 4 REAL clinics
  (Edapally-Kochi, Cherthala, Calicut, Mangalore), addresses/phones verified from public
  listings (Google Maps, JustDial, official FB/IG). Extended type: slug, geo, mapsLink,
  rating, landmark. Adding a future city = one entry here; sitemap/clinic pages/schema update automatically.

## NEW
- `app/sitemap.ts` + `app/robots.ts` — auto-generated from data files.
- `lib/data/treatment-pages.ts` — 8 treatment "money pages" content (compliance-safe:
  no permanent/guaranteed/cure, no drug brand names, ranges + consultation-first).
- `app/treatments/page.tsx` + `app/treatments/[slug]/page.tsx` — conversion template per
  2026 clinic-site research: AEO direct answer first, trust strip, candidacy, how-it-works,
  honest results framing, transparent "starting from" pricing (87% conversion impact in India),
  FAQ accordion with FAQPage schema, MedicalProcedure schema, WhatsApp-first CTAs.
- `app/clinics/page.tsx` + `app/clinics/[slug]/page.tsx` — city pages: real address,
  click-to-call local number, map embed (lazy), directions link, local FAQs,
  MedicalClinic+GeoCoordinates schema (+aggregateRating where reviews exist).

## EDITED
- `app/booking/BookingForm.tsx`, `app/contact/ContactForm.tsx` — every submit now ALSO
  posts the lead to the n8n CRM bridge (fire-and-forget) BEFORE the WhatsApp handoff,
  so no enquiry is lost. NOTE: activate n8n workflow "03 · CMO Brain — CRM Bridge"
  for capture to go live (webhook: /webhook/crm-events).
- `lib/site.ts` — real Facebook/Instagram URLs; nav "Treatments & Services" → /treatments.

## TEAM TODO (not in this patch)
- Claim the unclaimed Google listings (Edapally, Calicut, Mangalore) from franchisehead@dolceestetica.com.
- Add real clinic interior photos to city pages; per-clinic doctor lineups when ready.
- Wire the "Treatments & Services" nav dropdown items to the new /treatments/[slug] pages.
- Confirm Mangalore building name (press says Vishwageetha Complex; older promo said MAK Prime Square).
- Tier-B city×service pages (e.g. /laser-hair-reduction-in-calicut) — next SEO phase.

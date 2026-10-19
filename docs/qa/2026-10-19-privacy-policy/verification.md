# Privacy Policy page — creation & responsiveness verification — 2026-10-19

## Context

`https://dolceestetica.com/privacy-policy` was linked from the site footer but the
route did not exist (live check returned 404). Created `app/privacy-policy/page.tsx`
and added the route to `app/sitemap.ts`.

## Scope of changes

- `app/privacy-policy/page.tsx` — new static page using the site chrome
  (`Navbar variant="solid"`, `Footer`), brand palette and Inter typography.
  Ten numbered sections with an "On this page" contents box: sticky sidebar on
  desktop (≥1024px), collapsible `<details>` accordion on mobile. Policy content
  reflects the site's actual data practices (lead forms → CRM, UTM/gclid/fbclid
  attribution, GTM measurement, short-lived submission-receipt cookie) and
  DPDP Act 2023 rights, with contact cards pulling from `lib/site.ts`.
- `app/sitemap.ts` — `/privacy-policy` added to static routes.

## Local verification (bun run build && bun run start)

- Production build compiled cleanly; `/privacy-policy` emitted as a static
  route (○) and included in the GTM placement check.
- `http://localhost:3000/privacy-policy` returned 200.
- DOM structure: 1× `h1`, 10× `h2` (one per section), 1× contents nav,
  1× footer — no accidental duplication.
- Overflow check via `document.documentElement`:
  - desktop 1440px: `scrollWidth === clientWidth` (1440) — no horizontal overflow
  - mobile 390px: `scrollWidth === clientWidth` (390) — no horizontal overflow

## Screenshots

- `desktop-1440-full.png` — full-page desktop capture: two-column layout,
  sticky contents sidebar left, numbered sections right, footer intact.
  (The full-page capture renders the sticky sidebar multiple times due to
  scroll stitching; the live DOM has exactly one nav.)
- `mobile-390-top.png` — hero + expanded contents accordion.
- `mobile-390-contact.png` — contact cards stack one-per-row, email wraps
  cleanly, footer renders correctly.
- `mobile-390-toc-collapsed.png` — contents accordion collapsed to a single
  row with chevron.

## Notes

- The floating WhatsApp/phone action buttons overlap body text at some scroll
  positions on mobile. That is the site-wide `FloatingActions` component, not
  a privacy-page regression.
- `/terms` is also linked from the footer and still 404s — out of scope for
  this change, flagged for follow-up.

## Security fix bundled into this commit

The Mimosa pre-commit scan flagged a high-severity SSRF in the pre-existing
`app/api/lead-intake/route.ts`: the `CRM_BASE_URL` environment override was
fetched without any host validation. Fixed by adding `lib/crm-url.ts`
(`crmIntakeUrl`), which validates the target before any request is sent:

- http/https protocol only; no embedded credentials
- rejects `localhost`, `*.localhost`, `*.local`, `*.internal`, `*.home.arpa`,
  `*.corp`, `*.lan` hostnames
- IP literals must be global unicast — blocks loopback, RFC1918 private,
  CGNAT, link-local, benchmarking, documentation, multicast and reserved
  ranges for both IPv4 and IPv6

Verification:

- 36-case unit matrix (valid public hosts pass; every private/loopback/
  reserved/local/scheme-abuse case throws) — all green
- runtime smoke test: server started with `CRM_BASE_URL=http://127.0.0.1:9`
  and a dummy API key; POST `/api/lead-intake` returned the safe 503 and the
  server logged `[lead-intake] refusing unsafe CRM base URL` — no outbound
  request was made
- Note: ranges use plain integer math because Node v24's `BlockList.check`
  returns false for every IPv6 address, including exact `addAddress` matches

## Live verification

| Check | Result |
| --- | --- |
| `https://dolceestetica.com/privacy-policy` | 200 (after deploy) |
| Page contains "Privacy Policy" h1 | yes |
| Sitemap includes URL | yes |

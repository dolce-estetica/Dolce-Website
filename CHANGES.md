# DOLCE Website — Agentic Browsing 2/2 (17 Aug 2026)

Lighthouse's Agentic Browsing category is **100% (2 pass / 0 fail) on all 14 routes**. It has
two scored audits — a well-formed accessibility tree, and CLS — and both were failing on most
pages. Both turned out to be real bugs, not scoring quirks. Side effects: the Accessibility
category went **92 -> 96**, and `/booking` CLS went **0.293 -> 0**.

The other four audits in the category (WebMCP form coverage, registered tools, schema
validity, and `llms.txt`) report as *not applicable* and are unscored, so they do not affect
the result. Adding `llms.txt` and WebMCP annotations is still open as a future improvement.

## FIXED — keyboard focus was reaching the closed mobile menu
`components/layout/Navbar.tsx`. The mobile menu panel is only moved off-screen with a
transform, so its **9 links and buttons stayed in the tab order** while the wrapper was
marked `aria-hidden="true"`. Keyboard users could tab into an invisible menu, and
aria-hidden on a subtree containing focusable elements is malformed ARIA — which is exactly
what the agent accessibility-tree audit was reporting on 8 of 10 routes.

Fixed by also setting `inert={!open}`, which removes the subtree from the tab order *and* the
accessibility tree. Verified with a 6-check keyboard test: closed panel is inert and 30
consecutive Tab presses never enter it; opening clears `inert`, the links take focus, and
navigation works.

## FIXED — star rating used ARIA a generic div does not permit
`components/home/TestimonialsSection.tsx`. The rating row was a bare `<div>` carrying
`aria-label="N out of 5 stars"`. Generic elements do not permit `aria-label`, so the rating
was being dropped by assistive tech. Added `role="img"`, which makes the label legal and
collapses the five star glyphs into one labelled image.

## FIXED — /booking shifted layout by ~1000px (CLS 0.293)
`app/booking/page.tsx`, `app/booking/BookingForm.tsx`. `BookingForm` read its `?category=` /
`?service=` presets with `useSearchParams`, which opts the component out of the prerender. So
the page shipped a 128px spinner inside `<Suspense>` and then swapped in the ~1130px form
after hydration, shoving the footer down — CLS 0.293, well into "poor".

The params are now read on the server and passed as props, so the real form is in the initial
HTML and nothing moves. `<Suspense>` is gone; CLS is 0. Trade-off: `/booking` is now
server-rendered per request (`ƒ`) instead of prerendered (`○`), which is the correct mode for
a page that reads query params and costs nothing here — it is a pure render with no I/O.

## NOTED — the hero search's `?q=` is ignored
The hero search box routes to `/booking?q=<text>`, but `BookingForm` only ever reads
`category` and `service`, so whatever the visitor typed is silently dropped. Pre-existing and
left alone as out of scope, but it is a live funnel gap worth closing — the typed concern is
the single most useful thing a visitor tells you.

---

# DOLCE Website — Analytics, Icons + Perf Round 2 (17 Aug 2026)

Mobile **94-95**, desktop **100** — with GA4 installed. FCP 0.9s, TBT 60-70ms, CLS 0,
Speed Index 0.9s. The one metric not in the top band is Lighthouse's *simulated* LCP (3.0s);
see "Why mobile is not 100" below, because it is not what it looks like.

## NEW — Google Analytics 4
- `components/analytics/GoogleAnalytics.tsx`, mounted from `app/layout.tsx`. Measurement ID
  lives in `lib/site.ts` as `gaMeasurementId` alongside the other site-wide settings; set it
  to `""` to switch analytics off entirely.
- Loaded through `next/script` with `strategy="afterInteractive"` rather than raw `<script>`
  tags, so the tag never blocks the first paint or delays hydration.
- Gated to production builds, so `next dev` traffic stays out of the property. `next start`
  is NODE_ENV=production, so a local production run *does* include it — which is what you
  want when measuring the tag's real cost.
- GA4 enhanced measurement picks up App Router client-side navigations from History API
  changes, so no extra route-change listener is needed.
- **It costs about 2 points.** gtag.js is ~90KB, ~26KB of it ever used, and it adds
  60-90ms of TBT on mobile. Without it this page scores 96-97. `lazyOnload` was measured as
  an alternative and came out no better (94, TBT 160ms) while losing fast bounces from the
  data, so `afterInteractive` is the better trade.

## NEW — icons from the brand mark
- `scripts/make-favicon.mjs` builds `app/favicon.ico` (16/32/48), `app/icon.png` (256) and
  `app/apple-icon.png` (180) from `assets/logo.webp`. Run `bun scripts/make-favicon.mjs`
  after any logo change.
- Two details it handles: the logo is a 400x148 lockup whose wordmark is illegible at 32px,
  so it detects where the emblem ends by walking the alpha channel and uses only the emblem
  (a fixed crop clipped a sliver of the "D" in as two stray specks); and the emblem is cream
  on transparent, which vanishes against a light tab strip, so it is composited onto the
  brand green. Small tiles give up their padding to keep detail.
- The old `favicon.ico` was a 26KB leftover; the new one is 5.5KB.
- Deleted `public/apple-icon.png` — it collided with the new `app/apple-icon.png` on the same
  URL — along with the unused CRA/Next scaffold SVGs (`next`, `vercel`, `globe`, `window`,
  `file`).

## EDITED — the home page is now server-rendered with client islands
Hydration was the largest remaining main-thread cost, so the two big home-page components
were split into server markup plus minimal client islands. Same markup, same behaviour, far
less to hydrate — TBT went from 140-160ms to 60-70ms.
- `TreatmentsSection` is now a server component. `DragScroller` (pointer-drag scrolling) and
  `ServicesDisclosure` (the "See all Services" toggle) are the only client parts, and both
  take their content as children — so the fifteen cards and the whole service catalogue are
  rendered once on the server and never shipped to the browser as data.
- `HeroSection` is now a server component too. `HeroBackdrop` (idle-mounted video + rotating
  stills) and `HeroSearch` (the concern box) are the client islands. The poster deliberately
  moved *out* of any client component and is now plain server markup: it is the largest thing
  painted on first load, so it is on screen before any JavaScript runs. Slide 0 is simply
  "nothing covering the poster", which is visually identical to the old crossfade.
- Verified with a 9-check interaction test (poster/cards present in server HTML, catalogue
  absent until toggled, video and stills mount, both disclosures open, carousel scrolls,
  search routes to `/booking?q=`), plus before/after screenshots at 1440px and 412px.

## TRIED AND REJECTED (all measured, none kept)
Recorded so nobody spends the time again:
- `content-visibility: auto` on the below-fold sections — **zero** measurable change on every
  metric (the page is only ~575 nodes, so off-screen style/layout was never the bottleneck),
  and it broke click targeting on off-screen elements because their geometry is not resolved
  until first render. Note left in `globals.css`.
- `display: "optional"` on Inter — no LCP change (2.8s vs 2.9s), so the webfont is not what
  LCP is waiting for. Not worth the fallback-font flash on first visit.
- Removing the hero gradient overlay — no change; it is not what stops the poster being the
  LCP element.
- A non-empty `alt` on the poster — no change either.

## WHY MOBILE IS NOT 100
Everything except LCP is effectively maxed: FCP 0.9s, TBT 60-70ms, CLS 0, SI 0.9s. The gap
is entirely Lighthouse's simulated LCP of 3.0s, and it is worth understanding before anyone
spends more time on it:
- Chrome's **observed** LCP on this page fires at first paint — LCP and FCP are the same
  event in the trace. The largest content is on screen as soon as anything is.
- The 3.0s is Lantern, Lighthouse's simulator, re-timing that paint against a Slow-4G +
  4x-CPU model with a more pessimistic dependency graph than it uses for FCP. Field data
  (CrUX) measures the real event, so it should look much better than 3.0s.
- Chrome never treats the full-bleed hero poster as an LCP candidate, so LCP lands on a small
  text span instead. The poster arrives at ~1.0s, so if it *were* the candidate the score
  would be ~100. Alt text, the overlay, fonts and the client/server split were all ruled out
  as the cause; it is most likely Chrome's own decorative-background heuristic.
- The same ~2.4-2.9s LCP shows up on near-pure-server routes like `/longevity`, which confirms
  it is not caused by anything specific to the home page.

Closing it would mean dropping GA (worth ~2 points) and getting Chrome to accept the hero
image as the LCP element — the latter is not under our control. Not recommended.

---

# DOLCE Website — Load Performance Pass (17 Aug 2026)
Lighthouse (home page, `next start`, Lighthouse mobile/desktop presets):

| | mobile | desktop |
|---|---|---|
| Performance | 65 → **96** | 73 → **100** |
| Largest Contentful Paint | 51.8s → **2.8s** | 8.3s → **0.7s** |
| Total Blocking Time | 390ms → **20ms** | 140ms → **0ms** |
| Speed Index | 2.6s → **0.9s** | 0.4s → **0.4s** |
| Page weight | 20,197KB → **449KB** | 20,181KB → **1,558KB** |

Accessibility 92, Best Practices 100, SEO 100 — unchanged. CLS was and remains 0.

## WHY IT WAS SLOW
The home page pulled ~20MB before it was usable, nearly all of it artwork shipped at
export resolution and served raw:
- `bgs/bg-video.mp4` — 8.0MB for a 10s 720p loop (6.4 Mbps, ~5x what 720p needs), set to
  `autoPlay` so it competed with the first paint.
- `bgs/bg-frame-1.png` / `bg-frame-2.png` — **8000x4500** PNGs (3.4MB + 2.0MB) in plain
  `<img>` tags. Bytes were only half of it: decoding a 36-megapixel PNG stalls a phone's
  main thread and costs ~144MB of RAM each.
- `treatments/*.png` — 1080x1080 PNGs of ~1.2MB each in plain `<img>` tags, for cards that
  never render wider than 340px. 15 tags, 5 unique files, ~6.5MB.
- Nothing in `public/` had a `Cache-Control` header, so every repeat visit re-downloaded
  all of it.

Measured on a throttled Slow-4G phone profile, `bg-frame-1.png` finished downloading
**72 seconds** after navigation. It is now 0.7s.

## NEW
- `scripts/optimize-images.mjs` — re-encodes everything in `public/` to WebP at a size
  matched to how it is actually displayed. Run it after adding artwork:
  `bun scripts/optimize-images.mjs --write` (add `--replace` to drop the originals).
  Caps are all >= 2x the largest size the layout asks for and quality is WebP q90
  (lossless for the logo), so it is a visually lossless pass — 41.3MB → 4.3MB (89%).
  Verified by rendering before/after crops at 1:1; a skip-guard leaves any file alone
  where WebP would come out larger (`gallery/aesthetic-art.jpg`).
- `public/bgs/hero-loop.webm` (1.17MB VP9) + `hero-loop.mp4` (1.59MB H.264) — the hero
  loop re-encoded from 8.0MB. SSIM 0.98-0.99 vs the original, i.e. visually identical.
  Regenerate with:
  `ffmpeg -i in.mp4 -c:v libx264 -profile:v high -crf 23 -preset slow -pix_fmt yuv420p -g 48 -an -movflags +faststart hero-loop.mp4`
  `ffmpeg -i in.mp4 -c:v libvpx-vp9 -crf 28 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -an hero-loop.webm`
- `public/bgs/hero-poster.webp` — frame 0 of the loop, so the still and the video are the
  same picture and there is no jump when the clip fades in.

## EDITED
- `components/home/HeroSection.tsx` — the poster is now the only hero asset on the critical
  path (~25KB AVIF, `priority`). The video and the two rotating stills mount on
  `requestIdleCallback` instead of at page load, so they no longer compete with the first
  paint; the carousel's first turn is at 7s, so nothing is ever late. The loop is skipped
  entirely for `prefers-reduced-motion`, for data-saver/2G-3G connections, and **below
  768px** — it is 16:9, so covering a portrait phone crops most of it away and upscales the
  rest ~2x, making the phone the device where it looks worst and costs most (~1.1MB of
  mobile data). Phones see the poster, which is the same composition.
- `components/home/TreatmentsSection.tsx` — carousel cards moved to `next/image`.
- `next.config.ts` — AVIF-then-WebP for the image optimiser, and a 30-day
  `Cache-Control` (plus `stale-while-revalidate`) for `public/` artwork folders.
- `app/layout.tsx` — Inter and Playfair are variable fonts, but pinning explicit weights
  made `next/font` fetch a static file per weight: 4 for Inter, 8 for Playfair. Now 1 + 2.
  Playfair is also `preload: false` — nothing above the fold uses it, so it was putting
  ~86KB of serif ahead of the first paint.
- `Navbar.tsx`, `Footer.tsx` — logo `width`/`height` corrected to the real 400x148 (was
  declared 360x180 / 280x140 / 200x100, which reserved the wrong box before load).
- All artwork references switched to the `.webp` masters (`lib/data/{team,treatments,blog}.ts`,
  `app/{about,career,event-and-media}`, `Navbar`, `Footer`).

### A note on `sizes`
The hero backgrounds are full-bleed `object-cover`, so in a **portrait** viewport it is the
viewport *height* that decides how many pixels are needed — the 16:9 art is cropped to a
tall sliver and scaled up. `sizes="100vw"` therefore under-asks badly: a phone got a 750px
file stretched ~4x, which was visibly soft. They now use
`sizes="(max-width: 768px) 250vw, 120vw"`. These smooth backgrounds are only ~20-25KB as
AVIF even at 2048px, so full sharpness is effectively free. Keep this in mind for any new
full-bleed background.

## TOOLING — package manager is now bun
- `bun.lock` replaces `package-lock.json` (migrated, not regenerated, so resolved versions
  are unchanged). Use `bun install` / `bun run <script>` from here on; mixing in `npm`
  will desync the lockfile.
- `railway.json` — `bun install --frozen-lockfile && bun run build`, then `bun run start`.
  Nixpacks provides bun automatically once `bun.lock` is present.
- Verified end-to-end on bun 1.3.14: install, `bun run build` (29 pages), `bun run lint`,
  `bun run start`, and `bun scripts/optimize-images.mjs`. The one to watch was `sharp` — it
  is a native module and `next/image` is useless without it. It resolves the
  `@img/sharp-win32-x64` binary correctly under bun and the optimiser still returns AVIF,
  byte-identical to the npm install. Lighthouse re-run on the bun build: mobile 95 (vs 96),
  same 449KB — run-to-run noise, no regression.

## TEAM TODO
- The pre-WebP originals are still in `public/` (~45MB) and are no longer referenced by any
  code, so they are not served and cost visitors nothing — they only pad the repo and the
  deploy. Delete them when you are happy with the WebP versions
  (`bun scripts/optimize-images.mjs --write --replace` does it, or delete the `.png`/`.jpeg`
  files that now have a `.webp` sibling). Git history keeps them either way (commit 018e820).
  `public/bgs/bg-video.mp4` (8.0MB) is likewise superseded by `hero-loop.*`.
- 18 of the 24 files in `public/treatments/` are not referenced anywhere — presumably
  waiting on the money-pages. They are optimised and ready when you wire them up.
- Optional: `public/treatments/*` masters are square, so the treatment money-pages can use
  them via `next/image` without any further work.

---

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

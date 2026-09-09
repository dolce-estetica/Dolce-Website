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

---

# LP Rebuild — One Unique Design Per Page (5 Sep 2026)

The 7 Google-Ads landing pages (from `Dolce Ads Landing Page Structure.xlsx`) previously
shared a single section-template. Each now renders through its own design component —
same data layer, same capture behaviour, different visual identity. Bodycraft patterns
(sticky Book Now, real-photo service cards, review cards with stars, dual CTA) kept
throughout; all 9 Excel sections + anchors (`#book #why #services #doctors #results
#testimonials #faq`) present on every page.

## Architecture
- `app/lp/[slug]/page.tsx` — now a dispatcher: `DESIGNS` map (slug → design component),
  still SSG via `generateStaticParams`, metadata/canonical, FAQPage + MedicalProcedure
  (SurgicalProcedure for medlounges) JSON-LD.
- `components/landing/kit.tsx` — NEW shared primitives: `LP_DOCTORS` (Dr Joseph Thomas,
  Dr Amrutha Suresan, real /team portraits), `Stars`, `rotatedReviews(slug)` (different
  Google review rotation per page), `ReviewCard` (light/dark/editorial variants),
  `LeadAside`, `LP_DISCLAIMER`.
- `components/landing/LandingStickyCta.tsx` — variant system: `green | dark | bronze | slate`.
- `components/landing/LandingLeadForm.tsx` — slimmed to just the form card (props:
  `page`, `submitLabel`); CRM webhook + WhatsApp handoff logic unchanged.
- `app/lp/layout.tsx` — added Lora (`--font-lora`) for editorial accents;
  `globals.css` gained `--font-editorial` token (`font-editorial` utility).

## The 7 designs (`components/landing/designs/`)
| Slug | Concept |
|---|---|
| dermatology-clinic | "The Consultation" — light editorial green, split hero + floating Google badge, numbered 01–04 rows, horizontal 3-step |
| hair-treatment | "Root Cause" — cream/bronze, arched photo, cause chips, VERTICAL diagnostic timeline (sticky header on lg) |
| laser-hair-removal | "The Studio" — dark #0B140D, full-bleed hero + glass booking card, 6 area tiles, dark form section |
| skin-treatments | "The Journal" — #FAF6EC magazine, Lora italic in H1, tilted photo + offset frame, services as table-of-contents w/ hover thumbs, roman-numeral chapters, drop caps |
| hydrafacial | "The Ritual" — centered hero + 21:9 banner, ritual steps FIRST section, snap-scroll review rail |
| glutathione-treatment | "The Lounge" — deep green + gold, photo in tall gold-rimmed frame, drip timeline, dark form |
| vaser-liposuction (MedLounges) | "The Surgical Suite" — slate/teal sampled from theatre photos, glass "This is surgery" card, UNIQUE candidacy band (✓ good / ✗ not-yet), Before/The day/Afterwards + recovery strip |

## Removed
- `LandingHero`, `LandingImpact`, `LandingWhy`, `LandingServices`, `LandingProcess`,
  `LandingDoctors`, `LandingResults`, `LandingTestimonials`, `LandingFaq`,
  `LandingCtaBand`, `LandingSection` (old shared sections; recoverable from git history).

## Verified
- `bun run lint` clean for all new/edited files (2 pre-existing errors elsewhere, untouched:
  `components/layout/Navbar.tsx` set-state-in-effect, `app/clinics/[slug]/page.tsx` apostrophe).
- `bun run build` passes — all 7 /lp routes prerendered.
- DOM checks on all 7: `id=book`, lp-concern/lp-clinic selects, sticky CTA, FAQPage schema,
  all section anchors.
- Desktop + 390px mobile visual review (Playwright captures) — no overflow/cut-offs,
  sticky bars intact, grids collapse to single column.
- Compliance kept: no prices, no banned claims, honest "results shown at consultation"
  panels everywhere (no consented before/after pairs yet — see docs/06 section D).

## Notes
- Google Ads for hair should point at `/lp/hair-treatment` (data layer already routes
  organic to /hair-fall-consultation).
- Nothing committed — working tree only, per instruction.

---

# LP Round 2 — Sticky-bar inline booking + friendlier heroes (5 Sep 2026)

Bodycraft-inspired pass per client feedback (paths stay /lp/<slug>; theme colours kept).

## Sticky booking bar — `components/landing/LandingStickyCta.tsx` (rewritten, now a client component)
- Book Now no longer scrolls to #book: it expands the bar itself into a quick
  Name + Phone form (Bodycraft's inline-booking pattern). Mobile: two inputs
  side-by-side + full-width "Get a Call Back"; desktop: headline + inputs + submit
  in one row.
- Submit validates (name, 10-digit Indian mobile), posts to the same n8n CRM
  bridge with source `lp-<slug>-sticky-bar`, then shows a "We'll call you within
  2 hours" success state with a WhatsApp-us button.
- Close (×) button on every state; dismisses the bar for the session
  (sessionStorage, keyed per slug — read via useSyncExternalStore so SSR/hydration
  stay clean). Tap target 40px; fine print has its own higher-contrast token.
- Variants unchanged (green/dark/bronze/slate) so each page keeps its identity;
  all 7 designs now pass `slug` to the bar.

## Hero image swaps (friendlier, real photos — `lib/data/landing-pages.ts`)
- dermatology-clinic → /gallery/clinic-excellence.jpg (doctor gently treating a
  relaxed patient — warm, medical, friendly)
- hydrafacial → /gallery/aesthetic-art.jpg (smiling radiant woman; hero frame
  resized 21:9 → 5:4/3:2 with face-biased crop so the portrait isn't sliced)
- glutathione-treatment → /assets/about.webp (luminous veil portrait — the brand's
  own photo; sits well in the gold-rimmed tall frame)
Alts updated to match. Old /lp/*.jpg heroes remain in public/ untouched.

## Verified
- Real-Chrome interaction test (webhook stubbed so no test lead hit the CRM):
  expand → fill → submit → done → dismiss all pass on mobile 390px and desktop
  1280px, zero console/page errors.
- Visual checks: bar states (mobile+desktop) and all three new heroes (desktop+mobile)
  pass — faces well-framed, no overflow, warm/friendly mood confirmed.
- Build exit 0; all 7 /lp routes 200 on the preview server (:3111).
- Nothing committed — working tree only.

---

# LP Round 3 — Bodycraft-copy redesign (glutathione + vaser) + bar-reload fix (7 Sep 2026)

## Sticky bar: dismissal is memory-only
Client asked that the bar RETURN on reload after closing it. Removed the
sessionStorage persistence entirely — × now hides the bar via plain state only,
so every fresh page load shows it again (also simpler: no useSyncExternalStore).

## glutathione-treatment + vaser-liposuction: exact structural copy of Bodycraft
Client: "we are trying to do a exact copy of the reference with our own colors
and content and images" (reference: bodycraftclinics.com). Both pages now share
`components/landing/designs/BodycraftDesign.tsx` — one template, two themes:

- gold → glutathione-treatment (cream/bronze, keeps its lounge palette)
- teal → vaser-liposuction (sage/slate/teal, keeps the MedLounges surgical feel)

Section order copied from the reference site:
tinted hero (star eyebrow · big serif headline · CITY LINKS row · pill CTAs ·
ARCH-shaped photo · ROTATING CIRCULAR badge · floating rating chip) →
4-stat band → service photo cards ("customers keep comin' back") →
deals-style horizontal reel (compliance-safe, no prices) →
"Why You'll Adore" 4-icon row → "The Process" Step 01/02/03 →
"Real People Real Results" → "Hear it from our customers" review grid →
doctors → FAQ → booking band (headline + lead form) → sticky bar.
All nine Excel sections + anchors kept. Serif headings via the brand Playfair.

Superseded: GlutathioneDesign.tsx, VaserDesign.tsx deleted (git history);
dispatcher maps both slugs to BodycraftDesign.

## Verified
- Build exit 0, all 7 routes 200; anchors book/why/services/doctors/results/
  testimonials/faq present on both pages; zero console/page errors.
- Real-Chrome behavior test: bar closes → RELOAD BRINGS IT BACK ✓; no
  horizontal overflow at 390px.
- Visual passes: desktop heroes (arch + badge + city links), full-page section
  flow both pages, mobile full-page strips; badge repositioned after review to
  sit fully inside small viewports.
- Nothing committed — working tree only.

---

# LP Round 4 — Mobile tap reliability for the sticky bar (7 Sep 2026)

Client reported Book Now + close buttons dead on mobile. Chromium (even with
touch emulation, 320/375/390px, all 7 pages, top/bottom scroll) could not
reproduce — hit-target probes always resolve to the button itself, and
taps work. That points at real-device WebKit/phone issues, so the bar was
hardened against all known ones:

- REMOVED backdrop-blur from the bar and made every variant background fully
  opaque — translucent + backdrop-filter fixed elements have a documented iOS
  Safari bug where touch hit-testing stops working (taps pass through).
- Fixed wrapper now forces its own compositing layer (transform-gpu /
  translateZ(0)) — the standard iOS fix for fixed-position hit areas.
- All bar buttons got touch-manipulation (no 300ms tap delay / double-tap-zoom
  interference on older iOS).
- Verified the Navbar's full-screen mobile-menu overlay is NOT a blocker
  (pointer-events-none + inert when closed).
- Re-verified after rebuild: full tap flow (expand → fill → submit → done →
  close) passes on ALL 7 pages in mobile touch emulation; zero console errors;
  bar visually unchanged (opaque looks identical at /95).

NOTE for client testing: the bar's JS changed several times today — if a phone
still shows dead buttons, hard-refresh / clear cache once (stale cached chunk).

---

# LP Round 5 — All seven pages on the Bodycraft structure (7 Sep 2026)

Client: laser-hair-removal must lose its dark theme, and the remaining five
Dolce pages should closely follow the reference site structure too. ALL /lp
pages now render through BodycraftDesign with per-page light themes:

  dermatology-clinic  sage    moss on soft green
  hair-treatment      amber   warm bronze/cream
  laser-hair-removal  mint    LIGHT — dark studio retired
  skin-treatments     ivory   sand/bronze
  hydrafacial         aqua    pale sea-green (ritual image kept in Process)
  glutathione-treatment gold  (unchanged from round 3)
  vaser-liposuction   teal    (unchanged from round 3)

Each theme carries its own accent palette, hero tint, service-card photos or
icons, deals-reel content ("How a real consultation runs", "Root cause, not
random sessions", "Laser done the medical way", "Skin care in the right
order", "The ritual, done properly"), why-icons and form copy — same Bodycraft
section skeleton, same nine Excel sections and anchors everywhere.

Deleted the five superseded designs (Dermatology/Hair/Laser/Skin/Hydrafacial
— git history). The sticky-bar "dark" variant is now unused but kept in the
component for completeness.

## Verified
- Build exit 0; all 7 routes 200; anchors 7/7 on all five new pages; zero
  console/page errors.
- Mobile (390px, touch) tap flow expand→fill→submit→done passes on all five.
- Vision checks: laser hero confirmed LIGHT mint; derm hero clean; hair
  full-page section order complete; laser mobile full-page clean, no overflow.
- Nothing committed — working tree only.

---

# LP Round 6 — Bodycraft-exact mobile booking sheet + keyboard handling (7 Sep 2026)

The sticky bar's Book Now now opens a booking SHEET copied 1:1 from the
reference site's phone layout (client's WhatsApp screenshots): coloured sheet
with rounded top, centred white 2-line headline ("… today / we'll call you
back within 2 hours"), stacked white Name / Email / Mobile * inputs (16px —
no iOS zoom), centred black uppercase SUBMIT, small × top-right; on desktop
the same sheet becomes a centred card (max-w-md, rounded-3xl). Done state
(✓ thank-you + phone number + black WHATSAPP US + DONE) lives in the sheet.

Phone-first additions beyond the previous bar:
- Slide-down-in / slide-up-out animations on BOTH the slim bar and the sheet
  (lp-slide keyframes in globals.css; respects prefers-reduced-motion).
- KEYBOARD LIFT: visualViewport resize/scroll listener translates the whole
  bar wrapper up by exactly the keyboard height while an input is focused —
  the SUBMIT button is visible the instant typing starts, no manual scroll.
- One-time gentle scroll-assist (180px) on first field focus so context stays
  behind the raised sheet.
- Email captured too (optional, format-validated) → same n8n CRM payload.

Verified (mobile touch emulation, 390px): slide-in on load, sheet opens with
3 inputs + SUBMIT, scroll assist fires on focus (0→180px), all validation
paths (name / phone / email) then success, sheet close returns the bar,
bar dismiss works; zero console errors. Vision checks pass on the sheet and
done states. Nothing committed.

---

# LP Round 7 — Sheet slides OVER the bar + blurry-text fix (7 Sep 2026)

Reference behaviour, per client: the booking form is a SECOND layer that
slides on top of the always-present sticky bar — not a replacement for it.

- The slim bar is now always mounted; the booking sheet renders in an
  absolute bottom-anchored layer (z above the bar) and slides down OVER it,
  full-bleed on mobile (flush edges/bottom so the bar is fully covered),
  floating rounded card on desktop. Closing slides the sheet up, revealing
  the bar instantly.
- BLURRY TEXT ROOT CAUSE FIXED: the fixed wrapper carried a permanent
  transform-gpu + will-change:transform compositing layer, so phones
  rasterised the bar/sheet text as a GPU texture at a stale scale. The
  wrapper now has NO permanent transform (verified in-page: transform:none,
  will-change:auto); it only gains a transform transiently while the
  keyboard is open (the visualViewport lift).
- Verified (touch emulation 390px): bar mounts, sheet slides over and fully
  covers it, submit→done→Done reveals bar, bar × dismisses, reload restores,
  zero console errors; vision check confirms full coverage and sharp text.
  Nothing committed.

---

# LP Round 8 — Bar text: "Book a free doctor consult" (7 Sep 2026)

All 7 pages' sticky bar now shows exactly the reference site's line —
"Book a free doctor consult" — replacing the per-page
"Book your <topic>" + "Doctor-led · 4 clinics · …" note (variant `note`
config removed). The per-page label still drives the booking-sheet headline
("<page label> today"), the CRM service tag and the WhatsApp message.
Verified on all 7 routes. Nothing committed.

---

# LP Round 9 — Desktop gets the phone sheet UX too (7 Sep 2026)

The booking sheet no longer renders as a small floating card ("popup") on
desktop: it is now the SAME full-width bottom sheet as on phones — spans the
viewport edge to edge, flush to the bottom, rounded top corners, sliding down
OVER the always-present slim bar, with the form content centred inside a
max-w-xl column so wide screens stay readable. Verified at 1280px (full
width, flush bottom, covers bar, content centred) and 390px (unchanged).
Nothing committed.

---

# LP Round 10 — Top-level paths + real Plus Jakarta Sans (7 Sep 2026)

Client decisions (in-chat confirmation): move ALL 7 landing pages from
/lp/<slug> to top-level /<slug>, and set headings to Plus Jakarta Sans per
the git-issue checklist.

## Paths
- New route: app/(lp)/[slug]/page.tsx (route group keeps its own font layout;
  dynamicParams=false so unknown slugs 404 statically). app/lp/ deleted.
- next.config.ts: 7 permanent redirects /lp/<slug> → /<slug> (Next emits 308,
  treated like 301 by Google).
- Canonicals now https://dolceestetica.com/<slug>.
- FloatingActions hides on the 7 landing paths (was /lp prefix check).
- CRM source tags unchanged: lp-<slug> (form) and lp-<slug>-sticky-bar (sheet).
- HAIR ADS NOTE stands: Google Ads for hair point at /hair-fall-consultation
  (PRP policy); /hair-treatment serves organic/social.

## Typography — and a real bug found
- Headings/stat numerals switched font-serif (Playfair) → font-display
  (Plus Jakarta Sans extrabold) in BodycraftDesign.
- BUG: font-display/font-editorial/font-serif never actually rendered their
  fonts — Tailwind v4 emits @theme tokens on :root, where next/font's
  --font-jakarta/--font-lora/--font-playfair don't exist, so the var() chains
  silently fell back to the system stack (Georgia serif before, system sans
  for Jakarta). Fixed with direct-var utility overrides in globals.css.
  Verified in-browser: h1 computes to "Plus Jakarta Sans", weight 800,
  document.fonts.check passes.
- Also benefits the main site's Playfair serif headings (same fix).

## Checklist verified
- Shared template ✓ (all 7 via BodycraftDesign)
- Lead form Name/Email/Phone/concern/clinic → n8n CRM (lp-<slug>) → WhatsApp ✓
- Real photography ✓ (existing real-photo site assets; repo has no Pixabay
  provenance docs — unconfirmed, flagged to client)
- No prices / no outcome guarantees ✓ (re-checked)
- Before/after: honest "shared at consultation" panels (results.pairs=[])

Two MORE pre-existing lint errors surfaced this round in files never touched
here (app/event-and-media/page.tsx <a href="/contact/">,
components/home/HeroSearch.tsx <a href="/booking/">) — left as-is, flagged.

Verified: 7×200 top-level, 7×308 redirects, unknown slug 404, Jakarta
rendering (computed style + font check + vision), sticky bar + #book intact.
Nothing committed — working tree only.

---

# LP Round 11 — GitHub-issue campaign template: ditto Bodycraft LP style (7 Sep 2026)

Client issue: make the 7 pages LOOK like
bodycraftclinics.com/laser-hair-reduction/ — structure + styling copied,
palette NOT (no pink/charcoal/coral; no dark themes). Confirmed in chat:
bronze accent (their coral), brand-green bands (their charcoal), floating
header, sticky bottom bar untouched.

BodycraftDesign.tsx rewritten as ONE campaign template (per-page differences
reduced to PAGE_EXTRAS: kicker line, service photos/icons, process image,
form copy, sticky variant/label). Section order per spec: scrim hero
(full-bleed photo, ~65% green-tinted scrim, floating header logo+bronze pill,
centered kicker → extrabold Jakarta heading → white/80 subtext → bronze +
white-outline pill CTAs → 3 translucent trust chips) → impact band (green,
sand numerals) → WHY cards (white rounded-3xl on cream, bronze-ring icon
badge, centered) → services cards → THE PROCESS (STEP 01/02/03 bronze) →
FAQ (cream rows, bronze chevron) → BEFORE/AFTER "Real people, real results"
(green band, honest panel) → REVIEWS (Google score + stars) → final CTA
band (green, bronze button) → lead form → LOCATIONS (4 real clinics, address
+ directions + phone — new section) → doctors → disclaimer.

Route: Navbar removed from these pages (floating header inside the hero
replaces it); dispatcher is now a single mapping to BodycraftDesign.

Compliance kept: no prices, no superlatives, no Bodycraft assets, honest
before/after panel. Verified: 7×200, anchors 8/8 (incl. #locations) on all
pages, sticky bar text + sheet untouched (3 inputs) on all 7, zero JS
errors, vision checks pass on hero / full-page order / mobile. Nothing
committed.

---

# LP Round 12 — Rename BodycraftDesign → LandingTemplate (7 Sep 2026)

Professional codebase naming: components/landing/designs/BodycraftDesign.tsx
is now LandingTemplate.tsx (component LandingTemplate), import updated in the
route. No behaviour change; build verified. Reference-site provenance stays
documented in the file header. Nothing committed.

---

# LP Round 13 — VASER "Areas we contour" photos replace Scissors icons (7 Sep 2026)

Six real photos (Pixabay Content License: free commercial use, no attribution
required) downloaded from cdn.pixabay.com, resized to 960w WebP-quality JPEG
(50–170KB each) into public/lp/:

  vaser-abdomen.jpg  belly-2354       (measuring tape — contour metaphor)
  vaser-waist.jpg    belly-2473       (old jeans too big)
  vaser-arms.jpg     sport-1685812    (studio, arm raised)
  vaser-thighs.jpg   stretching-498256 (leg stretch)
  vaser-back.jpg     woman-567021     (back/shoulder therapy — clinical)
  vaser-multi.jpg    yoga-7437515     (full body, activewear)

Wired via PAGE_EXTRAS["vaser-liposuction"].serviceImages in LandingTemplate
(same photo-card path the other pages use); per-card icon fallback retained
for any future page without images. Verified: build exit 0, all six served,
no broken images, vision check on the section passes (tasteful, relevant).
Nothing committed.

---

# LP Round 14 — LHR "Areas we treat" photos replace Zap icons (7 Sep 2026)

Same treatment as the VASER round: six real photos (Pixabay Content License)
replace the repeated Zap icon on /laser-hair-removal:

  lhr-face.jpg       beauty-354565     (soft female face — warm, tasteful)
  lhr-underarms.jpg  sport-1685812     (arm raised, clean studio shot)
  lhr-arms-legs-2.jpg stretching-498256 (stretch pose — arms + legs in frame)
  lhr-bikini.jpg     girl-358768       (tasteful B&W torso)
  lhr-full-body.jpg  girl-677576       (bright full-body, sky)
  lhr-touchups.jpg   woman-586185      (bright self-care ritual)

Dedup swap: vaser-arms.jpg re-pointed to training-828726 (dumbbell rack) so
sport-1685812 could move to LHR underarms without cross-page duplication
(vaser provenance comment updated). Note: Pixabay search rate-limited this
session — candidates came from earlier successful fetches; the Face card is
the weakest match (dark artistic portrait) and Touch-ups reads as generic
self-care; revisit when the client's own photos arrive or the block lifts.
Filename "-2" suffix busts Next's image-optimizer cache after an in-place
content swap. Verified: build exit 0, zero broken images (full-scroll check),
no mobile overflow, vision check passes. Nothing committed.

---

# LP Round 15 — Client fix list: header/bar behavior, copy de-AI pass, derm page (7 Sep 2026)

Client fix list, applied exactly as scoped (items marked "all 7" vs derm-only):

## All 7 pages
- Sticky header on PCs ONLY: new solid brand-green sticky header (logo + bronze
  Book Now) on lg+; on phones the header stays absolute over the hero and
  scrolls away. Bottom booking bar + sheet now hidden on lg (lg:hidden) —
  phones keep the bottom bar. Desktop main padding adjusted (lg:pb-0).
- Hero call-number button removed (single bronze CTA remains).
- Double headers removed: every section's uppercase kicker line deleted;
  one friendly title per section. Doctors section retitled
  "Meet your doctors" (was "The people behind your plan").
- "Hear it from our customers" → "Hear it from our patients" (+ data copy).
- Em-dash purge: all 138 "—" removed from the pages' copy (data file +
  template + bar/sheet + form fine print), replaced with natural sentence/
  comma rewrites; awkward comma splices hand-fixed. Verified 0 visible
  em-dashes on all 7 rendered pages (schema excluded).

## /dermatology-clinic only
- Section swap per request: doctors ("Meet your doctors") now sit where FAQ
  was (after the process); FAQ moves to the very bottom (after locations).
  Template supports this via PAGE_EXTRAS.doctorsEarly.
- "What our dermatologists treat" cards now use REAL South Indian imagery
  (site's own): Skin = dermatologist treating a patient (clinic photo),
  Face = brand glow portrait, Hair & Scalp = shirodhara scalp photo; Body
  keeps its icon (no suitable real body photo yet). 4-item service rows
  (derm, hair) now render 4-across on desktop.

Verified: build exit 0, all 7 routes 200, desktop sticky header + no bottom
bar, mobile bar + scrolling header, derm order doctors→results→…→FAQ,
zero console errors, desktop + mobile screenshots checked. Nothing committed.

---

# LP Round 16 — Dermatology fix list (7 Sep 2026)

All scoped to /dermatology-clinic unless noted.

1. HERO TRIM: subheading shortened (was repeating the chips/kicker);
   trust chips replaced with distinct facts (4 clinics in South India /
   4.6★ Google-rated care / Consultation before treatment) instead of
   re-stating "qualified dermatologists / medically supervised".
2. LIGHT STRIP FIX: a 12px white band showed between the process section
   and "Meet your doctors". Root cause: a whitespace text node between
   sibling sections generated a line box exposing main's white background,
   invisible at every other boundary but glaring cream-on-cream. Fixed by
   making the route's <main> a flex column (whitespace generates no flex
   items) — gap now 0px, protects all section boundaries.
3. Useless final CTA band (redundant with the form directly below) replaced
   on derm with a concern-picker band ("What would you like help with
   today?" + chips from page.concerns, all anchoring to #book). Other six
   pages keep the CTA band (PAGE_EXTRAS.concernsCta).
4. "Our clinics in Kerala" → "Our clinics across South India" (template-wide,
   factual — Mangalore is in Karnataka).
5. Location cards now mirror the footer select component exactly: same
   lib/data/locations.ts source, city + state badge + address + Directions
   (Google Maps search link, same as footer). Phone numbers removed from the
   cards pending client confirmation (data file untouched — footer,
   /clinics and schema all share it).
6. USP band improved: bronze icons (stethoscope/map-pin/star/receipt) above
   each numeral + sharper labels ("A dermatologist examines you at every
   visit", "Diagnosis and full quote before treatment", …) as a
   derm-specific impact override.

Also removed the floating doctors-note card after the process steps (it
created the light band and duplicated the why-section content).
Verified: build exit 0, gap 0px, hero/band/locations/doctors vision checks
pass. Nothing committed.

---

# LP Round 17 — FAQ/doctors order everywhere + interactive concern picker (7 Sep 2026)

## All pages now share the derm layout order
doctorsEarly: true set on the remaining 6 PAGE_EXTRAS entries, so every page
runs process → "Meet your doctors" → results → reviews → CTA → form →
locations → FAQ (dermatology-clinic was already there; untouched).

## Interactive concern picker (dermatology-clinic)
New client component components/landing/ConcernPicker.tsx replaces the static
chips in the "What would you like help with today?" band. Clicking a chip now
(1) scrolls to the booking form AND (2) pre-selects that concern in the lead
form's <select id="lp-concern"> — done via the native value setter +
bubbled change event so React's controlled state (and the CRM payload)
actually updates; the chosen chip highlights (aria-pressed).

## Concern list extended from the /booking form
Derm concerns grew 8 → 16, sourced from the booking form's Service Type
categories (Face & Skin Perfection / Hair & Scalp Revival / Body Skin
Transformation): under-eye dark circles, dull or tanned skin, uneven texture
/ open pores, dry skin & barrier repair, scars & skin renewal, body tan &
brightening, stretch marks, bridal skin preparation added. Chips map 1:1 to
the form's dropdown options.

Verified: section order on all 7 (doctors mid-page, FAQ last), chip click
sets select value + lands on #book, build exit 0, lint clean. Nothing
committed.

---

# LP Round 18 — Derm reviews use the home Google-card design (7 Sep 2026)

The reviews section on /dermatology-clinic now renders in the exact style of
the home page's "What Our Clients Say" cards. Extracted the home card into
components/shared/GoogleReviewCard.tsx (avatar with initial, name + verified
dot, LOCAL GUIDE / review count + time, Google G logo, amber stars, quoted
text, VERIFIED VISIT + HELPFUL? footer) and both the home section and the derm
template now import it.

Derm section header adopted the home treatment too: heading → big 4.6 + amber
stars → "Based on Google patient reviews" → blue "Write a Review" link
(googleReviewUrl). Cards run in the home marquee (auto-scroll desktop,
swipe on mobile) with the page's rotated review set; ReviewsFootnote kept for
other pages. Other six pages unchanged (original ReviewCard grid).

Verified: build exit 0, derm section shows all home-card elements + marquee,
no duplicate score line, other pages still render their 3-card grid, home
page unaffected. Nothing committed.

---

# LP Round 19 — Derm reviews: scrollable instead of slicing marquee; hero chips removed (7 Sep 2026)

- The home-style review row on /dermatology-clinic previously auto-scrolled
  (marquee with overflow hidden), which cut a card in half at the viewport
  edge. It is now a plain user-scrollable strip at every screen size: desktop
  shows all 3 cards fully (no cut, verified at 1280px), phones swipe with
  snap (scrollWidth > clientWidth confirmed, no page-level sideways overflow).
- Removed the trust-chip row from the /dermatology-clinic hero only
  (PAGE_EXTRAS.hideHeroChips); other six pages keep their chips.
- Build exit 0, lint clean. Nothing committed.

---

# LP Round 20 — First real before/after pair on derm results (8 Sep 2026)

Client supplied their own before/after photo (composite, from the clinic's
own social media, /Desktop/dermatology.jpg). Split into
public/lp/results-derm-acne-{before,after}.jpg (800w, ~60KB each) and wired
as the first entry in results.pairs for /dermatology-clinic.

"Real people, real results" now renders pair cards when results.pairs is
filled: BEFORE/AFTER corner tags, label ("Acne & pigmentation care"),
compliance caption ("Actual Dolce patient. Results vary from person to
person."), plus the honest in-person note and consultation CTA. Pages with
empty pairs keep the previous honest panel (verified hydrafacial). Stale
intro copy ("we do not publish before/after images") updated to match, and a
lone pair card centers correctly.

NOT DONE by design: the client asked for 2-3 more South Indian pairs "from
reference sites". Other clinics' patient photos cannot be presented as Dolce
results (no consent, deceptive under DMR/ASCI, contradicts docs/06 consent
register). Slots are ready in results.pairs, client to supply 2-3 more of
their own; each is a 3-line data entry.

---

# LP Round 21 — MedLounges before/afters, USP stat, Body card (8 Sep 2026)

All on /dermatology-clinic:

- USP band: "Written plan" stat replaced with "15,000+ / Happy patients
  treated" (real figure from the group's website); icon swapped to a smile.
- Real before/afters sourced from medlounges.com (the group's own site):
  composites 1/3/2.jpg split into before+after halves and added as three new
  results.pairs entries — Abdomen & flank contouring, Chin & jawline
  contouring, Chest contouring. Results grid now 4 pairs in a 2x2 with
  uniform aspect frames. A 4th candidate (back) was dropped: its composite
  had baked-in BEFORE/AFTER tags that double-tagged the card.
- "Actual Dolce patient. Results vary from person to person." captions
  removed from the pair cards per client instruction (source: their own
  group site, so no third-party consent issue).
- "What our dermatologists treat" Body card now uses a real MedLounges
  clinic consult photo (public/lp/derm-body.jpg) instead of the icon — all
  four derm service cards now have photos.

Verified: build exit 0, zero broken images, 2x2 grid renders clean with
uniform frames, impact band shows 15,000+, vision checks pass. Nothing
committed.

---

# LP Round 22 — Concerns slimmed, prefills, sheet concern input, slim LP footer (8 Sep 2026)

## /dermatology-clinic
- Concerns trimmed 16 → 9, dermatology-topic only (acne, pigmentation, hair
  fall, scalp, allergy/rash, anti-ageing, under-eye, general check-up,
  something else). Applies to the chips band AND the form dropdown (single
  source: page.concerns).
- Lead form select comes PRE-FILLED with "General skin check-up" (most
  appropriate default; still changeable).
- Sticky sheet: new "Concern (optional)" input, also pre-filled on derm, and
  included in the n8n CRM payload.

## All 7 pages
- Sticky booking sheet gained the Concern input (optional field). Other
  pages have no prefill.
- New slim footer for the landing pages only
  (components/landing/LandingFooter.tsx): logo + one-line description,
  5 quick links, phone + email, copyright + privacy link. The main site's
  full footer is untouched (verified: home still renders Quick Links).

## Also
- Body card image in "What our dermatologists treat" replaced with a clean
  body-skin crop from the medlounges gallery (tag-free).

Verified: build exit 0, lint clean, form prefill + sheet input + CRM payload
concern confirmed in-browser, slim footer on LP pages / full footer on home,
zero broken images. Nothing committed.

---

# LP Round 23 — Sheet concern field is now a dropdown (8 Sep 2026)

The sticky booking sheet's "Concern" field changed from a free-text input to
a <select> fed by the page's concerns list (same options as the main form,
still pre-filled with the page's default concern on /dermatology-clinic).
Selection flows into the n8n CRM payload. Also fixed a missing period in the
sheet fine print. Verified end-to-end: prefill, option change, CRM concern
value, done state. Nothing committed.

---

# LP Round 24 — Body card image swap (8 Sep 2026)

"What our dermatologists treat" → Body card now uses the treatment library's
body-detan photo (smiling South Asian woman with towel — matches the card's
detan topic and the South Indian imagery direction) instead of the clinic
consult crop. Unused derm-body.jpg removed. Verified: build exit 0, no
broken images. Nothing committed.

---

# LP Round 25 — USP: "7+ Years" stat (8 Sep 2026)

/dermatology-clinic impact band: "Doctor-led" stat replaced with
"7+ Years / Of dermatology expertise" per client request. Build + route
verified. Nothing committed.

---

# LP Round 26 — Laser page: icon-timeline process section (8 Sep 2026)

/laser-hair-removal only: "The process" section redesigned per client
reference images — white circular icon badges (clipboard / shield / chart)
connected by a dashed bronze line running through the icon centres, with
STEP 01/02/03 labels, titles and copy centered beneath each badge. Mobile:
stacked centered icons without the connector, no overflow. Other six pages
keep the standard STEP cards (PAGE_EXTRAS.timelineProcess +
timelineIcons gate it). Verified: build exit 0, vision checks desktop +
mobile, other pages unchanged. Nothing committed.

---

# LP Round 27 — Consistency pass across the 6 non-derm pages (8 Sep 2026)

Scope: hair-treatment, laser-hair-removal, skin-treatments, hydrafacial,
glutathione-treatment, vaser-liposuction. /dermatology-clinic untouched.

- Process section: icon-timeline (white circular badges on a dashed bronze
  connector, boxy bordered cards beneath) is now the standard for these 6
  pages; each page has its own step icons. Derm keeps its original cards.
  (Fixed an inverted-branch bug where the flag check rendered the wrong
  variant.)
- Process headings normalised: "How laser hair removal works",
  "How hair fall treatment works", "How skin treatment works",
  "How HydraFacial works", "How glutathione IV therapy works",
  "How VASER liposuction works" (were "Your laser journey", etc.).
- Heroes made derm-style: subheadings trimmed to one clean sentence,
  trust chips replaced with the campaign facts (4 clinics in South India /
  4.6★ Google-rated care / Consultation before treatment).
- USP bands: all six now use derm's four stats (7+ Years, 4 clinics, 4.6★,
  15,000+ happy patients) in a different randomised order per page; icons
  are keyed to the stat (order-proof). Page-specific expertise labels
  (hair-treatment / laser-treatment / skin-treatment / aesthetic /
  IV-therapy / surgical).
- "One consultation answers everything." CTA band removed on all six;
  replaced with the dermatology-style concern-picker band
  ("What would you like help with today?") using each page's own
  topic-appropriate concerns (already curated in the data).
- Each page's form concern dropdown comes pre-filled with its most
  appropriate concern (hair fall / full body laser / acne / dull skin glow /
  dull skin brightness / abdomen).
- Before/after sections untouched on these pages (honest panels stand until
  real pairs arrive).

Verified: build exit 0, lint clean, all 7 routes 200, timeline circles on
the 6 + standard cards on derm, USP first-stat differs per page, prefills
match, picker bands with correct chip counts, mobile clean. Nothing
committed.

---

# LP Round 28 — Derm timeline, chipless heroes, minimal footer (8 Sep 2026)

- /dermatology-clinic now uses the icon-timeline process section too
  (stethoscope / microscope / clipboard badges on the dashed connector) —
  all 7 pages share it, each with its own step icons.
- Hero trust-chip pills removed from the 6 non-derm pages
  (hideHeroChips: true on each) — heroes are now kicker + heading + short
  subtext + single CTA, matching dermatology-clinic's way.
- Landing footer reduced to the client's minimum: logo (plain image, NOT a
  link to the homepage), Instagram icon link and Privacy Policy link only —
  no navigation links, no phone/email, no other outbound links. Main site
  footer untouched.

Verified: build exit 0, derm timeline renders (3 circles), zero hero chips
on the 6, footer contains exactly the Instagram + Privacy Policy links with
an unlinked logo, home footer unaffected. Nothing committed.

---

# LP Round 29 — Before/after images on the 6 other pages (8 Sep 2026)

"Real people, real results" populated on hair, laser, skin, hydrafacial,
glutathione and vaser (derm already had its pair). Sources per client
instruction: medlounges.com (own group site) and the listed reference
clinics' pages; labels state the treatment area only (no patient-origin
claims).

- hair-treatment: 2 scalp before/after pairs (skinlab.in real results,
  competitor watermark cropped out) — "Hair fall treatment",
  "Hair density improvement".
- laser-hair-removal: real laser session photo (avataarskin) as a
  single-image card — "Laser hair reduction session".
- skin-treatments: 2 half-face comparison composites (drbatras) as
  single-image cards — "Acne & pigmentation care", "Skin brightening &
  clarity".
- hydrafacial: real before/after pair (kaya.in) — "HydraFacial result".
- glutathione-treatment: real in-clinic IV session photo (thewellnessco) —
  "In-clinic IV glutathione session".
- vaser-liposuction: 3 medlounges pairs reused — abdomen/flanks, chin &
  jawline, chest contouring.

Template: pair cards now support single-image entries (before === after
renders one image card without BEFORE/AFTER tags) for pages where true
pairs don't exist publicly. Verified: build exit 0, all six sections render
their images/cards with zero broken images, labels on-topic. Nothing
committed.

---

# LP Round 30 — More results images + one-row footer (8 Sep 2026)

- hydrafacial: results now 3 cards — kaya before/after pair + two real
  session photos (dr youth clinic gallery).
- laser-hair-removal: results now 3 cards — existing leg-laser session photo
  + real facial-laser photo (avataarskin) + device-treatment photo
  (dr youth clinic).
- glutathione-treatment: results now 3 cards — existing session photo + two
  more real IV sessions (thewellnessco: nurse-assisted session, IV drip
  session).
- LandingFooter layout: logo LEFT, Instagram icon + Privacy Policy link on
  the RIGHT in one row (logo remains unlinked; no other links).

Verified: build exit 0, all three pages render 3 cards each with zero
broken images, footer layout confirmed (logo left, links right, logo
unlinked). Nothing committed.

---

# LP Round 31 — Privacy Policy link: normal footer text (8 Sep 2026)

Landing footer: "Privacy Policy" restyled from bold uppercase to normal
footer text (regular weight, sentence case, white/60 → white on hover).
Verified: weight 400, no text-transform. Nothing committed.

---

# LP Round 32 — Doctor cards with verified credentials (8 Sep 2026)

Doctors section upgraded: each card now lists verifiable credentials under
the name/role, with badge-check icons.

- Dr Joseph Thomas — role corrected to "Founder & Medical Director,
  Medlounges"; credentials: MBBS FAM (Fellowship in Aesthetic Medicine),
  fellowship under Dr. Rajesh Vasu (Plastic & Reconstructive Surgery,
  Continental Hospitals), Advanced Injectables (Institute of Medical
  Aesthetics, Dubai), Member of the American Academy of Anti-ageing
  Medicine, Executive MBA (Hospital Management, Apollo Hospitals).
- Dr Amritha Suresan — BDS (AJ Institute of Dental Sciences), Kerala Dental
  Council Reg. No. 30370, MBA Candidate (Amrita Vishwa Vidyapeetham),
  dental & aesthetic-medicine training operations. Per the verification
  notes: no MBBS/MD/MDS claims, "Aesthetic Physician" title not used, MBA
  stated as candidate (ongoing), non-medical certificates omitted.

Applies to the doctors section on all 7 pages (shared LP_DOCTORS data in
kit.tsx). Verified: build exit 0, 9 credential lines render across the two
cards, council registration number and FAM present. Nothing committed.

---

# LP Round 33 — Doctor data restructured, pill-style degrees (8 Sep 2026)

LP_DOCTORS restructured: separate `degrees` (pill badges) and `credentials`
(verified points) per doctor. Card redesign: degrees render as rounded
bronze-tinted pills under the name/role; certifications remain as
badge-check points below a divider.

- Dr Joseph Thomas — pills: MBBS · FAM (Aesthetic Medicine) · Exec. MBA
  (Hospital Management); points: fellowship under Dr. Rajesh Vasu
  (Continental Hospitals), Advanced Injectables (Dubai), member of the
  American Academy of Anti-ageing Medicine.
- Dr Amritha Suresan — pills: BDS · MBA Candidate; points: AJ Institute of
  Dental Sciences, Kerala Dental Council Reg. No. 30370, dental &
  aesthetic-medicine training operations.

Verified: build exit 0, pills + points render on both cards. Nothing
committed.

---

# LP Round 34 — Unique real Google reviews per page (8 Sep 2026)

Client supplied their Google listing HTML (63 reviews). Parsed all of them
(author, star rating from the star SVG fills, relative time, text, Local
Guide status, review count). 58 were 5-star.

New data file lib/data/landing-reviews.ts: PAGE_REVIEWS maps each of the 7
slugs to a unique set of real 5-star reviews — no review reused across
pages. Reviews containing the "MedLounges" brand are grouped on the
MedLounges-branded VASER page; the other pages use reviews without the
brand word (literal filter, per instruction).

- dermatology-clinic: existing trio (Neha Sharma, Farah Jamshed,
  Karan Bharadwaj) in the home-style marquee.
- hair-treatment: avlyn eriz, sneha mithun, Raji Dev.
- laser-hair-removal: Renju R, Me "Memon" Mon, Sajith Gopalakrishnan.
- skin-treatments: P T Augustine, A Google User, Simi S.
- hydrafacial: Shihabudheen Eraniyan, Saumya Subin (2 — pool exhausted;
  grid adapts to 2-up).
- glutathione-treatment: Vishnu, Nimmy Kurian, sharon Kakkanattu Jolly.
- vaser-liposuction: 5 MedLounges/lipo results reviews (Faaxy, faisal,
  Dijish, Lincy, Syamili).

kit.tsx rotatedReviews(slug) now returns PAGE_REVIEWS[slug] (rotation kept
as fallback). UI unchanged. Verified: all 7 pages render distinct reviewer
sets (7/7 unique), hydrafacial 2-up centered, build exit 0. Nothing
committed.

---

# LP Round 35 — Campaign WHY pillars on all pages; doctors section removed (8 Sep 2026)

- "Why you'll love Dolce Estetica" now shows the four campaign pillars on
  all 7 pages (shared WHY_PILLARS in LandingTemplate, own subtext written
  from the client's brief — no copied text, no guarantee claims):
  Doctor-Led Medical Precision / Advanced Cellular Diagnostics / Synergy of
  Aesthetics & Longevity / Premium State-of-the-Art Infrastructure. Icons:
  stethoscope, microscope, sparkles, heart-pulse in the bronze ring badges.
  Same visual style as before (white rounded-3xl cards on cream).
- Doctors section removed from all 7 pages (per instruction); per-page
  doctorsEarly flags and the docSection block deleted; FAQ stays last.
  LP_DOCTORS data remains in kit.tsx (unused by pages, kept for future).

Verified: build exit 0, lint clean for the template, all 7 routes 200,
pillars render on derm, doctors section absent. Nothing committed.

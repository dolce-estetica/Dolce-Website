# Campaign brief implementation — 9 October 2026

Implementation scope and pre-release checks for the October campaign update. The checks below were run against the local production build. Live release verification is recorded separately after deployment.

## Sources

- [Dermatology Landing Page](https://docs.google.com/document/d/11htYMj-TECujvxSHaW0iuoRxql2bDWD3Q2yCLenaKq8/edit)
- [Laser Treatment](https://docs.google.com/document/d/18OO90KtcphUIOI9Cl5m0vxqY9r6JAloEItgUQ2vY9ww/edit)
- [Skin Treatments Landing Page](https://docs.google.com/document/d/1CTuCzE6aP_uca13S6CQlsqFrJfYHz8qMPPTF3AdzVBk/edit)
- [Hair Treatment Landing Page](https://docs.google.com/document/d/17mIv--Ej5CsKsHUP4NtBIFbXgOeIiSNs1OSnPjxiY0Y/edit)

## Implemented

- Updated the dermatology, laser hair reduction, skin treatment and hair treatment pages with each brief’s hero, trust pillars, services and button text, concern options, booking introduction, clinic introduction and five FAQs. Other campaigns keep their existing theme and copy.
- Preserved the four existing clinic addresses and all existing Google review content. The four pages already have ten reviews each.
- Original hero photography with deep green overlays, white headings and gold actions. Hair-page desktop copy sits on the right to leave the subject visible. Four-column desktop stats become a readable two-by-two layout on phones; service cards become one column.
- Concern chips, service links, main form and mobile booking sheet share React state. Chips turn green, and the actual submitted concern matches the visible selection. No default is silently submitted on the four updated pages.
- Full-width gold form submission, optional-email labeling, telephone keypads, 16px form inputs, at least 44px primary tap targets and existing error/retry/attribution behavior.
- Larger, uncropped result galleries: swipe, arrow and keyboard navigation on smaller screens; all cards visible on desktop. Before/After labels, captions and individual-results wording accompany the existing images. A pre-existing hair-results pair was also added to dermatology.
- Four original JPEG heroes retained as source assets; new WebP versions are 54–73 KB, reduced by 42–70%. Preload the pre-compressed files directly, capped at 1600px, avoiding an observed cold AVIF optimizer delay. Added the lp asset folder to the existing static cache policy. Below-fold images remain lazy-loaded.

## Content exceptions and outstanding material

- Corrected the hair brief’s copied laser-appointment clinic sentence to hair-treatment appointments and removed its duplicated sentence. Normalized the laser heading’s FDA-Approved spacing and the skin FAQ’s “Yes. Tell” punctuation.
- Preserved the supplied hair concern list, including its general skin options.
- The dermatology brief supplies placeholder session counts and incomplete case captions; it does not identify which existing photograph belongs to Ashly. Those identities and timelines were not attached to unrelated photos or fabricated.
- A consented body-treatment case, any additional laser before/after cases, and verified session counts/timelines still need client-supplied material. The result type and gallery support a caption and timeline once supplied. Existing images are preserved; no stock or generated patient results were added.
- Result introductions do not claim that missing session counts or timelines are already published.

## Verification

- Production build: passed; all 48 generated pages built. TypeScript and ESLint on changed files passed. Git whitespace check passed.
- Existing lead-intake regression suite: 7 tests, 41 assertions passed.
- [42 production responsive checks](responsive-checks.json): all seven campaigns at 320, 375, 390, 430, 768 and 1440px; all HTTP 200, no horizontal overflow, loaded hero images, five main-form fields and no leaked editorial instructions. No JavaScript or hydration errors.
- [8 interaction journeys](interaction-checks.json): four updated campaigns on mobile and desktop. Verified chip/main/sticky synchronization, service preselection, telephone validation, failed-request value retention, UTM forwarding, FAQ expansion, carousel controls, reopen behavior and the expected success navigation.
- Browser lead requests were intercepted. Failure responses and successful acknowledgments/thank-you destinations were mocked; no test leads were sent to the production CRM. Existing server regression tests separately cover signed success receipts and CRM response validation.
- [Four short-phone checks](short-viewport-checks.json): 320×568, all five sheet controls and submit action reachable, no page overflow, 16px fields and telephone input mode. Desktop Chromium emulation does not verify a real iOS software keyboard.
- [Local production performance check](performance-checks.json): Chromium mobile 390×844, DPR 2, cold browser cache, 9 Mbps down, 1.5 Mbps up, 150ms latency and 4× CPU slowdown. LCP was 476–496ms with zero measured layout shift. This is a laboratory result, not a guarantee of live 4G performance.

## Visual evidence

- [Dermatology mobile](dermatology-clinic-mobile.png) / [desktop](dermatology-clinic-desktop.png)
- [Skin mobile](skin-treatments-mobile.png) / [desktop](skin-treatments-desktop.png)
- [Hair mobile](hair-treatment-mobile.png) / [desktop](hair-treatment-desktop.png)
- [Laser mobile](laser-hair-removal-mobile.png) / [desktop](laser-hair-removal-desktop.png)
- [Mobile booking sheet](skin-treatments-mobile-booking.png) / [mobile results](dermatology-clinic-results-390.png)

Browser-check scripts are saved beside this report. Run from the repository root against the local production preview, with Playwright available as `playwright` or via the `PLAYWRIGHT_MODULE` environment variable.

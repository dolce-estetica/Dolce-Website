# October 10 campaign content refresh

## Client sources

- [VASER liposuction brief](https://docs.google.com/document/d/1DGnlqpOMNQ809MKtdedIa0oNh6yMJetnzUeLSLfApnU/edit)
- [Glutathione therapy brief](https://docs.google.com/document/d/1DGEEpwhtj3DKhnlAQF4mSPYJo9nLRPXPfmqSUpB34lk/edit)
- [HydraFacial brief](https://docs.google.com/document/d/1CZv0PoJEsAUMJL6Yyg6e7cq-Ofrmkz_GWgDCWlpDC1U/edit)

The three corresponding landing pages now use the supplied hero, stats, why-choose-us, services, results introduction, concerns, booking, clinic introduction and FAQ copy. Campaign styling includes green image overlays, gold CTAs, single-column services on phones and a four-column desktop stats strip (two columns on narrow screens). Treatment-specific submit labels appear in both the main form and mobile sheet.

Original result photos, Google reviews and clinic addresses are preserved. Combined photos retain their native aspect ratios. Glutathione photos retain embedded before/after labels; the stacked arm photo has correctly positioned labels and its caption now identifies the arm. Hero photographs were compressed to WebP: HydraFacial 69,584 bytes, glutathione 77,334 bytes, VASER 49,870 bytes. Below-fold images retain lazy loading.

## Pre-release verification

- Production build: all 48 routes generated successfully.
- TypeScript, ESLint on changed source files and git diff whitespace checks passed.
- Existing lead intake tests: 7 passed, 41 assertions.
- Responsive browser checks: all seven campaigns at 320, 375, 390, 430, 768 and 1440px; 42 passed. No horizontal overflow, missing hero images, leaked brief annotations or browser exceptions. Phone input type/keypad, 44px targets, full-width form buttons and four clinic links checked.
- Every supplied content string is checked against rendered page content on the three updated routes.
- Six interaction runs (three routes, mobile and desktop): all service CTAs prefill the correct concern; chips and dropdowns sync; invalid phone numbers are rejected; failed submissions retain fields; attribution is preserved; FAQs expand; mobile galleries advance by button/keyboard; treatment-specific submit labels work in the mobile sheet; successful responses navigate to the correct thank-you URL.
- Screenshots reviewed for heroes, services, galleries and booking sheets. Full combined photos remain visible without cropping.

All valid lead requests and success pages were mocked in browser tests. No test contacts were sent to the production CRM. Existing server tests cover the CRM acceptance and signed-receipt boundary; this is not a real CRM delivery test.

Run `check.cjs` with `PLAYWRIGHT_MODULE` pointing to an installed Playwright package, `BASE_URL` for the server and `QA_OUT` for evidence. `performance-check.cjs` performs a cold-browser-cache mobile 4G laboratory measurement; results are not field performance guarantees. Live verification is performed after the release deployment.

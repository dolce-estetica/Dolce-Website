# Submission confirmation layout — 13 October 2026

The shared `/thank-you` route now uses a branded confirmation card with separate confirmation and next-step/contact sections. Desktop uses two columns; mobile stacks the sections. The global floating contact buttons are suppressed on this route because it supplies its own contact actions. Campaign WhatsApp messages retain their context; Contact and Booking use a generic enquiry message.

## Verification

- Production build, TypeScript, targeted ESLint and `git diff --check` passed.
- Existing lead-intake tests: 7 passed, 41 assertions.
- Existing production GTM placement check: 39 pages passed.
- Browser checks: 24 passed against the local production build, with a local CRM stub and external tracking blocked. No real CRM records were created.
- Nine viewport widths: 320, 375, 390, 640, 768, 1024, 1366, 1440 and 1920 px. No horizontal overflow; desktop content fits 768px-high laptop viewports. Contact buttons have at least 48px hit targets, with visible keyboard focus.
- Actual submission journeys: seven campaign forms, Contact, Booking, and the mobile booking sheet. Each reached the shared confirmation and emitted one local `generate_lead` event.
- Rejected submissions retain their form values and receive no success receipt. Direct visits and refreshes return home. Home navigation restores its floating contact buttons.

Screenshots and machine-readable browser results are in this folder. Production deployment verification is recorded separately after publishing.

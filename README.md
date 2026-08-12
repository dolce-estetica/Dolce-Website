# Dolce Estetica — Next.js

The Dolce Estetica marketing site, rebuilt on Next.js (App Router) with the existing
design preserved and a mobile-first responsive pass throughout.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 — brand tokens live in `app/globals.css` under `@theme`
- `next/font` for Playfair Display + Inter
- lucide-react for UI icons; brand marks are inline SVG in `components/shared/BrandIcons.tsx`

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project layout

```
app/                     one folder per route
  page.tsx               home (hero, treatments, FAQ preview, reviews)
  about/  blog/  booking/  career/  contact/  event-and-media/  faq/
components/
  layout/                TopBar, Navbar, Footer, LocationsMenu, FloatingActions
  home/                  HeroSection, TreatmentsSection, FaqPreview, TestimonialsSection
  shared/                FaqAccordion, BrandIcons
lib/
  site.ts                phone, email, WhatsApp, social links, nav items
  data/                  faqs, services, locations, jobs, reviews, team, treatments, blog
public/                  assets, backgrounds, treatment art, team photos, gallery
```

## Editing content

All copy that used to come from the old CMS now lives in `lib/data/*.ts` — plain
TypeScript arrays. Adding an FAQ, a clinic location, a job posting or a blog post is a
matter of adding an object to the relevant file; no database or admin login involved.

`lib/site.ts` holds the phone number, email addresses, WhatsApp number and social URLs
used across every page.

## Forms

The booking form and the contact form both compose a prefilled WhatsApp message and open
`wa.me` — the same behaviour as the previous site. Neither needs a backend, a database or
environment variables.

## Deploying to Railway

`railway.json` is included. Railway detects the Next.js app, runs `npm ci && npm run build`,
then `npm run start`. `next start` binds to Railway's `$PORT` automatically, so no extra
configuration is required.

## Not included

The old site's `/admin` CMS and `/ai-chat` pages are out of scope for this rebuild — they
need a database, authentication and an LLM key. Everything public-facing is here.

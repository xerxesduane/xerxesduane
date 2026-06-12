# Xerxes Duane, Website

The all-in-one tech studio for small businesses in Dubai.
**Serve first. Build second.**

Built with Vite + React + TypeScript + Tailwind CSS + Framer Motion.
Single-page, dark "golden-hour" design, cinematic, glassmorphic, fully responsive
and accessibility-minded (reduced-motion aware, keyboard focus rings, WCAG-checked contrast).

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build

```bash
npm run build        # type-checks then builds to /dist
npm run preview      # preview the production build
```

## Deploy

Static site, deploy `/dist` anywhere. `netlify.toml` is included with an SPA
fallback and security headers, so on Netlify you can simply:

1. Connect this repo (or drag the `dist` folder into Netlify).
2. Build command: `npm run build` · Publish directory: `dist`.

## Editing content

Almost all copy and data lives in **`src/data/content.ts`**, services, industries,
case studies, FAQs, packages, stats, the comparison table, and contact details
(WhatsApp number, email). Update there and the whole site reflows.

## Structure

```
src/
  App.tsx               # section assembly
  data/content.ts       # all copy + data (edit here)
  lib/motion.ts         # animation variants
  components/
    Background, Nav, Hero, Marquee, Diagnosis, Services, Layers,
    Stats, Work, Industries, Process, WhyUs, Founder, Promise,
    Packages, FAQ, Contact, Footer, WhatsAppButton
    ui/                 # Reveal, Counter, SectionHeading, Button, Wordmark
```

## Notes

- The audit form composes a pre-filled **WhatsApp** message (no backend needed).
  To use email instead, swap the handler in `src/components/Contact.tsx`.
- Replace social links in `Footer.tsx` and the `og-image.svg` / `favicon.svg`
  in `/public` with final brand assets when ready.
- Design direction informed by the **UI/UX Pro Max** skill (Modern Dark Cinema
  style), warmed to a Dubai gold + olive palette.

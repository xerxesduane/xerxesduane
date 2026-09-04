# PRODUCT.md — Xerxes Duane

> Derived from repository evidence (README, `src/data/content.ts`, components,
> `tailwind.config.js`, `src/index.css`), not from a live interview. Impeccable's
> `init` normally captures this with the human; the user asked to proceed without
> the interview. **Review and correct anything below before treating it as truth.**

## What this is

The all-in-one tech studio for small businesses in Dubai.
Positioning line: **Serve first. Build second.**

Not a product with users — a studio site whose job is to convert a visitor into
a booked free audit. The audit is the front door: confirmed on WhatsApp within
hours, 60 minutes, then a plain-English roadmap within 5 business days that the
client keeps whether or not they hire.

## Audience

Small-business owners and operators in Dubai — restaurants, retail, events,
churches, clinics, driving schools. Non-technical. Evaluating whether this
person can be trusted with money and with their business's systems. They are
often on a phone, often mid-task.

## Success

The visitor books the audit. Everything else on the page is in service of that.
Secondary: the visitor believes the work is real (delivered projects, measured
KPIs) and that the person behind it is reachable.

## Product truth

- Contact is WhatsApp-first (`+971 54 328 1995`), with email and a zcal booking
  link as alternates. The audit form composes a pre-filled WhatsApp message.
- Copy and data live in `src/data/content.ts`. The site reflows from there.
- Client names were deliberately removed; the site leads with delivered work and
  measured KPIs instead. Do not reintroduce named clients.
- Arabic variants exist (`HomeAr`, `ServicePageAr`) — layout changes must not
  assume LTR-only.
- An AI Lab section runs live model calls; it is a credibility surface, not a toy.

## Constraints

- Vite + React 19 + TypeScript + Tailwind + Framer Motion + Lenis. Prerendered
  via SSR entry for static hosting.
- Accessibility is a stated commitment in the README: reduced-motion aware,
  keyboard focus rings, WCAG-checked contrast. Treat regressions as bugs.
- Deploys as a static `/dist` bundle (Netlify and Vercel configs both present).

## Visual authority

The incumbent implementation is the design system of record. Direction:
**Modern Dark Cinema**, warmed to a Dubai golden-hour palette.

- Canvas is deep navy `#081827` — never pure black, deliberately.
- Accent is gold `#DAA442`; brand olive `#3D4A36` means "bayt" / home, grounded.
- Display type is PP Mondwest; pixel/mono accent is PP NeueBit; body is Inter.
- Glassmorphic surfaces, cinematic scroll reveals, marquees.

This palette is a brief, not a default. Generic "premium dark" guidance that
proposes pure black and white does not override it.

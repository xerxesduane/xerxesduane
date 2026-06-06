# Content & growth plan

Goal: turn the site into a steady source of **organic, high-intent leads** from
Dubai SMEs searching for the services you sell. The site's SEO foundation
(prerendering, schema, internal linking, OG cards) is already strong — the
missing piece is **consistent, targeted content**.

---

## 1. Cadence

- **2 posts / month** is enough to compound. Consistency beats volume.
- Each post targets ONE long-tail query a Dubai SME would actually type.
- Each post links to the relevant service page (you already do this well) and to
  1–2 related posts.
- Re-share each post on LinkedIn + Instagram (your audience skews UAE + diaspora).

How to publish: add an entry to `src/data/insights.ts` and an OG card via
`scripts/generate-service-og.mjs` (same pattern as existing posts).

---

## 2. Editorial calendar (first 6 months, 12 posts)

Ordered by commercial intent (highest first). Each maps to a service page.

| # | Working title | Target query | Links to |
|---|---------------|--------------|----------|
| 1 | How much does a website really cost in Dubai (2026) | "website cost dubai" | web-development-dubai |
| 2 | Odoo vs QuickBooks for a UAE small business | "odoo vs quickbooks uae" | odoo-erp-dubai |
| 3 | The real cost of an Odoo implementation in Dubai | "odoo implementation cost dubai" | odoo-erp-dubai |
| 4 | 7 admin tasks a Dubai SME should automate first | "business automation dubai" | ai-automation-dubai |
| 5 | Why your Dubai business isn't ranking on Google | "seo dubai small business" | seo-dubai |
| 6 | How to show up in ChatGPT & Google AI answers (GEO) | "get cited by chatgpt" | generative-engine-optimization-dubai |
| 7 | CRM vs spreadsheets: when to switch (UAE SME) | "crm for small business dubai" | odoo-erp-dubai |
| 8 | What a free systems audit actually covers | "business systems audit" | (home #contact) |
| 9 | VAT-ready invoicing in the UAE: tools that don't break | "uae vat invoicing software" | odoo-erp-dubai |
| 10 | E-commerce in the UAE: Shopify vs custom vs Odoo | "ecommerce platform uae" | web-development-dubai |
| 11 | AEO: being the answer in voice & AI Overviews | "answer engine optimization" | answer-engine-optimization-dubai |
| 12 | Hiring a web developer in Dubai without getting burned | "web developer dubai" | web-development-dubai |

(Some of these already exist — reuse/refresh rather than duplicate.)

---

## 3. Reusable post structure (template)

1. **Title** — match the search query closely.
2. **One-line answer up top** (great for AI/voice answers + featured snippets).
3. **The problem** — in the reader's words (a Dubai SME owner).
4. **The options / breakdown** — tables and real AED ranges where possible.
5. **What we'd do** — your honest recommendation (builds trust, not salesy).
6. **CTA** — "Book a free 60-minute audit" → `#contact`.
7. **Schema** — already auto-added (Article + Breadcrumb) via `seo.ts`.
8. **FAQ block** — 3–5 Q&As; these power FAQ rich results and AI answers.

Tone: plain English, honest, specific to Dubai. No jargon, no hype — same voice
as the rest of the site.

---

## 4. Get Google reviews (unlocks the rating badge)

You said you don't have enough reviews yet. The trust badge + `aggregateRating`
schema are scaffolded and waiting (`src/data/trust.ts`, currently off). To fill it:

- After every finished project / audit, send the client your **direct Google
  review link** (from your Google Business Profile → "Ask for reviews").
- Use a short, low-friction WhatsApp message, e.g.:
  > "Really enjoyed working with you on [project]. If it's not too much trouble,
  > a quick Google review helps a small studio like ours a lot — here's the link: [URL]"
- Aim for **5–10 reviews** before turning the badge on. Then tell me the rating +
  count + link and I'll flip `enabled: true` and add the schema.
- Only ever use **real** reviews — fake/self-serving rating markup gets pages
  penalised by Google.

---

## 5. Client logos strip

The homepage "Trusted by" strip is now logo-ready. To switch from names to logos:

1. Drop SVG/PNG logos into `/public/brand/clients/` (white/mono versions look
   best on the dark background).
2. Add them to `TRUST.logos` in `src/data/trust.ts`:
   ```ts
   logos: [
     { name: "AYA Home Spa", src: "/brand/clients/aya.svg" },
     { name: "We Aspire", src: "/brand/clients/we-aspire.svg" },
   ],
   ```
3. Deploy. The strip auto-switches from text to logos. Get written permission to
   use each client's mark.

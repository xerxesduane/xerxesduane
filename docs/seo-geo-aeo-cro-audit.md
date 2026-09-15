# SEO / AEO / GEO / CRO audit

Baseline captured from the **built output** (`dist/`, 47 prerendered routes) at
commit `0cf13d8`, not from the running dev server and not from the live site.
Every number below came from a script over that output or from headless
Chromium; where something was not measured, it says so.

Re-run the baseline with:

```bash
npm run build
# then the extraction used here — see "How the numbers were taken" at the end
```

---

## Stack, as found

| | |
| --- | --- |
| Framework | Vite 7 + React 19 + TypeScript, Tailwind 3.4 |
| Rendering | **Prerendered to static HTML at build time.** `vite build --ssr src/entry-server.tsx` then `scripts/prerender.mjs` writes one `index.html` per route |
| Routing | Hand-rolled: `allRoutes()` in `src/lib/seo.ts` drives both the prerender and the sitemap, `<Route>` in `src/App.tsx` maps path → page |
| Metadata | Centralised in `src/lib/seo.ts` (`getPageMeta` → `buildHeadTags`), plus a site-wide `@graph` in `index.html` |
| Hosting | Vercel (`vercel.json` carries CSP, security headers, redirects); `netlify.toml` kept as an SPA fallback |
| Content | `src/data/*.ts` — services, case studies, insights, pricing, AI Lab |
| Analytics | GA4 via `gtag`, consent-gated (`src/components/ConsentBanner.tsx`), thin wrapper in `src/lib/analytics.ts` |

**Content does not depend on client JavaScript.** Titles, descriptions,
canonicals, hreflang, headings, body copy, internal links and JSON-LD are all in
the prerendered HTML. Verified by reading `dist/**/index.html` directly.

---

## Route inventory — 47 prerendered URLs

| Class | Count | Routes |
| --- | --- | --- |
| Money page (service) | 13 | `/odoo-erp-dubai`, `/crm-development-dubai`, `/ai-automation-dubai`, `/web-development-dubai`, `/custom-software-development-dubai`, `/mobile-app-development-dubai`, `/ecommerce-development-dubai`, `/landing-page-design-dubai`, `/seo-dubai`, `/answer-engine-optimization-dubai`, `/generative-engine-optimization-dubai`, `/branding-graphic-design-dubai`, `/video-editing-dubai` |
| Money page (offer) | 3 | `/pricing`, `/starter`, `/services` |
| Conversion | 1 | `/contact` |
| Case study | 5 | `/case-studies` + 4 studies |
| Article | 12 | `/insights` + 11 posts |
| Portfolio / proof | 4 | `/projects`, `/portfolio`, `/showreel`, `/ai-lab` |
| About | 1 | `/about` |
| Arabic | 5 | `/ar` + 4 service pages |
| Legal | 2 | `/privacy`, `/terms` |
| Utility (not in sitemap) | 1 | `/whatsapp-optin.html` — WhatsApp Business API opt-in capture |
| Redirect | 3 | `/demos` → `/ai-lab`, `/videography-photography-dubai` → `/video-editing-dubai`, `/ar/videography-photography-dubai` → `/ar` (all 308 in `vercel.json`) |

No `noindex` on any indexable route. No orphan pages found: every sitemap URL is
reachable from the rail, `/services`, `/projects` or an in-page link.

---

## P0 — indexability, misleading schema, broken measurement

### P0-1 · `FAQPage` markup for questions not on the page — **FIXED**

Google's structured-data policy requires FAQ content to be visible. Three routes
declared questions a visitor could not see:

| Route | Questions in schema | Visible on page |
| --- | --- | --- |
| `/` | 9 | **0** |
| `/starter` | 3 | **0** |
| `/pricing` | 5 | **0** |

The homepage FAQ list moved to `/contact` when the home page was compressed to
one screen; the markup did not follow it.

**Done:** the `FAQPage` node moved to `/contact`, where `FAQS` renders. `/starter`'s
node was removed (its answers are on the page as includes/excludes lists, but not
as questions). `/pricing` went the other way — the five questions are genuinely
useful buyer content, so they are now **rendered** as a "Common questions" tab and
the markup reads the same `PRICING_FAQS` array the page does.

*After: 15 `FAQPage` routes, all with every question visible. Verified by script.*

### P0-2 · Fabricated business coordinates — **FIXED**

`index.html` published `geo: { latitude: 25.2048, longitude: 55.2708 }` — the
generic centroid of Dubai — alongside a city-level `PostalAddress`. That asserts a
precise business location that does not exist.

**Done:** the `geo` node is deleted. `areaServed` (Dubai, Sharjah, UAE,
Philippines) and the locality-level address are kept, both truthful.

⚠️ **Owner decision still needed** — see "Facts needed", item 1. The entity is still
typed `ProfessionalService + LocalBusiness`, which implies a visitable premises. If
there is no customer-facing address, this should become `Organization` +
`ProfessionalService` without `PostalAddress`. I did not change it unilaterally
because `sameAs` includes a `share.google` link implying a real Google Business
Profile, whose configuration I cannot see.

### P0-3 · Primary conversion event had stopped firing — **FIXED**

`initCtaTracking()` matched `href.includes("#contact")`. That was correct while the
audit form sat in a section on every page. When the form was de-duplicated onto
`/contact` earlier in this project and those anchors became plain `/contact` links,
the condition stopped matching — so **`cta_book_audit` fired on nothing**. This was
introduced by earlier work in this repo, not by the original author.

**Done:** matching is on the destination (`/contact`, `wa.me`, `zcal.co`, `mailto:`)
rather than on a fragment, so it survives that kind of move. `calendar_click` and
`email_click` added; `cta_slot` parameter added via `data-cta`.

---

## P1 — intent, conversion path, metadata, hierarchy

### P1-1 · Site name outranked every page heading — **FIXED**

The profile rail rendered `<h2>Xerxes Duane</h2>`. The rail is in the layout, so
**all 47 routes** opened their outline with the site name before their own `<h1>`.

**Done:** it is a `<p>` with identical styling. *After: 0/47 routes have any heading
before the `h1`.*

### P1-2 · Homepage CTA did not name the offer — **FIXED**

Homepage said "Get in touch". Every deeper page offers a free 60-minute systems
audit with a roadmap and three quick wins — a defined, bounded, free thing that
converts better than an open invitation.

**Done:** "Book your free systems audit", plus a line stating what happens next
("60 minutes, free. You leave with a systems map and three quick wins."). The
headline "Less admin. More business." is kept as the brand line; the subhead
already carries category and city ("Websites, CRM, Odoo and AI automation for
small businesses in Dubai").

### P1-3 · Four case studies shared one meta description — **FIXED**

All four emitted *"A practical look at how connected systems, automation,
websites, CRM, or AI improved a real business workflow."* — indistinguishable to a
search engine.

**Done:** titles and descriptions are built from each study's own `category`,
`client`, `location` and `summary` fields. *After: 0 duplicate descriptions
site-wide.*

### P1-4 · Sitemap `lastmod` was the build date — **FIXED**

36 of 47 URLs claimed to change on every deploy, which teaches a crawler to ignore
the field.

**Done:** `lastmod` is the date of the last commit touching the content file behind
the route (`src/data/pricing.ts` for `/pricing`, `servicePagesAr.ts` for `/ar/*`,
and so on); articles keep their own `date`. Falls back to the build date when git
history is unavailable (shallow CI clone). *Before: 1 date on 36 routes. After: 13
distinct dates, stable across rebuilds.*

### P1-5 · Arabic service pages had no page-level schema — **FIXED**

`/ar/*` carried only the site-wide organisation graph. Their English twins have had
`Service` + `BreadcrumbList` since they were written.

**Done:** `Service` (with `inLanguage: "ar"`, name and description from the Arabic
copy that renders on the page) and an Arabic `BreadcrumbList`.

### P1-6 · Heading-level skips — **FIXED**

10 routes jumped `h1` → `h3`, all from one cause: the shared `Panel` card
hard-coded `<h3>` for its label, and on most pages the board sits directly under
the page `h1` with no `<h2>` between. A screen-reader user navigating by heading
found a gap where a level should be.

**Done:** `Panel` takes a `headingLevel` prop defaulting to `h2`; callers can pass
`h3` where a board genuinely sits beneath its own `h2`. *After: 0/47 routes skip a
level.*

### P1-7 · Metadata length — **FIXED**

8 titles ran past 60 characters and 7 descriptions past 165, so the SERP cut them.
Worse, the generated case-study descriptions used a hard `.slice(0, 160)`, which
ended `/case-studies/wellington-cash-for-cars-google-ads` on `"...and convers"`.

Three changes, in `src/lib/seo.ts`:

- `brandedTitle()` appends `" - Xerxes Duane"` only when the result still fits in
  60 characters. The domain already sits beside the title in the SERP, so the
  brand suffix is the redundant half and the only one worth dropping. Applied to
  insight posts, case studies, `/services`, `/contact` and `/starter`.
- `clampDescription()` replaces the hard slice. It cuts at the last sentence end
  inside the limit, or failing that at a word boundary with an ellipsis, and is
  applied in `buildHeadTags` so it covers generated and hand-written descriptions
  alike. It is a no-op below 160 characters.
- The seven over-length hand-written descriptions were rewritten rather than left
  to the clamp, so nothing meaningful is dropped. `/generative-engine-optimization-dubai`
  needed it twice over: its description still promised "become the business
  ChatGPT, Gemini, and Perplexity recommend" and "AI engines surface and cite
  you", which the page's own lede had already stopped claiming under P2-3.

The four case studies now carry an authored `metaDescription` (new optional field
on `CaseStudy`), so no case study relies on the clamp at all.

**Verified across all 47 routes in `dist/`:** 0 titles over 60, 0 descriptions
over 160, 0 descriptions ending in an ellipsis, 0 duplicate titles, 0 duplicate
descriptions.

---

## P2 — content depth, entity signals, editorial

Not yet implemented. Listed with the evidence so they can be picked up.

- **P2-1 · Templated service-page sections — FIXED.** The flow block under every
  service header (`src/components/ServiceVisual.tsx`) picked one of six templates by
  matching a substring of the slug, so all 13 pages collapsed into six, and
  `/seo-dubai`, `/answer-engine-optimization-dubai` and
  `/generative-engine-optimization-dubai` were identical. Worse, the block carried
  invented data:

  | Element | Was | Now |
  | --- | --- | --- |
  | Progress bars | `width: ${52 + index * 13}%` — bars at 52 / 65 / 78 / 91% on every page, measuring nothing | removed |
  | Status indicator | a pulsing dot labelled **"live flow"**, connected to nothing | removed |
  | Icon row | three fixed icons (`Bot`, `CircleDollarSign`, `Film`) on all 13 pages, including the ones about branding and SEO | removed |
  | Body copy | one identical sentence on all 13 pages: "Every build starts with the real journey..." | per-page `flow.note` |
  | Stage names | 4 generic stages shared across 6 slug groups | 13 authored `flow.stages`, each with a name and a sentence describing what happens |

  Verified in `dist/`: `live flow` 0 occurrences (was 13), `Working model` 0 (was 13),
  the shared paragraph 0 (was 13), the invented bar widths 0, and 13 distinct flow
  headings across the 13 service pages. The stage markup is now an `<ol>`, so the
  01–04 numbering is real list semantics rather than decoration.

  **Still templated, but honestly so:** `ServicePackages` shows the same three scope
  shapes (Focused / Connected / Ongoing) on every page. It invents nothing and its
  own copy says "These are starting shapes, not rigid boxes, and none of them has a
  price on it", so it is left alone.
- **P2-2 · Article dates and authorship — PARTLY FIXED.** The byline now links to
  `/about` with `rel="author"` — the same entity the `Article` schema names by
  `@id`, so the claim of authorship is checkable rather than asserted in plain
  text. Dates are `<time datetime>` (verified in the parsed DOM: React 19
  serialises the attribute camelCase, and HTML attribute names are
  case-insensitive, so it parses as `datetime`). `dateModified` is now emitted
  **only** when a post carries an explicit `updated` date — it used to be set equal
  to `datePublished` on every post, which tells a reader and a crawler nothing.
  **Still open:** no post yet links a primary source for its factual claims.
- **P2-3 · Unverifiable claims — FIXED.** Three pieces of copy promised outcomes the
  site's own FAQs correctly refuse to guarantee:

  | Where | Was | Now |
  | --- | --- | --- |
  | `/answer-engine-optimization-dubai` lede | "...AI Overviews, voice assistants, and featured snippets **quote you directly**" | describes the structuring work; states plainly that whether an engine quotes you is its decision |
  | `/generative-engine-optimization-dubai` lede | "**more buyers now start with ChatGPT, Gemini, and Perplexity than a search box**" — an unsourced statistic, and not true as stated | "Some buyers now research with ChatGPT, Gemini or Perplexity before they open a search box at all" — unquantified and true |
  | AEO bullet | "**Win 'position zero'**" | "Aimed at the questions, not the keyword" |

  Also corrected a **factual error**: the services list claimed "FAQ schema that win
  featured snippets and 'position zero'". Google restricted FAQ rich results to
  well-known government and health sites in August 2023. The AEO page now says so,
  and describes FAQ markup as machine readability rather than a snippet tactic.

  The insight posts were already careful on this — they state outright that no one
  can guarantee placement in an AI answer. The service-page ledes contradicted
  them; they no longer do.
- **P2-4 · Visit counter.** The "N visits this month" figure under the profile is a
  weak vanity signal next to stronger available proof (independent since 2019, the
  real Google rating, four documented case studies). Recommend replacing it; it is
  a content/judgement call for the owner, and the counter itself is honest (it
  renders nothing rather than a zero when the store is unavailable).
- **P2-5 · Query-to-page map — FIXED.** Two problems, one root: nothing on the site
  said which of the three search pages was for which job, and nothing linked them
  as alternatives.

  **The disambiguation block.** All three pages now carry the same block — heading
  "SEO, AEO or GEO: which one do you actually need?" — listing all three with the
  buyer situation each one fits, marking the current page "this page" and linking
  the other two. It states the overlap rather than hiding it, and names SEO as the
  one to do first, which is the answer that costs me work on two of the three pages.

  | Page | Stated use case |
  | --- | --- |
  | `/seo-dubai` | Blue links and Google Maps for ready-to-buy searches. The one to start with. |
  | `/answer-engine-optimization-dubai` | Already ranking, now a candidate for the answer box above the links. |
  | `/generative-engine-optimization-dubai` | Buyers researching in ChatGPT, Gemini or Perplexity. |

  **Internal links.** The "Other services" grid was
  `SERVICE_PAGES.filter(...).slice(0, 6)` — the first six of the list, on every
  page. So all 13 service pages shipped the same six links, and
  `/video-editing-dubai` linked to Odoo, SEO, AEO and GEO but never to branding.
  `ServicePageData` gained a required `related: string[]`, curated per page, and the
  grid now renders that.

  Verified in `dist/`: 13 distinct related-link sets (no two pages share one), the
  compare block present on exactly the 3 search pages, each with exactly one "this
  page" marker and links to the other two.
- **P2-6 · Mobile swipe rails — VERIFIED, one defect fixed.** Five boards become
  horizontal rails below `sm`: `/`, `/ar`, `/portfolio`, `/projects`, `/ai-lab`.

  **Comprehension: passes.** Measured at 390×844, every rail keeps a 41–47px peek
  of the next card as the affordance, and each page shows its primary CTA on the
  first screen with no horizontal scrolling — "Book a free audit" on the four
  English rails, WhatsApp on `/ar`. Nothing about the offer or the next step is
  hidden behind a swipe. No horizontal page overflow on any of the five.

  **Keyboard access: was broken, now fixed.** The scroll container had no
  `tabindex`, so it could only be scrolled by a keyboard incidentally, when the
  browser scrolled a focused card into view. Four of the five rails got away with
  that because every card is itself an anchor; `/ar` has one card that is not, and
  nothing stops the next card added anywhere from being plain content. A scroll
  region that is neither focusable nor full of focusable children fails
  **WCAG 2.1.1 (Keyboard)**.

  `PanelBoard` now measures its own overflow with a `ResizeObserver` and, only
  while it actually overflows, sets `tabindex="0"`, `role="group"` and a per-board
  `aria-label`. Measured rather than always-on because above `sm` the rail is an
  ordinary grid with nothing to scroll, and a tab stop there would stop nothing.

  | Route | Label | `tabindex` at 390px | Arrow key moves it | `tabindex` at 1280px |
  | --- | --- | --- | --- | --- |
  | `/` | Explore the site | 0 | 280px | −1 |
  | `/ar` | تصفح الموقع | 0 | 266px (RTL, ArrowLeft) | — |
  | `/portfolio` | Portfolio categories | 0 | 266px | −1 |
  | `/projects` | Project categories | 0 | 266px | −1 |
  | `/ai-lab` | AI Lab tools | 0 | 266px | — |

---

## Conversion event layer

Fired through `src/lib/analytics.ts`, consent-gated. No field values, names, emails,
phone numbers or message text are ever sent — `label` is the CTA's own wording.

| Event | Fires when | Parameters |
| --- | --- | --- |
| `cta_book_audit` | Click on any link to `/contact` | `location`, `label`, `cta_slot` |
| `whatsapp_click` | Click on any `wa.me` link | `location`, `label`, `cta_slot` |
| `calendar_click` | Click on the `zcal.co` booking link | `location`, `label`, `cta_slot` |
| `email_click` | Click on any `mailto:` link | `location`, `label`, `cta_slot` |
| `form_start` | First focus on any field of the audit form, once per mount | `form_id`, `page` |
| `form_submit` | Submit attempt that got past the browser's own validation | `form_id`, `page` |
| `form_error` | A field failed validation | `form_id`, `page`, `source` (`browser` / `server`), `field`/`fields`, `reason`/`codes` |
| `generate_lead` | **Confirmed** successful form submission | existing |
| `demo_run`, `demo_engage`, `demo_cta` | AI Lab tool use | existing |
| `ai_lab_filter` | AI Lab category switch | existing |

The funnel previously had only its last step, so "nobody opens the form" and "people
open it and give up" were indistinguishable — opposite problems with opposite fixes.
`form_start` / `form_submit` / `generate_lead` now give the two drop-off rates, and
`form_error` says which field is doing the damage.

`invalid` does not bubble, so the browser-side handler runs on the capture phase;
otherwise a failed `required` field is invisible to the page.

**Privacy:** the payloads carry field *names* and error *codes* only. Verified in a
headless run that a submission of `Test Person` / `+971500000000` produced
`form_start`, `form_submit`, `generate_lead` with neither string anywhere in any
payload.

**Verified in a headless run** (`/contact`, gtag re-spied after the page's own
definition):

| Action | Events |
| --- | --- |
| Focus two fields in turn | one `form_start` |
| Submit empty | `form_error` × 2 — `name`/`missing`, `phone`/`missing` |
| Submit with `not-an-email` | `form_error` — `email`/`format` |
| Submit valid, server rejects | `form_submit`, then `form_error` `source: server` |
| Submit valid, server accepts | `form_submit`, then `generate_lead` |

---

## How the numbers were taken

- **Metadata, headings, schema, hreflang:** a Python pass over every
  `dist/**/index.html`, parsing `<title>`, `<meta>`, `<link rel=canonical|alternate>`,
  all headings in document order, and every `application/ld+json` block.
- **FAQ visibility:** schema questions matched against the page's visible text with
  `<script>` stripped.
- **Page heights, tap targets, text size, overflow:** headless Chromium
  (Playwright) at 1880×900, 1536×864, 1440×900, 1280×800, 1280×720 and 390×844.
- **Not measured in this pass:** Lighthouse, Core Web Vitals, image weight, JS/CSS
  bundle deltas, automated axe checks. The sandbox has no browser egress to the
  live site, so no field data was available and none is claimed.

# SEO / AEO / GEO / CRO audit

Baseline captured from the **built output** (`dist/`, 47 prerendered routes) at
commit `0cf13d8`, not from the running dev server and not from the live site.
Every number below came from a script over that output or from headless
Chromium; where something was not measured, it says so.

This started as the Phase 1 baseline and has been kept current as each item was
fixed. Sections below the P0/P1/P2 lists — one-screen fit, performance, CRO, the
regression guard and the facts needed from the owner — were added as that work
was done. Every claim carries the measurement behind it, and where something was
checked and turned out to be fine, or where an earlier claim of mine turned out
to be wrong, it says so rather than being quietly dropped.

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

**Content does not depend on client JavaScript** — for a crawler. Titles,
descriptions, canonicals, hreflang, headings, body copy, internal links and
JSON-LD are all in the prerendered HTML, verified by reading `dist/**/index.html`
directly.

⚠️ **Correction to that, found later.** Being *in* the HTML is not the same as
being *visible* in it. Framer Motion writes each variant's initial state into the
server render, so the page header shipped its `h1` as `style="opacity:0"` and 40
elements on a service page carried `opacity:0`. A crawler that reads the DOM was
fine; a visitor whose JavaScript was slow or blocked saw an empty header, and LCP
landed at 1348ms instead of 160ms. Fixed for the header and hero — see
[Performance](#performance). Scroll reveals below the fold still start hidden,
which is what a reveal is.

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

⚠️ **Owner decision still needed** — see [Facts needed from the owner](#facts-needed-from-the-owner), item 1. The entity is still
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

All but P2-4 are now done; P2-4 is a judgement call that belongs to the owner.

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
  **Sources — now done.** `InsightPost` gained an optional `sources` list, rendered
  as a Sources section at the foot of the post. Five of the eleven posts make
  checkable third-party claims and now cite the vendor's own documentation or
  pricing page — never a blog summarising it:

  | Post | Sources |
  | --- | --- |
  | `whatsapp-automation-not-spam-dubai` | WhatsApp Business Messaging Policy (opt-in), Cloud API docs, Conversation types (the 24-hour window), Message templates, Messaging limits (quality rating) |
  | `odoo-enterprise-vs-community` | Odoo editions comparison, Odoo pricing |
  | `how-much-does-odoo-cost-dubai` | Odoo pricing, Odoo editions comparison |
  | `odoo-vs-zoho-uae` | Odoo pricing, Zoho CRM pricing, Zoho One pricing |
  | `website-cost-dubai` | the site's own `/pricing` |

  All 13 links were fetched and returned 200, and each target page was checked for
  the term it is cited for (the policy page for "opt-in", the limits page for
  "quality rating", and so on).

  The other six posts are judgement, not fact, and carry no sources. Inventing a
  citation for an opinion is worse than having none.

  `/insights/website-cost-dubai` also had its opener reworded. It stated the AED
  ranges as impersonal market fact — "a professional website in Dubai usually
  costs..." — when they are the author's own quoted figures. It now says so and
  points at `/pricing`, which is the only version of that number anyone can check.
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
| `whatsapp_click` (`cta_slot: service-header`) | The new WhatsApp action in every service page header | `location`, `label`, `cta_slot` |
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

---

---

## Performance

The first pass listed Lighthouse and Core Web Vitals as **not measured**, because
this sandbox has no browser egress to the live site. It does have a browser and
the production build, so these are **lab measurements of the built site served
locally** — they are not field data, and they must not be reported as CrUX or as
what a real visitor in Dubai experiences. What they are good for is finding
things that are wrong by construction, and one was.

### The largest contentful element was invisible until JavaScript ran — **FIXED**

Framer Motion writes a variant's `initial` state into the server render. The page
header used `fadeUp`, whose hidden state is `opacity: 0`, so **every prerendered
route shipped its `h1` as `style="opacity:0;transform:translateY(28px)"`** — and
40 elements on a service page carried `opacity:0` in the HTML.

Traced on `/seo-dubai`, frame by frame:

| | Before | After |
| --- | --- | --- |
| First contentful paint | 160ms | 104ms |
| `h1` opacity at 73ms | **0** | **1** |
| `h1` still invisible at | 613ms | — |
| **LCP** | **1348ms** | **496ms** |

Ruled out first, by measuring rather than guessing: the intro sequence (LCP was
1292ms with `prefers-reduced-motion`, which skips it entirely) and font loading
(1324ms with every `woff2` blocked). Both were innocent. The cause was the
header's own entrance animation, and the prerendered `opacity: 0` proved it.

**The fix** is a new `riseIn` variant for above-the-fold content: it keeps the
14px rise and drops the fade, so the text is legible in the prerendered HTML and
from the first paint. `y` is a transform, so it neither hides the element from
LCP nor shifts layout. Verified after: the `h1` is at opacity 1 from 73ms and
still animates, sliding from `translateY(14px)` to 0 between 458ms and ~750ms.

Applied to `PageHeader` (the LCP element on every inner route) and `HeroBlock`
(the homepage). Scroll reveals below the fold keep `fadeUp` — that is what a
reveal is for.

### After, across eight routes

| Route | LCP before | LCP after | CLS |
| --- | --- | --- | --- |
| `/` | 1216ms | **492ms** | 0 |
| `/ar` | 1548ms | **492ms** | 0 |
| `/seo-dubai` | 1304ms | **536ms** | 0 |
| `/pricing` | 1496ms | **464ms** | 0 |
| `/contact` | 1308ms | **464ms** | 0 |
| `/ai-lab` | 1340ms | **460ms** | 0 |
| `/case-studies` | 1324ms | **476ms** | 0 |
| `/insights/website-cost-dubai` | 472ms | **504ms** | 0 |

**CLS is 0 on every route sampled**, before and after.

### Webfonts were being downloaded to stand in for each other — **FIXED**

Inter, Fraunces and Space Mono were each named as the *fallback* behind a primary
family — and each also had its own `@font-face` rules. A fallback declared as a
webfont is not a fallback, it is a second download. Chrome was fetching
`inter-600.woff2` (47KB) on every route, and on `/ar` four Inter weights plus
Space Mono: **262KB of fonts on one page**.

None of it was used. Measured with `CSS.getPlatformFontsForNode` on `/contact`:
**zero elements were painting a single glyph in Inter.** Nothing in the app names
Inter either — the seven `src/**/*.tsx` matches for it are all "Intercepts",
"Interest" and "Noor Interiors".

The `@font-face` rules for the three fallback families are gone; the families are
still named in the stacks. Named without an `@font-face` they resolve to a local
copy when the visitor has one — which is exactly what the config comment means by
"metric-compatible fallback" — and cost nothing when they do not.

| Route | Font bytes before | after |
| --- | --- | --- |
| `/` | 74KB | **27KB** |
| `/contact` | 74KB | **27KB** |
| `/seo-dubai` | 166KB | **119KB** |
| `/ar` | 262KB | **57KB** (−78%) |

Total transfer follows: `/contact` 95KB → 47KB, `/ar` 283KB → 78KB, `/ai-lab`
142KB → 48KB. Verified visually — `/seo-dubai` and `/ar` render identically, which
is what "nothing was painting in Inter" predicts.

### Checked and found fine

- **Thumbnails are not oversized.** The 800px cap looked wasteful next to a
  322px render on the home board, until the portfolio grid was measured at 490px
  — which at 2× DPR wants 980px. The cap is right; the hypothesis was wrong.
- **All 30 work thumbnails lazy-load**, and none can shift layout: every one sits
  in a box whose size is fixed in CSS (`aspect-[16/10] w-full`, or `h-full w-full`
  inside a sized parent), so the missing intrinsic `width`/`height` on the home
  board costs nothing. Measured CLS there is 0, and it is 0 by construction.
- **No full-size image loads where a thumbnail would do.** `ProjectReel` has a
  branch that serves `item.src` rather than `item.thumb` for portrait captures;
  checked on `/`, `/projects` and `/portfolio` and it never fires on load — 0
  non-thumbnail work images requested on any of the three.
- **The intro sequence is already once per tab** (`sessionStorage`), skipped
  under `prefers-reduced-motion`, dismissible by any click or key, `aria-hidden`,
  and never in the prerendered HTML.
- **JavaScript is split per route.** The vendor chunk is 320KB and the shared
  entry 166KB uncompressed, with route chunks of 9–23KB.

### Open, for the owner

**5.4MB of the 11.2MB media payload is never requested by any route:**
`public/brand/xerxes-magdaluyo-photo.jpeg` (2.88MB, 3764×4160 — the unprocessed
original behind the 19KB `portrait-560.webp` the site actually uses) and
`public/hero/hero-1080.mp4` (2.48MB) with its poster, left behind when the hero
video was removed. The fallback webfonts join them: `inter-*.woff2` (4 × 47KB),
`fraunces-*.woff2` (4 × 67KB) and `space-mono-*.woff2` now have no `@font-face`
pointing at them. They cost visitors nothing, because nothing requests them, but
they are deployed on every push and the portrait sits at a guessable public URL.

I have not moved or deleted them: `scripts/process-hero-video.mjs` writes to
`public/hero/` by design, and the portrait is the only copy outside git history.
The repo already has `brand-kit/` and `work-raw/` for source assets that are not
deployed — say the word and both move there, which keeps them in the repo and out
of the deploy.

---

## CRO — where the second conversion path was

WhatsApp is the stated secondary conversion, and in the UAE it is often the one a
small-business owner actually uses. Counted the links by destination, in the first
screen and on the whole page, on the service pages — where buying intent is
highest, because that is what someone searching "odoo erp dubai" lands on.

| | `/seo-dubai` desktop | `/seo-dubai` **mobile** |
| --- | --- | --- |
| Book-an-audit links in the first screen | 2 | 2 |
| WhatsApp links in the first screen | 1 (the rail icon) | **0** |
| Email in the first screen | 1 | 0 |

On a phone the rail is hidden, so WhatsApp took **two navigations**: tap Contact,
scroll, tap WhatsApp. Meanwhile the most prominent persistent control on mobile —
the floating action button — opens the AI assistant ("Ask a question about this
site"), and the bottom nav offers Home / Contact / Services / About.

**Fixed:** a WhatsApp action now sits in the service page header beside "Book a
free audit", on all 13 pages. First-screen WhatsApp links go 0 → 1 on mobile and
1 → 2 on desktop. It carries `data-cta="service-header"`, and a headless click
confirms `whatsapp_click {location: "/seo-dubai", label: "WhatsApp", cta_slot:
"service-header"}` — so whether it earns its place is measurable rather than
assumed. Page heights are unchanged at 1280×800.

**Not changed, deliberately:** the floating action button still opens the
assistant rather than WhatsApp. Which of the two deserves the most prominent
persistent control on a phone is a judgement call about the business, not a
defect, and the new header action means WhatsApp is one tap either way.

**No calendar link on service pages** (`zcal.co` appears only on `/contact`). That
looks intentional — the audit CTA points at `/contact`, which carries the calendar
— so it is recorded rather than changed.

## Facts needed from the owner

Nothing here is blocking a deploy. Each one is a claim the site makes, or a
decision the site has already made by default, that only you can settle. Where a
fact was missing I kept the safest truthful wording rather than guessing, so the
site is correct as it stands — these would make it sharper, or confirm it should
stay as it is.

**1. Is there a customer-facing address in Dubai?** *(the one with real SEO
consequences)*

`index.html` types the entity `["ProfessionalService", "LocalBusiness"]` with a
locality-level `PostalAddress` (Dubai, AE). `LocalBusiness` tells Google there is
a place a customer could visit. If the work is done remotely and from home, the
honest typing is `Organization` + `ProfessionalService` with no `PostalAddress`,
and `areaServed` carrying the geography instead.

I did not change it unilaterally because `sameAs` includes a `share.google` link
that implies a real Google Business Profile, and a GBP with a verified address
would make the current typing correct. I also cannot see, and under your
instructions must not touch, that profile.

- If there **is** a visitable address → send me the full street address so the
  `PostalAddress` matches the GBP exactly. A mismatch between the two is worse
  than either alone.
- If there **is not** → say so and I will retype the entity. This is the single
  change most likely to affect local ranking, in either direction.

**2. The Google rating is hard-coded.** `src/data/trust.ts` carries
`rating: 5, reviewCount: 5`. It is not fetched, so it will silently go stale the
next time someone reviews you. It is shown visibly with a link to the real
profile and is **not** claimed in `AggregateRating` schema, which is the correct
and conservative choice — self-serving review markup is a policy risk and I would
not add it. Confirm the numbers are current, and tell me whenever they change.

**3. `clientCount: 50` is set but nothing renders it.** No "50 clients" claim is
anywhere on the site. Left in place rather than deleted, but flagged: if it is
ever wired up it becomes a business statistic that needs to be defensible.

**4. Which insight posts have actually been revised since publication?**
`dateModified` is now emitted only for posts carrying an explicit `updated` date,
and none do. If you have genuinely rewritten a post — new figures, a corrected
section — tell me which and when, and I will set it. A freshness signal is only
worth having if it is true.

**5. `readingMinutes` on each post is authored, not computed.** If any are wrong
the estimate misleads. Say the word and I will compute them from word count
instead.

**6. The Arabic pages are pending a native-speaker review.** They are live and
indexed with `hreflang`. `src/data/servicePagesAr.ts` also notes the copy uses
first-person plural (نحن) while the English site is first-person singular — the
two read as different businesses. That conversion belongs in the same review, not
in a mechanical find-and-replace.

**7. Prices.** Every published figure and the charity rate are asserted by
`npm run check:pricing`, so they are internally consistent. Confirm they are still
what you charge.

**8. The visit counter** (P2-4). It is honest — it renders nothing rather than a
zero when the store is unavailable — but "N visits this month" is a weak signal
sitting next to independent since 2019, a real Google rating and four documented
case studies. My recommendation is to drop it. Your call; I have not touched it.

**9. Case-study client names.** All four are named publicly and already live, so I
have assumed consent. Say if any should be anonymised.

## How the numbers were taken

- **Metadata, headings, schema, hreflang:** a Python pass over every
  `dist/**/index.html`, parsing `<title>`, `<meta>`, `<link rel=canonical|alternate>`,
  all headings in document order, and every `application/ld+json` block.
- **FAQ visibility:** schema questions matched against the page's visible text with
  `<script>` stripped.
- **Page heights, tap targets, text size, overflow:** headless Chromium
  (Playwright) at 1880×900, 1536×864, 1440×900, 1280×800, 1280×720 and 390×844.
- **Measured later, in the Performance section below** (lab, not field): LCP, CLS,
  per-route transfer weight and image weight. Still not measured: Lighthouse, JS/CSS
  bundle deltas, automated axe checks. The sandbox has no browser egress to the
  live site, so no field data was available and none is claimed.

---

## One-screen fit at laptop widths

The brief asked for every page to fit one screen. It did at 1880 and 1536; below
that it did not, and the measurements that said otherwise had been taken at
1880×900 only.

**The consent banner was the first thing found.** It sits in flow at the end of
the document, so on a **first** visit it added 84px to every page and put a
scrollbar on layouts built to fit exactly. Every height below is therefore taken
with consent already answered, which is the state a visitor is in from their
second page view on; the banner is also tighter at `board` now.

Everything changed here is scoped to the `board` breakpoint (≥1180px), where
vertical room is the scarce resource. Nothing below it moved, and the mobile
rails, tap targets and stacking are untouched.

| Page | Was (1280×800) | Now | Was (1440×820) | Now |
| --- | --- | --- | --- | --- |
| `/` | 949 | **801** | 879 | **820** |
| `/ar` | 975 | **800** | 880 | **820** |
| `/starter` | 956 | **806** | 897 | **820** |
| `/about` | 953 | **807** | 885 | **820** |
| `/contact` | 1241 | **800** | 1016 | **820** |
| `/ai-lab` | 1043 | 877 | 964 | **820** |
| `/services` | 850 | **800** | 837 | **820** |
| the other six | fit | fit | fit | fit |

**13/13 fit at 1536×864 and 1880×900. 13/13 at 1440×820. 12/13 at 1280×800.**

What moved:

- **`PageHeader`** — from `board` up the actions sit on the eyebrow's row and the
  title spans the full width beneath. Beside the title they were taking ~350px of
  a 908px header, pushing short headings onto extra lines: 48px of height bought
  with a row only 46px tall. `/ar`'s title went 3 lines → 2, `/starter`'s 2 → 1.
- **`/contact`, −441px.** The page grid gave the contact panel 636px, which its
  own two-column split turned into 253px columns; the "What happens next" and
  "You walk away with" lists were then two columns inside 253px, so every cell
  wrapped to five lines. One column each at `board` was worth 176px on its own.
  The panel split also went `1fr 1fr` → `1.1fr 0.9fr`: the pitch column carries
  nine blocks and the form seven fields, and an even split starved the wrong one.
  The form still gets 227px and the FAQ 269px.
- **`/ai-lab`** is the one that does not fit at 1280. Its board carries a flagship
  card with a real description plus all 37 tool names as a text index, and the
  pills are already at 10.88px — shrinking them further would cost legibility for
  77px. Tested and rejected: 3, 5 and 6-column grids (all taller), spanning the
  largest card (taller), and dropping the pill chrome entirely (883px, still
  over). It fits from 1440 up.
- **Shared tightening at `board`:** panel padding and gaps, board container
  padding, action-button height, tab-strip height, the AI Lab pill padding, and
  the Home hero CTA.

Two things this does **not** claim: pages still scroll at 1180 (the narrowest
`board` width, where there is simply less room), and mobile still scrolls, which
is the intended behaviour there.

---

## Regression guard

Every rule below was a real bug in this repo, found by hand, and every one of them
is invisible while it is happening: the page renders, the build passes, and the
damage only shows in a search result or a screen reader weeks later. They are now
asserted against `dist/` by `scripts/check-seo.mjs`, wired into `npm run build`,
so none of them can ship a second time.

| Assertion | The bug it guards against |
| --- | --- |
| `<title>` ≤ 60 chars | 8 titles ran past what Google shows |
| description ≤ 160 chars | 7 descriptions ran past it |
| description does not end in `...` | a hard `.slice(0, 160)` ended a case study on "and convers" |
| no duplicate title across indexable routes | — |
| no duplicate description across indexable routes | 4 case studies shared one description |
| `<title>`, description and canonical all present | — |
| exactly one `<h1>` per route | — |
| the outline opens with the `h1` | the profile rail's `<h2>` opened all 47 |
| no skipped heading level | one hard-coded `<h3>` in `Panel` made 10 routes jump h1 → h3 |

Checked against `dist/` rather than the source, because the source is not what
ships. `noindex` routes are exempt from the duplicate checks — they are not
competing for anything.

**Verified by planting the bugs back in.** A too-long title, a removed `h1`, a
heading skip, an over-length description and a truncated one produced five named
failures and a non-zero exit; a duplicated title produced its own. The check went
back to green the moment the files were restored.

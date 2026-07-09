# Analytics & conversion tracking

The site already emits the events below. This guide is the one-time setup to turn
them into **measurable conversions** in GA4 so you can see what actually drives
booked audits.

## Events the site fires

Defined in `src/lib/analytics.ts` (a thin `gtag` wrapper) and wired up via
delegated click tracking + the contact form:

| Event | When it fires | Params |
|-------|---------------|--------|
| `generate_lead` | Contact form submitted successfully | `method` (`formspree`), `page` |
| `cta_book_audit` | Any "Book a free audit" / `#contact` link clicked | `location`, `label` |
| `whatsapp_click` | Any WhatsApp link/button tapped | `location`, `label` |
| `demo_engage` | First interaction with an AI Lab demo widget | `demo` |
| `demo_cta` | "Build this for my business" clicked on a demo card | `demo` |
| `ai_lab_filter` | AI Lab category filter changed | `category` |
| `email_copy` | Hero email address copied to clipboard | `location` |

`generate_lead` is the real conversion. `cta_book_audit` and `whatsapp_click`
are intent signals (top of the funnel).

The contact form now also sends two hidden fields to Formspree on every lead —
`page` and `referrer` — so each enquiry email tells you which page and source it
came from.

## One-time GA4 setup (≈10 minutes)

GA4 property: `G-N8FX3F1CZ1` (loaded in `index.html`, consent-gated).

1. **Mark key events** — GA4 → *Admin → Events → Key events*. Toggle
   `generate_lead`, `cta_book_audit`, and `whatsapp_click` to "Mark as key event".
   (Allow ~24h for them to appear after the first occurrences.)
2. **Build the funnel** — *Explore → Funnel exploration*. Steps:
   `page_view` → `cta_book_audit` → `generate_lead`. Add `whatsapp_click` as an
   alternative final step. This shows where people drop off.
3. **Segment by landing page** — break the funnel down by `page` (or landing
   page) to see which routes convert (home vs. a service page vs. /portfolio).
4. **Mark up Google Ads / Search Console** — if running ads, import
   `generate_lead` as a conversion in Google Ads.

## Microsoft Clarity (heatmaps + recordings)

Clarity ID `x0f7gwiena` loads only after cookie consent. Use it to:
- Watch session recordings of visitors who **bounced** on the homepage.
- Check the **scroll heatmap** to see how far down the (long) homepage people get
  — if most never reach a section, cut or move it up.
- Filter recordings to sessions with a `generate_lead` to see the winning path.

## Testing the events

In the browser console on the live site (after accepting cookies):
```js
// should log the gtag dataLayer pushes
window.dataLayer.filter(x => x[0] === 'event')
```
Or use GA4 → *Admin → DebugView* with the GA Debugger extension on.

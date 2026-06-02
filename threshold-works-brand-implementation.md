# Threshold Works by Xerxes Duane — Brand Implementation Spec

**For:** Claude Code (identity assets + website), plus a Google Business Profile section to apply by hand.
**Brand:** Threshold Works (primary), endorsed by founder Xerxes Duane.
**Source logo:** /brand existing icon (doorway mark on dark rounded square).

> How to use: place in repo root and tell Claude Code: "Read threshold-works-brand-implementation.md and implement parts 1 to 7. Part 8 I will apply in Google Business Profile myself."

---

## 1. Brand architecture and the golden rule

This is an endorsed brand. **Threshold Works** is the business. **Xerxes Duane** is the named founder who endorses it.

**Golden rule:** the business name is "Threshold Works" in every structured name field. "by Xerxes Duane" is an endorsement used only in human-facing, marketing contexts. This keeps NAP (name, address, phone) consistent for local SEO while still giving you the personal trust where it converts.

### Name usage matrix

| Context | Use |
| --- | --- |
| Google Business Profile name field | Threshold Works |
| Directory / citation name fields | Threshold Works |
| Invoices, legal, contracts (entity name) | Threshold Works |
| Social handles and display names | Threshold Works |
| Favicon, app icon | Threshold Works (mark only) |
| Website header logo | Lockup: mark + "Threshold Works", with "by Xerxes Duane" small |
| Website About, proposals, email signature, bios | Full endorsement: "Threshold Works by Xerxes Duane" |
| Personal LinkedIn, author bylines, speaking | Xerxes Duane (links back to Threshold Works) |

Never make "by Xerxes Duane" equal to or larger than "Threshold Works." It is always the secondary line.

---

## 2. Color palette (exact, sampled from the logo)

| Token | Hex | RGB | Use |
| --- | --- | --- | --- |
| Near-black | `#0B0F0D` | 11, 15, 13 | Primary background, dark-bg text base |
| Gold | `#DAA442` | 218, 164, 66 | Accent, inner arch, endorsement line, CTAs |
| Cream | `#F3EFE6` | 243, 239, 230 | Wordmark and outer arch on dark backgrounds |

Rules: gold is the accent, never the dominant fill. Cream is for dark backgrounds only (it disappears on white). On light backgrounds, swap cream for near-black. Maintain WCAG AA contrast for any body text.

---

## 3. Typography

- Use the website's existing heading typeface for the wordmark, so the logo and site agree.
- If establishing fresh, default to a geometric humanist sans: **Sora** or **Plus Jakarta Sans** (both free, Google Fonts).
- Wordmark "Threshold Works": SemiBold, normal tracking.
- Endorsement "by Xerxes Duane": same family, Regular/Medium, letter-spacing +6 to +10%, set in gold.
- Keep to one type family across the lockup; create contrast with weight and size, not a second font.

---

## 4. Logo system (variants to produce)

Keep the existing doorway mark as the core symbol. Produce these:

1. **App icon / favicon:** doorway mark inside the dark rounded-square container (existing). Export at all sizes in part 6.
2. **Bare mark:** the doorway lines only, no container, transparent background (for flexible placement).
3. **Horizontal lockup:** bare mark + "Threshold Works" wordmark to the right.
4. **Horizontal lockup with endorsement:** as above, with "by Xerxes Duane" set small beneath the wordmark, left-aligned to the wordmark's left edge.
5. **Stacked lockup:** mark on top, "Threshold Works" beneath, "by Xerxes Duane" under that, all centered. For square-ish placements.
6. **Wordmark only:** "Threshold Works" (for very tight spaces).
7. **Monochrome set:** the full lockup in a single color: all near-black (for light backgrounds), all cream/white (for dark), and an all-gold version for special uses.
8. **Light-background mark:** a recolored mark where the outer arch is near-black `#0B0F0D` and the inner arch stays gold, so it is legible on white. Never place the cream mark on a light background.

---

## 5. Lockup construction rules

- **Hierarchy:** "Threshold Works" is primary (largest). "by Xerxes Duane" is roughly 40 to 50% of the wordmark's cap height, lighter, in gold.
- **Clear space:** define X = cap height of "Threshold Works." Keep at least 0.5X of empty space on all sides of the full lockup.
- **Mark-to-wordmark gap (horizontal):** about 0.4 to 0.5 times the mark's width.
- **Vertical alignment (horizontal lockup):** center the mark against the wordmark's cap-height-to-baseline block.
- **Minimum sizes:** horizontal lockup not below 120px wide on screen (about 25mm print). Below that, use the bare mark only. Favicon uses the mark only.

### Color by background

- On dark `#0B0F0D` or dark photos: wordmark cream `#F3EFE6`, endorsement gold `#DAA442`, mark as-is (cream + gold).
- On white or light: wordmark near-black `#0B0F0D`, endorsement gold, use the light-background mark from 4.8.
- Single-color contexts (stamp, fax, embroidery): use one monochrome version from 4.7.

### Do not

- Stretch, skew, rotate, or recolor outside the three tokens.
- Add shadows, gradients, or outlines.
- Place the cream mark or cream wordmark on a light background.
- Let the endorsement line rival the wordmark in size or weight.
- Crowd the lockup below the clear-space minimum.

---

## 6. Export deliverables and folder structure

Produce SVG masters (vector) plus PNG exports with transparent backgrounds.

```
/brand
  /icon
    icon.svg                  (mark in dark container)
    icon-bare.svg             (mark only, transparent)
    icon-light.svg            (light-bg mark: dark outer arch + gold inner)
  /logo
    logo-horizontal.svg
    logo-horizontal-endorsed.svg
    logo-stacked-endorsed.svg
  /wordmark
    wordmark.svg
  /mono
    logo-black.svg
    logo-cream.svg
    logo-gold.svg
  /favicon
    favicon.ico              (16, 32, 48)
    icon-180.png             (apple-touch-icon)
    icon-192.png
    icon-512.png
    icon-720.png             (Google Business Profile logo, 1:1)
  og-image.png               (existing, 1200x630, keep)
```

PNG exports for web lockups at 1x, 2x, 3x. All PNGs trimmed with transparent background.

---

## 7. Website changes (xerxesduane.com)

- **Header:** replace the current logo with `logo-horizontal-endorsed.svg` (cream/gold on the dark header). Link it to home.
- **Hero:** brand name stays "Threshold Works." No change to the positive headline already specified in the NLP copy revisions.
- **About section:** lead with Xerxes Duane. Add the founder photo, the personal and honest, faith-driven story, and the line that clients work directly with you. This is where the endorsement earns its place.
- **Footer:** "Threshold Works by Xerxes Duane · Dubai, UAE" plus phone, email, and service-area note. Use the cream monochrome lockup.
- **Favicon and touch icons:** wire up the files from /brand/favicon in the `<head>`.
- **Meta description:** add the founder, e.g. "... built honestly for small businesses in Dubai. Founded by Xerxes Duane. Book a free systems audit."
- **Structured data (JSON-LD):** add to the homepage `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Threshold Works",
  "founder": { "@type": "Person", "name": "Xerxes Duane" },
  "url": "https://www.xerxesduane.com/",
  "image": "https://www.xerxesduane.com/brand/og-image.png",
  "telephone": "+971543281995",
  "email": "hi@xerxesduane.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "areaServed": { "@type": "City", "name": "Dubai" },
  "description": "Dubai tech studio for small businesses: websites, web and mobile apps, Odoo/ERP and CRM, automation, AI, SEO and Google/Meta ads. Founded by Xerxes Duane."
}
```

Validate the JSON-LD before shipping. Keep the existing canonical, geo, and OG tags.

---

## 8. Google Business Profile (apply by hand)

- **Name field:** "Threshold Works" only. Do not add "by Xerxes Duane" here.
- **Description (replace the previous one, under 750 characters):**

> Threshold Works is a Dubai tech studio for small businesses that need big-company systems without a big-company budget. Founded and personally run by Xerxes Duane, it gives you one trusted partner who builds your website, web and mobile apps, Odoo/ERP and CRM, e-commerce, marketing automation and AI workflows, plus SEO and Google and Meta ads. Everything is built honestly, in plain language, with fixed quotes and no lock-in, and you own every account and all your data. Start with a free 60-minute systems audit: we map what you have, show you the quick wins, and hand you a clear plan whether or not you hire us. Serving Dubai and the wider UAE.

- **Logo upload:** use `icon-720.png` (the mark, not the full lockup; the endorsement line is unreadable at logo size).
- Everything else in the GMB optimization pack is unchanged.

---

## 9. Acceptance criteria

- [ ] Every structured name field reads "Threshold Works" only.
- [ ] Endorsement "by Xerxes Duane" appears only in the header lockup, About, footer, signatures, and bios, always secondary in size.
- [ ] All assets use only `#0B0F0D`, `#DAA442`, `#F3EFE6`.
- [ ] Light-background mark exists and is used on light surfaces (cream mark never on white).
- [ ] All lockup variants in part 4 exported as SVG plus transparent PNG, in the part 6 folder structure.
- [ ] GBP logo uses the mark-only 720px file.
- [ ] Homepage JSON-LD validates with `name` Threshold Works and `founder` Xerxes Duane.
- [ ] Favicon and touch icons wired in `<head>`.
- [ ] Footer and meta description name the founder.

# Project skills

UI/UX design skills for this site, committed to the repo so they persist
across machines, accounts, and Claude Code sessions.

| Skill | Version | What it gives you |
|---|---|---|
| `ui-ux-pro-max` | — | BM25 search over 79 styles, 192 palettes, 74 font pairings, 119 UX guidelines, 105 icons, 17 GSAP presets, 22 stacks. Also generates a full design system. |
| `impeccable` | 4.1.3 | 24 design commands (critique, audit, polish, bolder, animate, typeset...) plus an anti-pattern detector. |
| `design-taste-frontend` | — | Anti-slop guidance for landing pages, portfolios, redesigns. Brief inference + variance/motion/density dials. |
| `ui-styling` | 1.0.0 | shadcn/ui + Tailwind components, theming, accessibility, plus canvas design fonts. |

## Usage

    # search the design database
    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>

    # generate a design system (add --persist --output-dir . to save it)
    python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Xerxes Duane"

    # scan for UI anti-patterns
    npx impeccable detect src/components/

`impeccable` can be reinstalled or updated from npm: `npx impeccable install`.
The other three came from a local profile and exist only here — this is
their canonical copy.

Design direction of record: Modern Dark Cinema (via ui-ux-pro-max),
warmed to a Dubai gold + olive palette. See the root README.

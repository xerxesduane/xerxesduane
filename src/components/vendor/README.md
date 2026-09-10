# Vendored third-party components

Components in this folder are adapted from **Magic UI** (https://magicui.design),
MIT licensed — see `LICENSE-magicui.md` for the full notice.

The upstream sources are written for Next.js + Tailwind CSS v4 + `motion/react`
and a `cn()` helper. Each file here notes what was changed to fit this project:
React + Vite, Tailwind CSS v3, `framer-motion`'s `m` (the project mounts
`LazyMotion` in `strict` mode, so `motion.*` is not available), design tokens
instead of hard-coded colours, and `prefers-reduced-motion` handling.

| File | Upstream |
| --- | --- |
| `Marquee.tsx` | `apps/www/registry/magicui/marquee.tsx` |
| `AnimatedBeam.tsx` | `apps/www/registry/magicui/animated-beam.tsx` |

The circular theme reveal in `src/components/ui/ThemeToggle.tsx` follows the
approach of Magic UI's `animated-theme-toggler` (View Transitions API +
`clip-path`), rewritten against this project's `data-theme` + localStorage
preference model rather than the upstream `.dark` class + `theme` key.

Aceternity UI's [Animated Modal](https://ui.aceternity.com/components/animated-modal)
was reviewed. The reel retains the first-party `src/components/ui/Overlay.tsx`
with background inertness, focus trapping, Escape handling and scroll restoration.
No Aceternity source or additional animation dependency is included.

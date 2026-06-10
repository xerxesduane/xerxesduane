import type { Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Shared viewport config so sections reveal once, slightly before fully in view. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/* ---------------------------------------------------------------------------
 * Motion system tokens — one signature feel, reused everywhere.
 * ------------------------------------------------------------------------- */

export const DUR = { fast: 0.2, base: 0.7, slow: 1.0 } as const;

/** Spring configs for pointer-driven motion (cursor follower, magnetic pull). */
export const SPRING = {
  cursor: { stiffness: 350, damping: 32, mass: 0.6 },
  magnetic: { stiffness: 220, damping: 18, mass: 0.4 },
} as const;

/** Word/line mask reveal — pair with an overflow-hidden wrapper. */
export const maskUp: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

/** Stagger tuned for kinetic type (words), tighter than section stagger. */
export const kineticStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

/** Bottom-up clip wipe for media reveals. Animates clip-path only (no layout). */
export const wipeReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: EASE },
  },
};

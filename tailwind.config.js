/**
 * Design tokens — light-first, theme-aware.
 *
 * Every colour resolves to a CSS custom property defined in index.css, as an
 * `R G B` triplet so Tailwind's opacity modifiers (`bg-panel/60`) still work.
 * Flipping `data-theme` on <html> reassigns the triplets, so a single class
 * set renders correctly in both themes — no `dark:` variant needed for colour.
 *
 * Legacy names (ink / cream / gold / muted / olive / sage) are kept and
 * repointed at the new semantics so the pre-existing pages move to the new
 * palette instead of losing their styles.
 */
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ---- surfaces ---- */
        canvas: {
          DEFAULT: token("--c-canvas"),
          sunk: token("--c-canvas-sunk"),
        },
        panel: {
          DEFAULT: token("--c-panel"),
          alt: token("--c-panel-alt"),
        },
        /** Pale-blue wash behind the bento container. */
        wash: {
          DEFAULT: token("--c-wash"),
          strong: token("--c-wash-strong"),
        },

        /* ---- foreground ---- */
        fg: {
          DEFAULT: token("--c-fg"),
          soft: token("--c-fg-soft"),
          faint: token("--c-fg-faint"),
          onSolid: token("--c-fg-on-solid"),
        },

        /* ---- lines ---- */
        line: {
          DEFAULT: token("--c-line"),
          soft: token("--c-line-soft"),
        },

        /* ---- accent ---- */
        accent: {
          DEFAULT: token("--c-accent"),
          soft: token("--c-accent-soft"),
          deep: token("--c-accent-deep"),
          ink: token("--c-accent-ink"),
        },

        /** Solid navy for primary buttons — stays navy in both themes. */
        navy: {
          DEFAULT: token("--c-navy"),
          hover: token("--c-navy-hover"),
        },

        /* ---- legacy aliases, repointed ---- */
        ink: {
          deep: token("--c-canvas"),
          DEFAULT: token("--c-canvas-sunk"),
          surface: token("--c-panel"),
          raised: token("--c-panel-alt"),
        },
        cream: {
          DEFAULT: token("--c-fg"),
          dim: token("--c-fg-soft"),
        },
        gold: {
          DEFAULT: token("--c-accent"),
          soft: token("--c-accent-soft"),
          deep: token("--c-accent-deep"),
        },
        muted: {
          DEFAULT: token("--c-fg-soft"),
          dark: token("--c-fg-faint"),
        },
        olive: {
          DEFAULT: token("--c-navy"),
          light: token("--c-fg-soft"),
          dim: token("--c-navy-hover"),
        },
        sage: token("--c-panel-alt"),
      },

      fontFamily: {
        /* Poppins is the reference's display face — geometric, heavy at 700/800.
           Self-hosted (latin subset) because the CSP is `font-src 'self'`. */
        display: ["Poppins", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Space Mono"', "ui-monospace", "monospace"],
        technical: ['"Space Mono"', '"JetBrains Mono"', "ui-monospace", "monospace"],
        /* Retained so the pre-existing pages keep their faces until restyled. */
        pixel: ['"PP NeueBit"', '"Space Mono"', "ui-monospace", "monospace"],
        mondwest: ["Poppins", "Inter", "ui-sans-serif", "sans-serif"],
      },

      fontSize: {
        /* Oversized hero headline — clamps so it never overflows the shell. */
        hero: ["clamp(2.1rem, 3.5vw, 3.35rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "hero-sm": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        eyebrow: ["0.688rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },

      maxWidth: {
        content: "1200px",
        shell: "1880px",
        prose: "68ch",
      },

      spacing: {
        rail: "20rem",
      },

      borderRadius: {
        card: "1.25rem",
        panel: "1.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      boxShadow: {
        /* Restrained — the reference leans on borders, not drop shadows. */
        card: "0 1px 2px rgb(16 27 51 / 0.04), 0 8px 24px -16px rgb(16 27 51 / 0.16)",
        "card-hover": "0 2px 4px rgb(16 27 51 / 0.05), 0 18px 40px -22px rgb(16 27 51 / 0.24)",
        pill: "0 1px 2px rgb(16 27 51 / 0.06), 0 4px 12px -6px rgb(16 27 51 / 0.14)",
        solid: "0 8px 24px -12px rgb(16 27 51 / 0.45)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatBlob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-5%, 4%) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        scrollCue: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
      },

      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "float-blob": "floatBlob 22s ease-in-out infinite",
        "float-blob-slow": "floatBlob 30s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-glow": "pulseGlow 5s ease-in-out infinite",
        "scroll-cue": "scrollCue 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark canvas — never pure black (avoids OLED smear, feels premium)
        ink: {
          deep: "#07090A",
          DEFAULT: "#0B0F0D",
          surface: "#111813",
          raised: "#16201A",
        },
        // Brand olive — "bayt = home", grounded
        olive: {
          DEFAULT: "#3D4A36",
          light: "#5C6F52",
          dim: "#2A3327",
        },
        // Dubai golden-hour accent
        gold: {
          DEFAULT: "#D9A441",
          soft: "#E8C173",
          deep: "#B8842F",
        },
        sage: "#C7D0BC",
        cream: {
          DEFAULT: "#F4EFE6",
          dim: "#D8D2C4",
        },
        muted: {
          DEFAULT: "#9AA39A",
          dark: "#6E776C",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
        prose: "68ch",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
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

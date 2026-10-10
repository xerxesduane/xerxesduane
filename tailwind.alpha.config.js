/**
 * Tailwind for Alpha Connect (alpha-connect.html, src/alpha/) only.
 *
 * The app was first built on Tailwind 4 with its own palette, which has
 * nothing in common with the site's. src/alpha/alpha.css points here with
 * @config, so the two never share a token, and the site's config skips
 * src/alpha. The values below reproduce Tailwind 4's scale where it differs
 * from 3 (shadow-sm, the radius steps the app redefined, hover only on
 * devices that can hover), so the pages look exactly as they did.
 */
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/alpha/**/*.{ts,tsx}"],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        background: token("--background"),
        foreground: token("--foreground"),
        card: { DEFAULT: token("--card"), foreground: token("--foreground") },
        primary: { DEFAULT: token("--primary"), foreground: token("--primary-foreground") },
        secondary: { DEFAULT: token("--secondary"), foreground: token("--foreground") },
        muted: { DEFAULT: token("--secondary"), foreground: token("--muted-foreground") },
        accent: { DEFAULT: token("--accent"), foreground: token("--foreground") },
        destructive: { DEFAULT: token("--primary"), foreground: token("--destructive-foreground") },
        border: token("--border"),
        input: token("--border"),
        ring: token("--primary"),
        amber: { DEFAULT: token("--amber"), foreground: token("--foreground"), 500: "#f59e0b" },
      },
      borderColor: { DEFAULT: token("--border") },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.75rem",
        md: "0.875rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
    },
  },
};

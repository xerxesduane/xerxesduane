import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { applyTheme, useTheme } from "../../lib/useTheme";
import { useReducedMotionPref } from "../../lib/usePrefs";

interface StartViewTransition {
  startViewTransition?: (cb: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
}

/**
 * Light/dark switch with a circular reveal.
 *
 * The reveal follows the approach of Magic UI's `animated-theme-toggler`
 * (MIT — see components/vendor/LICENSE-magicui.md): take a View Transition
 * snapshot, then animate `clip-path` on `::view-transition-new(root)` outward
 * from the button so the incoming palette wipes over the outgoing one.
 *
 * Rewritten against this project's model rather than dropped in: the theme is
 * a `data-theme` attribute persisted under `xd-theme` (see lib/useTheme), the
 * reveal is scoped with `data-theme-vt` so it can't collide with the
 * cross-document page transition already declared in index.css, and it is
 * skipped entirely under `prefers-reduced-motion` or where the API is missing
 * — in both cases the theme still flips, just instantly.
 *
 * Both glyphs are rendered and one is hidden, so the button's box never
 * changes size between themes and nothing reflows on toggle.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const reduced = useReducedMotionPref();
  const ref = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);

  const next = theme === "dark" ? "light" : "dark";

  const toggle = useCallback(() => {
    const doc = document as Document & StartViewTransition;
    const root = document.documentElement;
    const flip = () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark");

    if (busy.current || root.dataset.themeVt === "active") return;
    if (reduced || typeof doc.startViewTransition !== "function") {
      flip();
      return;
    }

    const button = ref.current;
    const w = window.innerWidth;
    const h = window.innerHeight;
    let x = w / 2;
    let y = h / 2;
    if (button) {
      const box = button.getBoundingClientRect();
      x = box.left + box.width / 2;
      y = box.top + box.height / 2;
    }
    const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
    // Percentages, not px: a `circle()` radius in percent resolves against the
    // snapshot box, which stays correct on fractional display scales.
    const pct = (v: number, of: number) => `${(v / of) * 100}%`;
    const at = `${pct(x, w)} ${pct(y, h)}`;
    const from = `circle(0% at ${at})`;
    const to = `circle(${(radius / (Math.hypot(w, h) / Math.SQRT2)) * 100}% at ${at})`;

    busy.current = true;
    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-clip-from", from);

    const done = () => {
      busy.current = false;
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-clip-from");
    };

    const transition = doc.startViewTransition(() => flushSync(flip));
    transition.finished.then(done, done);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [from, to] },
          {
            duration: 480,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }, [reduced]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-fg-soft shadow-pill transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
    >
      {theme === "dark" ? (
        <Sun size={17} strokeWidth={2} aria-hidden />
      ) : (
        <Moon size={17} strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}

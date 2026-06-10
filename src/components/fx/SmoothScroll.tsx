import { useEffect } from "react";
import type Lenis from "lenis";
import { useFinePointer, useReducedMotionPref } from "../../lib/usePrefs";
import { getLenis, setLenis } from "../../lib/lenisStore";

/** Matches the site's scroll-mt-24 (6rem) anchor offset. */
const ANCHOR_OFFSET = -96;

/**
 * Inertia smooth scrolling via Lenis. Renders nothing — the prerendered HTML
 * is untouched. Active only on fine pointers without reduced-motion, so iOS
 * momentum and accessibility preferences are never overridden. The lenis
 * library is dynamically imported (own chunk, post-hydration).
 */
export default function SmoothScroll() {
  const reduced = useReducedMotionPref();
  const fine = useFinePointer();

  useEffect(() => {
    if (reduced || !fine) return;

    let lenis: Lenis | null = null;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({
        duration: 1.05,
        // expo-out, matching the house EASE feel
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      setLenis(lenis);
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    // Smooth same-page anchor scrolling (#contact, /#contact on home), with
    // the scroll-mt offset. Skip-link and any data-lenis-ignore links keep
    // native jump behavior (better for keyboard users).
    const onClick = (e: MouseEvent) => {
      const active = getLenis();
      if (!active || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!a || a.hasAttribute("data-lenis-ignore") || a.getAttribute("target") === "_blank") return;
      const href = a.getAttribute("href") ?? "";
      let hash = "";
      if (href.startsWith("#")) hash = href;
      else if (href.startsWith("/#") && window.location.pathname === "/") hash = href.slice(1);
      if (!hash || hash === "#") return;
      let el: Element | null;
      try {
        el = document.querySelector(hash);
      } catch {
        return;
      }
      if (!el) return;
      e.preventDefault();
      active.scrollTo(el as HTMLElement, { offset: ANCHOR_OFFSET });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      setLenis(null);
    };
  }, [reduced, fine]);

  return null;
}

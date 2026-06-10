import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { EASE } from "../../lib/motion";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * MPA page-exit choreography. The site navigates with full document loads
 * (no client router), so on internal link clicks we play a ~300ms ink curtain
 * with a gold threshold edge, then navigate; the next page's entrance
 * choreography completes the transition. Browsers with cross-document View
 * Transitions use the native fade instead (see @view-transition in index.css)
 * and this component stays inert. BFCache restores clear the curtain.
 * Skipped under reduced motion. Never rendered server-side (overlay only
 * exists after a click).
 */
export default function PageTransition() {
  const reduced = useReducedMotionPref();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) return;
    // Native cross-document View Transitions cover supported browsers.
    // (typeof check, not `in`, so TS doesn't narrow `document` to never.)
    const supportsVT =
      typeof (document as Document & { startViewTransition?: unknown })
        .startViewTransition === "function";
    if (supportsVT) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!a) return;
      if (
        a.getAttribute("target") === "_blank" ||
        a.hasAttribute("download") ||
        a.hasAttribute("data-no-transition")
      )
        return;
      const href = a.getAttribute("href") ?? "";
      // Internal page navigations only — not hashes, not external URLs.
      if (!href.startsWith("/") || href.startsWith("/#")) return;
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      e.preventDefault();
      setLeaving(true);
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 320);
    };

    const onPageShow = (ev: PageTransitionEvent) => {
      if (ev.persisted) setLeaving(false);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {leaving && (
        <m.div
          key="threshold-wipe"
          aria-hidden
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[85] bg-ink-deep"
        >
          <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
        </m.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { EASE } from "../../lib/motion";
import { useReducedMotionPref } from "../../lib/usePrefs";
import { PRELOADER_ENABLED } from "../../lib/config";

const SEEN_KEY = "tw-intro-seen";
/** Total intro budget: count + wipe stays under ~1s. */
const COUNT_MS = 650;

/**
 * Intro curtain: 0→100 count-up in JetBrains Mono, then a wipe reveals the
 * page. First visit per session only, skipped entirely under reduced motion,
 * never rendered server-side. OFF by default (PRELOADER_ENABLED).
 */
export default function Preloader() {
  const reduced = useReducedMotionPref();
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!PRELOADER_ENABLED || reduced) return;
    let seen = true;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      if (!seen) sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked — skip the intro */
    }
    if (seen) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client-only init; intentional SSR-safe pattern
    setActive(true);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / COUNT_MS);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (!active) return null;

  return (
    <AnimatePresence>
      {!done ? (
        <m.div
          key="curtain"
          className="fixed inset-0 z-[90] flex items-end justify-end bg-ink-deep p-8 sm:p-12"
          exit={{ y: "-100%", transition: { duration: 0.45, ease: EASE } }}
          aria-hidden
        >
          <span className="font-mono text-5xl text-gold tabular-nums sm:text-7xl">
            {n}%
          </span>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

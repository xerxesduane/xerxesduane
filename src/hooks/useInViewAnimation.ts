import { useEffect, useRef, useState } from "react";

/**
 * Scroll-trigger hook for the studio-reference sections: returns a ref plus an
 * `inView` flag that flips true once (threshold 0.1) and never back. Pair with
 * `animate-fade-in-up` / `opacity-0` classes.
 */
export default function useInViewAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // No IO support: reveal on next tick so nothing stays hidden.
      const t = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView } as const;
}

/** Class helper: fade-in-up when in view, hidden (but reserved) before. */
export function fadeClass(inView: boolean) {
  return inView ? "animate-fade-in-up" : "opacity-0";
}

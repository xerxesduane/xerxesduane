import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media-query hook. Uses useSyncExternalStore so the server snapshot
 * (a conservative default) and the client value reconcile without hydration
 * warnings. framer-motion's MotionConfig covers its own animations; these
 * hooks are for everything framer can't see (Lenis, cursor, preloader, rAF).
 */
function useMediaQuery(query: string, serverDefault = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverDefault, [serverDefault]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when the user asks for reduced motion. Server default: false. */
export function useReducedMotionPref(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True only for precise pointers (mouse/trackpad). Server default: false, so
 * pointer-only features (custom cursor, magnetic, Lenis) never render in the
 * prerendered HTML and never run on touch devices.
 */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

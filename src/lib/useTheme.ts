import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** Must match the key used by the pre-paint script in index.html. */
export const THEME_STORAGE_KEY = "xd-theme";

const listeners = new Set<() => void>();

function notify() {
  for (const fn of listeners) fn();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep other tabs in step.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Read from the DOM, which the pre-paint script has already resolved. */
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Prerender always emits the dark palette — it is the brand default. */
function getServerSnapshot(): Theme {
  return "dark";
}

/** Keeps the browser chrome in step with the palette. */
function syncThemeColor(theme: Theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f7f3ea" : "#081827");
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
  syncThemeColor(theme);
  notify();
}

/**
 * Current theme plus a toggle. The value is read from `data-theme` on <html>
 * rather than from state, so it agrees with whatever the pre-paint script
 * decided and never causes a hydration mismatch.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback(() => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);
  return { theme, toggle };
}

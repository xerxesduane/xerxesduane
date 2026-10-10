export function isInIframe(): boolean {
  try { return window.self !== window.top; } catch { return true; }
}
export function isPreviewHost(): boolean {
  const h = window.location.hostname;
  return h.endsWith(".vercel.app") || h === "localhost" || h === "127.0.0.1";
}
export function registerSW() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  // In preview/iframe, unregister any existing SW and bail to avoid stale caches.
  if (isInIframe() || isPreviewHost()) {
    navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => { if (r.active?.scriptURL.endsWith("/alpha-connect-sw.js")) r.unregister(); }));
    return;
  }
  const register = () => navigator.serviceWorker.register("/alpha-connect-sw.js", { scope: "/alpha-connect" }).catch(() => {});
  if (document.readyState === "complete") register();
  else window.addEventListener("load", register, { once: true });
}

export function trackVisit(): number {
  if (typeof window === "undefined") return 0;
  const k = "alpha:visits";
  const n = Number(localStorage.getItem(k) || "0") + 1;
  localStorage.setItem(k, String(n));
  return n;
}

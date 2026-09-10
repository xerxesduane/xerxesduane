import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App";
import { initCtaTracking } from "./lib/analytics";

initCtaTracking();

// Disarm the pre-hydration reveal fallback (see the inline <style> in
// index.html): once the bundle is executing, framer-motion owns the reveals.
document.documentElement.classList.add("js-ready");

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Keep the prerendered page in place: it supplies the first paint and native
// scroll restoration while lazy route code loads. Vite dev has an empty root.
if (container.querySelector("main")) hydrateRoot(container, tree);
else createRoot(container).render(tree);

/**
 * Re-run the browser's scroll-to-fragment.
 *
 * Watch for the target to appear (development routes are lazy chunks, so it is not
 * there on the first frame), scroll to it, then correct once more after
 * `load` in case images changed the layout underneath it. `scrollIntoView`
 * respects each section's `scroll-margin-top`, so the offset matches what an
 * in-page link produces. Any real scroll from the visitor cancels the whole
 * thing — they have said where they want to be.
 */
function scrollToHashTarget() {
  if (window.location.hash.length < 2) return;

  let id: string;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return;
  }

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  window.addEventListener("keydown", cancel, { once: true });

  const deadline = performance.now() + 4000;
  const settle = (el: Element) => {
    el.scrollIntoView({ block: "start", behavior: "auto" });
  };

  const tick = () => {
    if (cancelled) return;
    const el = document.getElementById(id);
    if (el) {
      settle(el);
      window.addEventListener(
        "load",
        () => {
          if (!cancelled) {
            const again = document.getElementById(id);
            if (again) settle(again);
          }
          cancel();
        },
        { once: true },
      );
      return;
    }
    if (performance.now() < deadline) requestAnimationFrame(tick);
    else cancel();
  };
  requestAnimationFrame(tick);
}

scrollToHashTarget();

const speedInsightsRoot = document.createElement("div");
speedInsightsRoot.id = "speed-insights-root";
document.body.appendChild(speedInsightsRoot);
createRoot(speedInsightsRoot).render(<SpeedInsights />);

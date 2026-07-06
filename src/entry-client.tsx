import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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

// The build serves fully prerendered HTML for crawlers and social scrapers.
// Client rendering avoids recoverable hydration mismatches from animation-only
// markup while preserving the static HTML response for SEO.
container.replaceChildren();
createRoot(container).render(tree);

const speedInsightsRoot = document.createElement("div");
speedInsightsRoot.id = "speed-insights-root";
document.body.appendChild(speedInsightsRoot);
createRoot(speedInsightsRoot).render(<SpeedInsights />);

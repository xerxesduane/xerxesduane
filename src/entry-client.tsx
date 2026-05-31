import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <App path={window.location.pathname} />
    <SpeedInsights />
  </StrictMode>
);

// Prerendered HTML (production) has real content to hydrate; the dev server
// serves an empty shell, so client-render there to avoid hydration mismatch.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}

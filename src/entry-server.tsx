import { renderToString } from "react-dom/server";
import App from "./App";
import { buildHeadTags } from "./lib/seo";

export { allRoutes } from "./lib/seo";

/** Called by scripts/prerender.mjs for each route at build time. */
export function render(path: string): { html: string; head: string } {
  const html = renderToString(<App path={path} />);
  const head = buildHeadTags(path);
  return { html, head };
}

// Prerenders every route to a static HTML file in dist/ so crawlers and
// social scrapers receive the full, rendered page instead of an empty shell.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const distDir = join(root, "dist");
const serverEntry = join(root, ".ssr-dist", "entry-server.js");

const { render, allRoutes } = await import(pathToFileURL(serverEntry).href);

const template = await readFile(join(distDir, "index.html"), "utf-8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("Template is missing the <!--app-html--> placeholder.");
}

const routes = allRoutes();
for (const route of routes) {
  const { html, head } = render(route);
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);

  const outPath =
    route === "/"
      ? join(distDir, "index.html")
      : join(distDir, route, "index.html");

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, page, "utf-8");
  console.log(`  prerendered  ${route}  ->  ${outPath.replace(root, ".")}`);
}

console.log(`\nPrerendered ${routes.length} route(s).`);

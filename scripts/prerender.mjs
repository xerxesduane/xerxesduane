// Prerenders every route to a static HTML file in dist/ so crawlers and
// social scrapers receive the full, rendered page instead of an empty shell.
// Also emits a 404.html and a freshly-dated sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_ORIGIN = "https://www.xerxesduane.com";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const distDir = join(root, "dist");
const serverEntry = join(root, ".ssr-dist", "entry-server.js");

const { render, allRoutes, routeLastmod } = await import(pathToFileURL(serverEntry).href);

const template = await readFile(join(distDir, "index.html"), "utf-8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("Template is missing the <!--app-html--> placeholder.");
}

const routes = allRoutes();
for (const route of routes) {
  const { html, head } = await render(route);
  let page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);

  // Arabic routes render right-to-left in Arabic.
  if (route === "/ar" || route.startsWith("/ar/")) {
    page = page.replace('<html lang="en">', '<html lang="ar" dir="rtl">');
  }

  const outPath =
    route === "/"
      ? join(distDir, "index.html")
      : join(distDir, route, "index.html");

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, page, "utf-8");
  console.log(`  prerendered  ${route}  ->  ${outPath.replace(root, ".")}`);
}

// 404 page (Vercel serves /404.html for unmatched routes, with a 404 status).
const notFound = await render("/__not-found__");
const notFoundPage = template
  .replace("<!--app-head-->", notFound.head)
  .replace("<!--app-html-->", notFound.html);
await writeFile(join(distDir, "404.html"), notFoundPage, "utf-8");
console.log("  prerendered  404  ->  ./dist/404.html");

// Sitemap, freshly dated each build.
const today = new Date().toISOString().slice(0, 10);
const indexableRoutes = routes;
const urls = indexableRoutes
  .map((route) => {
    const loc = route === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
    const priority = route === "/" ? "1.0" : "0.8";
    const lastmod = routeLastmod(route, today);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf-8");
console.log(`  generated    sitemap.xml (${indexableRoutes.length} urls, ${today})`);

console.log(`\nPrerendered ${routes.length} route(s) + 404.`);

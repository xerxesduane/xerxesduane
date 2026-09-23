// Asserts the prerendered HTML still holds the invariants the SERP and screen
// readers depend on.
//
// Run: npm run check:seo  (also runs as part of npm run build)
//
// Why this exists. Every rule below was a real bug in this repo, found by hand,
// and every one of them is invisible: the page renders, the build passes, and
// the damage only shows up in a search result or a screen reader weeks later.
//
//   - Ten routes jumped h1 -> h3 because one shared card component hard-coded
//     its heading level.
//   - All 47 routes opened their outline with the site name, because the
//     profile rail rendered it as an h2.
//   - Eight titles ran past what Google shows, and a hard `.slice(0, 160)` on
//     the generated case-study descriptions ended one on "...and convers".
//   - Four case studies shared one description, so Google had four pages it
//     could not tell apart.
//
// Checked against dist/, not the source, because the source is not what ships.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

/** Google cuts the title near 600px, roughly 60 characters at typical widths. */
const TITLE_MAX = 60;
/** Descriptions past this are truncated in the result, so they should not exist. */
const DESCRIPTION_MAX = 160;

const fail = [];
const check = (ok, message) => {
  if (!ok) fail.push(message);
};

const pages = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry === "index.html") pages.push(full);
  }
};
walk(dist);

if (pages.length === 0) {
  console.error("check:seo — no prerendered pages found in dist/. Run the build first.");
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

const titles = new Map();
/** Routes marked unlisted (noindex + nosnippet), and every page's HTML. */
const unlisted = [];
const htmlByRoute = new Map();
const descriptions = new Map();

for (const file of pages) {
  const route = "/" + relative(dist, file).replace(/index\.html$/, "").replace(/\/$/, "");
  const html = readFileSync(file, "utf8");

  const titleMatch = html.match(/<title>(.*?)<\/title>/s);
  const descMatch = html.match(/<meta name="description" content="(.*?)"/s);
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/s);
  const robots = html.match(/<meta name="robots" content="(.*?)"/s);
  const noindex = (robots?.[1] ?? "").includes("noindex");
  htmlByRoute.set(route, html);
  if (noindex && (robots?.[1] ?? "").includes("nosnippet")) unlisted.push(route);

  check(Boolean(titleMatch), `${route}: no <title>`);
  check(Boolean(descMatch), `${route}: no meta description`);
  check(Boolean(canonical), `${route}: no canonical link`);
  if (!titleMatch || !descMatch) continue;

  const title = decode(titleMatch[1]);
  const description = decode(descMatch[1]);

  check(
    title.length <= TITLE_MAX,
    `${route}: title is ${title.length} chars, over ${TITLE_MAX} — "${title}"`,
  );
  check(
    description.length <= DESCRIPTION_MAX,
    `${route}: description is ${description.length} chars, over ${DESCRIPTION_MAX}`,
  );
  // A description that trails off mid-thought is a truncation that escaped the
  // clamp in src/lib/seo.ts rather than a sentence someone wrote that way.
  check(
    !description.endsWith("..."),
    `${route}: description is cut short — "...${description.slice(-40)}"`,
  );

  // Indexable pages must be distinguishable from each other. 404 and any
  // noindex route are exempt: they are not competing for anything.
  if (!noindex) {
    if (titles.has(title)) fail.push(`${route}: title duplicates ${titles.get(title)} — "${title}"`);
    else titles.set(title, route);
    if (descriptions.has(description)) {
      fail.push(`${route}: description duplicates ${descriptions.get(description)}`);
    } else descriptions.set(description, route);
  }

  // Heading outline. The rail, the header and the boards all contribute
  // headings, so this only holds if every one of them behaves.
  const levels = [...html.matchAll(/<h([1-6])[ >]/g)].map((m) => Number(m[1]));
  const h1Count = levels.filter((l) => l === 1).length;
  check(h1Count === 1, `${route}: has ${h1Count} <h1> elements, expected exactly 1`);
  check(
    levels.length === 0 || levels[0] === 1,
    `${route}: outline opens with h${levels[0]} before its h1`,
  );
  let previous = 0;
  for (const level of levels) {
    if (previous && level > previous + 1) {
      fail.push(`${route}: heading level skips h${previous} -> h${level}`);
      break;
    }
    previous = level;
  }
}

// Unlisted pages only stay unlisted while nothing advertises them: not the
// sitemap, and not a link from any other page a crawler can follow.
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
for (const route of unlisted) {
  check(!sitemap.includes(`${route}</loc>`), `${route}: unlisted but listed in sitemap.xml`);
  for (const [other, html] of htmlByRoute) {
    if (other === route) continue;
    check(
      !new RegExp(`href="(https://www\\.xerxesduane\\.com)?${route}["/#?]`).test(html),
      `${route}: unlisted but linked from ${other}`,
    );
  }
}

if (fail.length) {
  console.error(`check:seo — ${fail.length} problem(s) across ${pages.length} prerendered routes:\n`);
  for (const message of fail) console.error(`  ✗ ${message}`);
  process.exit(1);
}

console.log(`check:seo — ${pages.length} routes OK (titles, descriptions, canonicals, heading outline).`);

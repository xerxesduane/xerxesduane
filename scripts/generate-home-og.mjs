import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Renders the home/default social share card (public/og-image.svg) to the
// 1200x630 PNG referenced by the OG/Twitter meta tags. Run: node scripts/generate-home-og.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "og-image.svg"), "utf-8");

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
})
  .render()
  .asPng();

const out = join(root, "public", "brand", "og-image.png");
writeFileSync(out, png);
console.log(`  brand/og-image.png  (${(png.length / 1024).toFixed(0)} KB)`);

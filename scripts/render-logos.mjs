import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const out = join(pub, "brand");
mkdirSync(out, { recursive: true });

// [source svg, output png, render width in px]
const jobs = [
  // app / favicon tile (rounded ink square)
  ["favicon.svg", "icon-1024.png", 1024],
  ["favicon.svg", "icon-512.png", 512],
  ["favicon.svg", "icon-192.png", 192],
  ["favicon.svg", "apple-touch-icon.png", 180],
  ["favicon.svg", "favicon-32.png", 32],
  ["favicon.svg", "favicon-16.png", 16],
  // mark only — transparent
  ["logo-mark.svg", "mark-dark-1024.png", 1024],
  ["logo-mark.svg", "mark-dark-512.png", 512],
  ["logo-mark-ink.svg", "mark-ink-1024.png", 1024],
  ["logo-mark-ink.svg", "mark-ink-512.png", 512],
  // horizontal lockups — transparent
  ["logo-full.svg", "logo-full-dark-1600.png", 1600],
  ["logo-full.svg", "logo-full-dark-800.png", 800],
  ["logo-full-ink.svg", "logo-full-ink-1600.png", 1600],
  ["logo-full-ink.svg", "logo-full-ink-800.png", 800],
  // social card
  ["og-image.svg", "og-image.png", 1200],
];

let count = 0;
for (const [src, dst, width] of jobs) {
  const svg = readFileSync(join(pub, src), "utf-8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true },
    background: "rgba(0,0,0,0)",
  });
  const png = resvg.render().asPng();
  writeFileSync(join(out, dst), png);
  const { width: w, height: h } = resvg.render();
  console.log(`  ${dst.padEnd(26)} ${png.length.toString().padStart(7)} bytes`);
  count++;
}
console.log(`\nDone — ${count} PNGs written to public/brand/`);

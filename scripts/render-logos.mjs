import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const brand = join(pub, "brand");

function render(svgPath, width) {
  const svg = readFileSync(svgPath, "utf-8");
  return new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true },
    background: "rgba(0,0,0,0)",
  })
    .render()
    .asPng();
}

mkdirSync(join(brand, "favicon"), { recursive: true });

// ---- Favicon / app-icon set (from the dark-container icon) ----
const iconSvg = join(brand, "icon", "icon.svg");
const faviconJobs = [
  ["favicon/icon-720.png", 720], // Google Business Profile logo (1:1)
  ["favicon/icon-512.png", 512],
  ["favicon/icon-192.png", 192],
  ["favicon/icon-180.png", 180], // apple-touch-icon
  ["favicon/favicon-48.png", 48],
  ["favicon/favicon-32.png", 32],
  ["favicon/favicon-16.png", 16],
];
for (const [out, w] of faviconJobs) {
  writeFileSync(join(brand, out), render(iconSvg, w));
  console.log(`  ${out.padEnd(28)} ${w}px`);
}

// favicon.ico (16, 32, 48)
const ico = await pngToIco([16, 32, 48].map((s) => join(brand, "favicon", `favicon-${s}.png`)));
writeFileSync(join(brand, "favicon", "favicon.ico"), ico);
console.log("  favicon/favicon.ico          16/32/48");

// ---- Lockup PNG exports at 1x / 2x / 3x (transparent) ----
const lockups = [
  ["logo/logo-horizontal.svg", "logo/logo-horizontal", 440],
  ["logo/logo-horizontal-endorsed.svg", "logo/logo-horizontal-endorsed", 440],
  ["logo/logo-stacked-endorsed.svg", "logo/logo-stacked-endorsed", 360],
  ["wordmark/wordmark.svg", "wordmark/wordmark", 300],
  ["mono/logo-cream.svg", "mono/logo-cream", 440],
  ["mono/logo-black.svg", "mono/logo-black", 440],
  ["mono/logo-gold.svg", "mono/logo-gold", 440],
  ["icon/icon-bare.svg", "icon/icon-bare", 256],
  ["icon/icon-light.svg", "icon/icon-light", 256],
];
for (const [src, outBase, base] of lockups) {
  for (const [suffix, mult] of [["", 1], ["@2x", 2], ["@3x", 3]]) {
    writeFileSync(join(brand, `${outBase}${suffix}.png`), render(join(brand, src), base * mult));
  }
  console.log(`  ${outBase}.png (1x/2x/3x)`);
}

// ---- Social card ----
writeFileSync(join(brand, "og-image.png"), render(join(pub, "og-image.svg"), 1200));
console.log("  og-image.png                 1200px");

console.log("\nBrand assets exported to /public/brand");

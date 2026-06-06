import sharp from "sharp";
import { readFile, writeFile, readdir, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// One-time normaliser for raw client logos. Trims surrounding whitespace and
// resizes each to a uniform height on a transparent canvas, with clean names.
// Run: node scripts/process-client-logos.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "brand", "clients");

// source file -> clean slug
const MAP = {
  "al-mumtaz-logo.jpeg": "al-mumtaz",
  "aya home spa logo.webp": "aya-home-spa",
  "blocktec logo.png": "blocktec",
  "caronic logo.jpeg": "caronic",
  "gilani motors.png": "gilani-motors",
  "gilani-mobility.png": "gilani-mobility",
  "keystone_events_logo.jpeg": "keystone-events",
  "weaspire-logo.png": "we-aspire",
  "wellington cash for cars logo.png": "wellington",
};

const TARGET_H = 96; // 2–3x the ~32px display height for crisp retina rendering

for (const [src, slug] of Object.entries(MAP)) {
  const input = await readFile(join(dir, src));
  const out = await sharp(input)
    .trim({ threshold: 18 }) // remove uniform (white/transparent) borders
    .resize({ height: TARGET_H, fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();
  await writeFile(join(dir, `${slug}.png`), out);
  console.log(`  ${src}  ->  ${slug}.png  (${(out.length / 1024).toFixed(0)} KB)`);
}

// Remove the original (messy-named) sources so we don't ship duplicates.
const keep = new Set([...Object.values(MAP).map((s) => `${s}.png`), "README.md"]);
for (const f of await readdir(dir)) {
  if (!keep.has(f)) {
    await unlink(join(dir, f));
    console.log(`  removed  ${f}`);
  }
}
console.log("Client logos processed.");

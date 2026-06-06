import sharp from "sharp";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Makes near-white logo backgrounds transparent, then re-trims/resizes.
// Also writes a side-by-side preview (on light + dark) for visual QA.
// Run: node scripts/transparent-logos.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "brand", "clients");
const THRESHOLD = 238; // pixels lighter than this (all channels) become transparent
const H = 96;

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

const processed = [];
for (const f of files) {
  const input = await readFile(join(dir, f));
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] >= THRESHOLD && data[i + 1] >= THRESHOLD && data[i + 2] >= THRESHOLD) {
      data[i + 3] = 0; // transparent
    }
  }
  const out = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 5 })
    .resize({ height: H, fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();
  await writeFile(join(dir, f), out);
  processed.push({ f, buf: out });
  console.log(`  ${f}  (${(out.length / 1024).toFixed(0)} KB)`);
}

// ---- Preview composite (not shipped) ----
async function band(bg) {
  const pad = 40, gap = 40, h = 120;
  const tiles = await Promise.all(
    processed.map(({ buf }) => sharp(buf).resize({ height: 56, fit: "inside" }).png().toBuffer()),
  );
  const metas = await Promise.all(tiles.map((b) => sharp(b).metadata()));
  const widths = metas.map((m) => m.width);
  const totalW = pad * 2 + widths.reduce((a, b) => a + b, 0) + gap * (tiles.length - 1);
  let x = pad;
  const composites = tiles.map((b, i) => {
    const c = { input: b, left: Math.round(x), top: Math.round((h - 56) / 2) };
    x += widths[i] + gap;
    return c;
  });
  return sharp({ create: { width: Math.round(totalW), height: h, channels: 4, background: bg } })
    .composite(composites)
    .png()
    .toBuffer();
}
const light = await band({ r: 243, g: 239, b: 230, alpha: 1 });
const dark = await band({ r: 11, g: 15, b: 13, alpha: 1 });
const lm = await sharp(light).metadata();
const dm = await sharp(dark).metadata();
const W = Math.max(lm.width, dm.width);
const preview = await sharp({ create: { width: W, height: lm.height + dm.height, channels: 4, background: { r: 60, g: 60, b: 60, alpha: 1 } } })
  .composite([{ input: light, top: 0, left: 0 }, { input: dark, top: lm.height, left: 0 }])
  .png()
  .toBuffer();
await writeFile(join(root, "logo-preview.png"), preview);
console.log("Preview written to logo-preview.png (top: light band, bottom: dark)");

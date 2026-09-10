import sharp from "sharp";
import { readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(root, "work-raw");
const OUT = join(root, "public/work");
const MANIFEST = join(root, "src/data/workItems.ts");
// Descriptive titles verified against the existing archive screenshots.
const WEB_TITLES = JSON.parse(readFileSync(join(root, "scripts/web-project-titles.json"), "utf8"));

// Drop raw originals here (gitignored). Run: npm run images
const CATS = [
  { key: "web", label: "Web Design", featured: 4 },
  { key: "graphic", label: "Graphic Design", featured: 4 },
];
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Optional per-image metadata, keyed by raw filename stem (without extension).
// Items with an href render a "Live site" link in the portfolio.
const META = {
  "01-we-aspire": { title: "We Aspire · E-learning platform, Dubai", href: "https://www.weaspire.ae/" },
  "02-gilani-mobility": { title: "Gilani Mobility · E-commerce, Dubai", href: "https://www.gilanimobility.ae/" },
  "03-aya-home-spa": { title: "AYA Home Spa · Dubai", href: "https://www.ayahomespa.ae/" },
  // HIDDEN (re-add later): move 04-fellowship-dubai.png back into _raw/web and restore this line:
  // "04-fellowship-dubai": { title: "Fellowship Dubai · Church website, Dubai", href: "https://fellowshipdubai.com/" },
  // Pending its screenshot: work-raw/web/ is empty in a fresh clone, so the
  // image has to be dropped in before `npm run images` will pick this up. The
  // entry is inert until then, and holds the real title and link meanwhile.
  "20-construction-desert-schools": {
    title: "Construction Desert Schools · Executive learning programme, Dubai",
    href: "https://www.constructiondesertschools.com/",
  },
  "10-saladmaster-al-mumtaz": {
    title: "Saladmaster UAE (Al Mumtaz) · Logo & brand identity",
    href: "https://saladmasteruae.me/",
  },
};

/**
 * The output size for a source, capped by width and by what WebP can encode.
 *
 * WebP refuses anything over 16,383px on either axis. Width alone never gets
 * near that, but a full-page screenshot does: the portfolio is meant to hold
 * whole-site captures — several here are 1:4 to 1:6, and a long marketing page
 * runs past 16,383px well before it runs out of content. Capping width only
 * meant sharp threw "Processed image is too large for the WebP format" partway
 * through a run, after the output directory had already been cleaned.
 *
 * So height is a real constraint, not a formality: when the proportional
 * height would overflow, narrow the image until it fits. A very tall capture
 * comes out narrower than requested, which is the right trade — it still shows
 * the whole design, just smaller.
 */
const WEBP_MAX = 16383;

function fitWebp(srcW, srcH, maxW) {
  const w = Math.min(srcW, maxW);
  const h = Math.round(srcH * (w / srcW));
  if (h <= WEBP_MAX) return [w, h];
  const scale = WEBP_MAX / h;
  return [Math.max(1, Math.floor(w * scale)), WEBP_MAX];
}

// Pre-flight. work-raw/ is gitignored, so it is absent or incomplete in a
// fresh clone. The loop below cleans each category's output directory and the
// manifest is rewritten wholesale, so running against a partial source set
// deletes the images and entries it has no sources for. Check before touching
// anything · a guard after the loop would fire too late.
const force = process.argv.includes("--force");
const previous = existsSync(MANIFEST)
  ? (readFileSync(MANIFEST, "utf8").match(/"category":/g) || []).length
  : 0;
const missing = CATS.filter((c) => !existsSync(join(RAW, c.key))).map((c) => c.key);
const sourceCount = CATS.reduce((n, c) => {
  const dir = join(RAW, c.key);
  if (!existsSync(dir)) return n;
  return n + readdirSync(dir).filter((f) => EXTS.has(extname(f).toLowerCase())).length;
}, 0);

if (!force && (sourceCount === 0 || missing.length > 0 || sourceCount < previous)) {
  const why = [];
  if (sourceCount === 0) why.push("no source images found under work-raw/");
  if (missing.length > 0) why.push(`no source directory for: ${missing.join(", ")}`);
  else if (sourceCount < previous)
    why.push(`only ${sourceCount} source image(s) for a manifest of ${previous} item(s)`);
  console.error(
    `Refusing to run: ${why.join("; ")}.\n` +
      "Nothing was changed. Put the full set of originals in work-raw/<category>/ " +
      "and run again, or pass --force if you really mean to shrink the portfolio.",
  );
  process.exit(1);
}

const items = [];

for (const cat of CATS) {
  const rawDir = join(RAW, cat.key);
  const outDir = join(OUT, cat.key);
  if (!existsSync(rawDir)) continue;
  // clean previous webp outputs (keep .gitkeep)
  if (existsSync(outDir)) {
    for (const f of readdirSync(outDir)) {
      if (f.endsWith(".webp")) rmSync(join(outDir, f));
    }
  }
  mkdirSync(outDir, { recursive: true });

  const files = readdirSync(rawDir)
    .filter((f) => EXTS.has(extname(f).toLowerCase()))
    .sort();

  let n = 0;
  for (const f of files) {
    n += 1;
    const base = `${cat.key}-${String(n).padStart(2, "0")}`;
    const src = join(rawDir, f);
    const meta = await sharp(src).metadata();
    const srcW = meta.width || 1600;
    const srcH = meta.height || 1000;
    const [fullW, fullH] = fitWebp(srcW, srcH, 1600);
    const [thumbW] = fitWebp(srcW, srcH, 800);

    await sharp(src)
      .rotate()
      .resize({ width: fullW, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(outDir, `${base}.webp`));

    await sharp(src)
      .rotate()
      .resize({ width: thumbW, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(join(outDir, `${base}-thumb.webp`));

    const stem = f.slice(0, f.length - extname(f).length);
    const itemMeta = META[stem] || {};
    items.push({
      category: cat.key,
      label: cat.label,
      title: itemMeta.title || (cat.key === "web" && WEB_TITLES[base]) || `${cat.label} ${n}`,
      ...(itemMeta.href ? { href: itemMeta.href } : {}),
      src: `/work/${cat.key}/${base}.webp`,
      thumb: `/work/${cat.key}/${base}-thumb.webp`,
      w: fullW,
      h: fullH,
      featured: n <= cat.featured,
    });
  }
  console.log(`  ${cat.key}: ${files.length} images optimised`);
}

const ts = `// AUTO-GENERATED by scripts/optimize-images.mjs · do not edit by hand.
export interface WorkItem {
  category: "web" | "graphic";
  label: string;
  title: string;
  href?: string;
  src: string;
  thumb: string;
  w: number;
  h: number;
  featured: boolean;
}

export const WORK_ITEMS: WorkItem[] = ${JSON.stringify(items, null, 2)};

export const WEB_DESIGNS = WORK_ITEMS.filter((i) => i.category === "web");
export const GRAPHIC_DESIGNS = WORK_ITEMS.filter((i) => i.category === "graphic");
export const FEATURED_WORK = WORK_ITEMS.filter((i) => i.featured);
`;
writeFileSync(MANIFEST, ts);
console.log(`\nWork manifest written: ${items.length} items -> src/data/workItems.ts`);

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Arabic (RTL) social card for the /ar homepage. Uses Arabic-capable system
// fonts for Arabic glyphs and the PP display fonts for the English brand.
// Run: node scripts/generate-ar-og.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "brand", "og");
mkdirSync(outDir, { recursive: true });

const AR = "Tahoma, Arial, sans-serif";

const line1 = "استوديو تقني";
const line2 = "للأعمال الصغيرة.";
const subtitle = "مواقع وتطبيقات · أودو · أتمتة · ذكاء اصطناعي — دبي";
const tagline = "الخدمة أولًا · البناء ثانيًا";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" direction="rtl">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0C2432"/><stop offset="0.58" stop-color="#071724"/><stop offset="1" stop-color="#061321"/>
    </linearGradient>
    <radialGradient id="glow" cx="53%" cy="14%" r="62%">
      <stop offset="0" stop-color="#E8C173" stop-opacity="0.22"/><stop offset="1" stop-color="#E8C173" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0" stop-color="#F7E7B0"/><stop offset="0.48" stop-color="#E8C173"/><stop offset="1" stop-color="#DAA442"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="44" y="44" width="1112" height="542" rx="34" fill="none" stroke="#F4EFE6" stroke-opacity="0.11"/>
  <g transform="translate(100,72)">
    <g transform="scale(1.5)" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M5 31 H31" stroke="#DAA442" stroke-width="2.6"/>
      <path d="M23.8 30 C21 23, 14.5 13, 8.2 6.4" stroke="#DAA442" stroke-width="2.1"/>
      <path d="M12.2 30 C15 23, 21.5 13, 27.8 6.4" stroke="#F3EFE6" stroke-width="2.3"/>
      <circle cx="18" cy="5.6" r="1.9" fill="#DAA442" stroke="none"/>
    </g>
    <text x="74" y="42" font-family="PP Mondwest, Georgia, serif" font-size="36" font-weight="400"><tspan fill="url(#gold)">Xerxes</tspan> <tspan fill="#F3EFE6">Duane</tspan></text>
  </g>
  <rect x="670" y="176" width="430" height="28" rx="14" fill="#FFFFFF" fill-opacity="0.055" stroke="#F4EFE6" stroke-opacity="0.16"/>
  <text x="1078" y="196" text-anchor="end" direction="rtl" font-family="${AR}" font-size="18" fill="#E8C173">استوديو تقني - دبي</text>
  <text x="1100" y="300" text-anchor="end" direction="rtl" font-family="${AR}" font-size="72" font-weight="700" fill="#F3EFE6">${line1}</text>
  <text x="1100" y="390" text-anchor="end" direction="rtl" font-family="${AR}" font-size="78" font-weight="700" fill="url(#gold)">${line2}</text>
  <text x="1100" y="470" text-anchor="end" direction="rtl" font-family="${AR}" font-size="28" fill="#D8CFC0">${subtitle}</text>
  <text x="1100" y="560" text-anchor="end" direction="rtl" font-family="${AR}" font-size="23" fill="#DAA442">${tagline}</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    loadSystemFonts: true,
    fontFiles: [
      join(root, "public", "fonts", "PPMondwest-Regular.otf"),
      join(root, "public", "fonts", "PPNeueBit-Bold.otf"),
    ],
  },
})
  .render()
  .asPng();

writeFileSync(join(outDir, "ar-home.png"), png);
console.log(`  og/ar-home.png  (${(png.length / 1024).toFixed(0)} KB)`);

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Arabic (RTL) social card for the /ar homepage. Uses an Arabic-capable system
// font (Tahoma/Arial) — Georgia has no Arabic glyphs. Run: node scripts/generate-ar-og.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "brand", "og");
mkdirSync(outDir, { recursive: true });

const AR = "Tahoma, Arial, sans-serif";

const line1 = "فريق تقني،";
const line2 = "دون أن توظّف واحدًا.";
const subtitle = "مواقع · تطبيقات · أودو · أتمتة · ذكاء اصطناعي — دبي.";
const tagline = "الخدمة أولًا · البناء ثانيًا";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" direction="rtl">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07090A"/><stop offset="0.5" stop-color="#0B0F0D"/><stop offset="1" stop-color="#07090A"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="22%" r="55%">
      <stop offset="0" stop-color="#DAA442" stop-opacity="0.30"/><stop offset="1" stop-color="#DAA442" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0" stop-color="#F3EFE6"/><stop offset="0.5" stop-color="#E8C173"/><stop offset="1" stop-color="#DAA442"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(100,72)">
    <g transform="scale(1.5)" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M5 31 H31" stroke="#DAA442" stroke-width="2.6"/>
      <path d="M23.8 30 C21 23, 14.5 13, 8.2 6.4" stroke="#DAA442" stroke-width="2.1"/>
      <path d="M12.2 30 C15 23, 21.5 13, 27.8 6.4" stroke="#F3EFE6" stroke-width="2.3"/>
      <circle cx="18" cy="5.6" r="1.9" fill="#DAA442" stroke="none"/>
    </g>
    <text x="74" y="42" font-family="Georgia, serif" font-size="32" font-weight="600" fill="#F3EFE6">Xerxes <tspan fill="#DAA442">Duane</tspan></text>
  </g>
  <text x="1100" y="300" text-anchor="end" direction="rtl" font-family="${AR}" font-size="70" font-weight="700" fill="#F3EFE6">${line1}</text>
  <text x="1100" y="390" text-anchor="end" direction="rtl" font-family="${AR}" font-size="70" font-weight="700" fill="url(#gold)">${line2}</text>
  <text x="1100" y="465" text-anchor="end" direction="rtl" font-family="${AR}" font-size="28" fill="#9AA39A">${subtitle}</text>
  <text x="1100" y="560" text-anchor="end" direction="rtl" font-family="${AR}" font-size="22" letter-spacing="1" fill="#DAA442">${tagline}</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
})
  .render()
  .asPng();

writeFileSync(join(outDir, "ar-home.png"), png);
console.log(`  og/ar-home.png  (${(png.length / 1024).toFixed(0)} KB)`);

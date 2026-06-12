import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Branded 1200x630 social cards for the content pages (About, Portfolio,
// Showreel, Case Studies, Insights index + posts) — same template as the
// home/service cards. Run: node scripts/generate-page-og.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "brand", "og");
mkdirSync(outDir, { recursive: true });

function ogSvg({ line1, line2, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07090A"/><stop offset="0.5" stop-color="#0B0F0D"/><stop offset="1" stop-color="#07090A"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="22%" r="55%">
      <stop offset="0" stop-color="#DAA442" stop-opacity="0.30"/><stop offset="1" stop-color="#DAA442" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
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
  <text x="100" y="300" font-family="Georgia, serif" font-size="72" font-weight="600" fill="#F3EFE6">${line1}</text>
  <text x="100" y="385" font-family="Georgia, serif" font-size="72" font-weight="600" font-style="italic" fill="url(#gold)">${line2}</text>
  <text x="100" y="465" font-family="Helvetica, Arial, sans-serif" font-size="29" fill="#9AA39A">${subtitle}</text>
  <text x="100" y="560" font-family="monospace" font-size="22" letter-spacing="3" fill="#DAA442">SERVE FIRST.  BUILD SECOND.</text>
</svg>`;
}

const cards = [
  {
    slug: "about",
    line1: "Work directly with",
    line2: "the founder.",
    subtitle: "Xerxes Duane · Odoo consultant &amp; systems builder, Dubai.",
  },
  {
    slug: "portfolio",
    line1: "A look at",
    line2: "the craft.",
    subtitle: "Selected web &amp; brand design — Xerxes Duane, Dubai.",
  },
  {
    slug: "showreel",
    line1: "Video, editing",
    line2: "&amp; motion.",
    subtitle: "Events, documentaries, social reels &amp; brand work — Dubai.",
  },
  {
    slug: "case-studies",
    line1: "Real businesses.",
    line2: "Real systems.",
    subtitle: "Client work from the UAE, the Philippines &amp; beyond.",
  },
  {
    slug: "insights",
    line1: "Plain-English",
    line2: "systems thinking.",
    subtitle: "Odoo, automation &amp; growth for small businesses — Dubai.",
  },
  {
    slug: "website-cost-dubai",
    line1: "What a website",
    line2: "really costs.",
    subtitle: "An honest 2026 breakdown for Dubai — Xerxes Duane.",
  },
  {
    slug: "how-much-does-odoo-cost-dubai",
    line1: "What Odoo",
    line2: "really costs.",
    subtitle: "An honest cost breakdown for Dubai — Xerxes Duane.",
  },
  {
    slug: "odoo-vs-zoho-uae",
    line1: "Odoo vs Zoho",
    line2: "in the UAE.",
    subtitle: "Which one fits your business? An honest comparison.",
  },
  {
    slug: "signs-outgrown-spreadsheets",
    line1: "Outgrowing",
    line2: "your spreadsheets?",
    subtitle: "The signs it's time for a real system — Xerxes Duane.",
  },
  {
    slug: "what-a-systems-audit-covers",
    line1: "Inside the free",
    line2: "systems audit.",
    subtitle: "Exactly what happens in the 60 minutes — Xerxes Duane.",
  },
  {
    slug: "crm-setup-mistakes-dubai",
    line1: "CRM setup",
    line2: "mistakes to avoid.",
    subtitle: "What breaks CRM rollouts, and how to dodge it — Dubai.",
  },
  {
    slug: "odoo-enterprise-vs-community",
    line1: "Odoo Enterprise",
    line2: "or Community?",
    subtitle: "Which edition you actually need, honestly.",
  },
  {
    slug: "choosing-a-web-developer-dubai",
    line1: "Choosing a web",
    line2: "developer in Dubai.",
    subtitle: "What to ask before you sign — Xerxes Duane.",
  },
];

for (const c of cards) {
  const png = new Resvg(ogSvg(c), {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true },
  })
    .render()
    .asPng();
  writeFileSync(join(outDir, `${c.slug}.png`), png);
  console.log(`  og/${c.slug}.png  (${(png.length / 1024).toFixed(0)} KB)`);
}
console.log("Page OG images generated.");

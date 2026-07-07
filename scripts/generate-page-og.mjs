import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Branded 1200x630 social cards for content pages and insight posts.
// Run: node scripts/generate-page-og.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "brand", "og");
mkdirSync(outDir, { recursive: true });

const fontOptions = {
  loadSystemFonts: true,
  fontFiles: [
    join(root, "public", "fonts", "inter-400.woff2"),
    join(root, "public", "fonts", "inter-600.woff2"),
    join(root, "public", "fonts", "inter-700.woff2"),
    join(root, "public", "fonts", "PPMondwest-Regular.otf"),
    join(root, "public", "fonts", "PPNeueBit-Bold.otf"),
  ],
};

function ogSvg({ eyebrow = "XERXES DUANE - DUBAI", line1, line2, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0C2432"/><stop offset="0.58" stop-color="#071724"/><stop offset="1" stop-color="#061321"/>
    </linearGradient>
    <radialGradient id="glow" cx="53%" cy="14%" r="62%">
      <stop offset="0" stop-color="#E8C173" stop-opacity="0.22"/><stop offset="1" stop-color="#E8C173" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
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
      <path d="M12.2 30 C15 23, 21.5 13, 27.8 6.4" stroke="#F7F3EA" stroke-width="2.3"/>
      <circle cx="18" cy="5.6" r="1.9" fill="#DAA442" stroke="none"/>
    </g>
    <text x="74" y="42" font-family="PP Mondwest, Georgia, serif" font-size="36" font-weight="400"><tspan fill="url(#gold)">Xerxes</tspan> <tspan fill="#F7F3EA">Duane</tspan></text>
  </g>
  <rect x="100" y="176" width="430" height="28" rx="14" fill="#FFFFFF" fill-opacity="0.055" stroke="#F4EFE6" stroke-opacity="0.16"/>
  <text x="122" y="196" font-family="PP NeueBit, Space Mono, monospace" font-size="20" letter-spacing="5" fill="#E8C173">${eyebrow}</text>
  <text x="100" y="300" font-family="Inter, Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#F7F3EA">${line1}</text>
  <text x="100" y="390" font-family="PP Mondwest, Georgia, serif" font-size="84" font-weight="400" fill="url(#gold)">${line2}</text>
  <text x="100" y="470" font-family="Inter, Helvetica, Arial, sans-serif" font-size="29" fill="#D8CFC0">${subtitle}</text>
  <text x="100" y="560" font-family="PP NeueBit, Space Mono, monospace" font-size="26" letter-spacing="6" fill="#DAA442">WEBSITES - CRM - ODOO - AUTOMATION - AI</text>
</svg>`;
}

const cards = [
  {
    slug: "about",
    eyebrow: "ABOUT - FOUNDER LED",
    line1: "Work directly with",
    line2: "the founder.",
    subtitle: "Xerxes Duane · Odoo consultant &amp; systems builder, Dubai.",
  },
  {
    slug: "portfolio",
    eyebrow: "PORTFOLIO - WEB AND DESIGN",
    line1: "A look at",
    line2: "the craft.",
    subtitle: "Selected web &amp; brand design — Xerxes Duane, Dubai.",
  },
  {
    slug: "showreel",
    eyebrow: "SHOWREEL - VIDEO",
    line1: "Video, editing",
    line2: "&amp; motion.",
    subtitle: "Events, documentaries, social reels &amp; brand work — Dubai.",
  },
  {
    slug: "case-studies",
    eyebrow: "CASE STUDIES - REAL SYSTEMS",
    line1: "Real businesses.",
    line2: "Real systems.",
    subtitle: "Client work from the UAE, the Philippines &amp; beyond.",
  },
  {
    slug: "insights",
    eyebrow: "INSIGHTS - PLAIN ENGLISH",
    line1: "Plain-English",
    line2: "systems thinking.",
    subtitle: "Odoo, automation &amp; growth for small businesses — Dubai.",
  },
  {
    slug: "demos",
    eyebrow: "AI LAB - 37 TOOLS",
    line1: "Try the AI.",
    line2: "Not just read about it.",
    subtitle: "Practical AI tools for sales, service, content, operations &amp; reporting.",
  },
  {
    slug: "aeo-seo-geo-dubai",
    eyebrow: "INSIGHT - SEO AEO GEO",
    line1: "SEO is now",
    line2: "three places.",
    subtitle: "How Dubai businesses get found in Google, answers &amp; AI.",
  },
  {
    slug: "get-cited-by-chatgpt-perplexity-dubai",
    eyebrow: "INSIGHT - AI SEARCH",
    line1: "Get cited by",
    line2: "AI engines.",
    subtitle: "How ChatGPT and Perplexity decide who to recommend.",
  },
  {
    slug: "whatsapp-automation-not-spam-dubai",
    eyebrow: "INSIGHT - WHATSAPP",
    line1: "Automate replies,",
    line2: "not spam.",
    subtitle: "Helpful WhatsApp automation for Dubai businesses.",
  },
  {
    slug: "website-cost-dubai",
    eyebrow: "INSIGHT - WEB COST",
    line1: "What a website",
    line2: "really costs.",
    subtitle: "An honest 2026 breakdown for Dubai — Xerxes Duane.",
  },
  {
    slug: "how-much-does-odoo-cost-dubai",
    eyebrow: "INSIGHT - ODOO COST",
    line1: "What Odoo",
    line2: "really costs.",
    subtitle: "An honest cost breakdown for Dubai — Xerxes Duane.",
  },
  {
    slug: "odoo-vs-zoho-uae",
    eyebrow: "INSIGHT - ERP CHOICE",
    line1: "Odoo vs Zoho",
    line2: "in the UAE.",
    subtitle: "Which one fits your business? An honest comparison.",
  },
  {
    slug: "signs-outgrown-spreadsheets",
    eyebrow: "INSIGHT - OPERATIONS",
    line1: "Outgrowing",
    line2: "your spreadsheets?",
    subtitle: "The signs it's time for a real system — Xerxes Duane.",
  },
  {
    slug: "what-a-systems-audit-covers",
    eyebrow: "INSIGHT - FREE AUDIT",
    line1: "Inside the free",
    line2: "systems audit.",
    subtitle: "Exactly what happens in the 60 minutes — Xerxes Duane.",
  },
  {
    slug: "crm-setup-mistakes-dubai",
    eyebrow: "INSIGHT - CRM",
    line1: "CRM setup",
    line2: "mistakes to avoid.",
    subtitle: "What breaks CRM rollouts, and how to dodge it — Dubai.",
  },
  {
    slug: "odoo-enterprise-vs-community",
    eyebrow: "INSIGHT - ODOO",
    line1: "Odoo Enterprise",
    line2: "or Community?",
    subtitle: "Which edition you actually need, honestly.",
  },
  {
    slug: "choosing-a-web-developer-dubai",
    eyebrow: "INSIGHT - WEB DEVELOPMENT",
    line1: "Choosing a web",
    line2: "developer in Dubai.",
    subtitle: "What to ask before you sign — Xerxes Duane.",
  },
];

for (const c of cards) {
  const png = new Resvg(ogSvg(c), {
    fitTo: { mode: "width", value: 1200 },
    font: fontOptions,
  })
    .render()
    .asPng();
  writeFileSync(join(outDir, `${c.slug}.png`), png);
  console.log(`  og/${c.slug}.png  (${(png.length / 1024).toFixed(0)} KB)`);
}
console.log("Page OG images generated.");

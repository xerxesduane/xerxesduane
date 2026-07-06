import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "brand", "og");
mkdirSync(outDir, { recursive: true });

// Branded 1200x630 OG card matching public/og-image.svg.
function ogSvg({ line1, line2, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#081827"/><stop offset="0.5" stop-color="#102A43"/><stop offset="1" stop-color="#081827"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="22%" r="55%">
      <stop offset="0" stop-color="#B8892F" stop-opacity="0.30"/><stop offset="1" stop-color="#B8892F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F7F3EA"/><stop offset="0.5" stop-color="#EFE1BF"/><stop offset="1" stop-color="#B8892F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(100,72)">
    <g transform="scale(1.5)" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M5 31 H31" stroke="#B8892F" stroke-width="2.6"/>
      <path d="M23.8 30 C21 23, 14.5 13, 8.2 6.4" stroke="#B8892F" stroke-width="2.1"/>
      <path d="M12.2 30 C15 23, 21.5 13, 27.8 6.4" stroke="#F7F3EA" stroke-width="2.3"/>
      <circle cx="18" cy="5.6" r="1.9" fill="#B8892F" stroke="none"/>
    </g>
    <text x="74" y="42" font-family="Inter, Helvetica, Arial, sans-serif" font-size="32" font-weight="600"><tspan fill="url(#gold)">Xerxes</tspan> <tspan fill="#F7F3EA">Duane</tspan></text>
  </g>
  <text x="100" y="290" font-family="Inter, Helvetica, Arial, sans-serif" font-size="72" font-weight="600" fill="#F7F3EA">${line1}</text>
  <text x="100" y="375" font-family="Inter, Helvetica, Arial, sans-serif" font-size="72" font-weight="600" font-style="italic" fill="url(#gold)">${line2}</text>
  <text x="100" y="455" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#EFE7D8">${subtitle}</text>
  <text x="100" y="560" font-family="Inter, Helvetica, Arial, sans-serif" font-size="22" letter-spacing="3" fill="#B8892F">INDEPENDENT SYSTEMS CONSULTANT IN DUBAI</text>
</svg>`;
}

const cards = [
  {
    slug: "odoo-erp-dubai",
    line1: "Odoo ERP,",
    line2: "set up properly.",
    subtitle: "Implementation, configuration &amp; support — Dubai small businesses.",
  },
  {
    slug: "web-development-dubai",
    line1: "A website that",
    line2: "brings in customers.",
    subtitle: "Custom sites, web apps &amp; landing pages — Dubai.",
  },
  {
    slug: "ai-automation-dubai",
    line1: "AI that handles",
    line2: "the repetitive work.",
    subtitle: "Chatbots, workflows &amp; custom assistants — Dubai.",
  },
  {
    slug: "seo-dubai",
    line1: "Be found by buyers,",
    line2: "not browsers.",
    subtitle: "Technical, local &amp; content SEO for Dubai small businesses.",
  },
  {
    slug: "answer-engine-optimization-dubai",
    line1: "Answer Engine",
    line2: "Optimization (AEO)",
    subtitle: "Be the answer in AI Overviews, voice search &amp; snippets, in Dubai.",
  },
  {
    slug: "generative-engine-optimization-dubai",
    line1: "Generative Engine",
    line2: "Optimization (GEO)",
    subtitle: "Get cited by ChatGPT, Gemini &amp; Perplexity, in Dubai.",
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
  console.log(`  og/${c.slug}.png`);
}
console.log("Service OG images generated.");

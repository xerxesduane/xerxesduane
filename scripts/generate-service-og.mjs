import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

// Branded 1200x630 OG card matching the live studio typography.
function ogSvg({ eyebrow, line1, line2, subtitle }) {
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
  <text x="100" y="560" font-family="PP NeueBit, Space Mono, monospace" font-size="26" letter-spacing="6" fill="#DAA442">BUILD - RUN - GROW - DUBAI</text>
</svg>`;
}

const cards = [
  {
    slug: "odoo-erp-dubai",
    eyebrow: "ODOO ERP - DUBAI",
    line1: "Odoo ERP,",
    line2: "set up properly.",
    subtitle: "Implementation, configuration &amp; support — Dubai small businesses.",
  },
  {
    slug: "web-development-dubai",
    eyebrow: "WEB DEVELOPMENT - DUBAI",
    line1: "A website that",
    line2: "brings in customers.",
    subtitle: "Custom sites, web apps &amp; landing pages — Dubai.",
  },
  {
    slug: "ai-automation-dubai",
    eyebrow: "AI AUTOMATION - DUBAI",
    line1: "AI that handles",
    line2: "the repetitive work.",
    subtitle: "Chatbots, workflows &amp; custom assistants — Dubai.",
  },
  {
    slug: "seo-dubai",
    eyebrow: "SEO - DUBAI",
    line1: "Be found by buyers,",
    line2: "not browsers.",
    subtitle: "Technical, local &amp; content SEO for Dubai small businesses.",
  },
  {
    slug: "answer-engine-optimization-dubai",
    eyebrow: "AEO - ANSWER ENGINES",
    line1: "Answer Engine",
    line2: "Optimization (AEO)",
    subtitle: "Be the answer in AI Overviews, voice search &amp; snippets, in Dubai.",
  },
  {
    slug: "generative-engine-optimization-dubai",
    eyebrow: "GEO - AI SEARCH",
    line1: "Generative Engine",
    line2: "Optimization (GEO)",
    subtitle: "Get cited by ChatGPT, Gemini &amp; Perplexity, in Dubai.",
  },
  {
    slug: "custom-software-development-dubai",
    eyebrow: "CUSTOM SOFTWARE - DUBAI",
    line1: "Software built",
    line2: "around your workflow.",
    subtitle: "Internal tools, portals, workflows &amp; integrations for growing teams.",
  },
  {
    slug: "crm-development-dubai",
    eyebrow: "CRM DEVELOPMENT - DUBAI",
    line1: "A CRM your team",
    line2: "actually uses.",
    subtitle: "Lead pipelines, dashboards &amp; follow-up automation for small businesses.",
  },
  {
    slug: "mobile-app-development-dubai",
    eyebrow: "MOBILE APPS - DUBAI",
    line1: "Practical apps",
    line2: "that launch.",
    subtitle: "Booking, portals, memberships &amp; operations apps built to grow.",
  },
  {
    slug: "ecommerce-development-dubai",
    eyebrow: "E-COMMERCE - DUBAI",
    line1: "Stores connected",
    line2: "to operations.",
    subtitle: "UAE payments, inventory, order workflows &amp; conversion-focused journeys.",
  },
  {
    slug: "landing-page-design-dubai",
    eyebrow: "LANDING PAGES - DUBAI",
    line1: "Pages built",
    line2: "to convert.",
    subtitle: "Campaign pages connected to analytics, forms, CRM &amp; follow-up.",
  },
  {
    slug: "branding-graphic-design-dubai",
    eyebrow: "BRANDING - DUBAI",
    line1: "A visual system",
    line2: "people remember.",
    subtitle: "Practical identities, collateral, campaigns &amp; brand consistency.",
  },
  {
    slug: "videography-photography-dubai",
    eyebrow: "VIDEO AND PHOTO - DUBAI",
    line1: "Content planned",
    line2: "for where it lives.",
    subtitle: "Brand, product, event &amp; campaign production for real channels.",
  },
  {
    slug: "video-editing-dubai",
    eyebrow: "VIDEO EDITING - DUBAI",
    line1: "Edits with pace,",
    line2: "captions &amp; motion.",
    subtitle: "Social reels, ads, interviews, events &amp; brand films, ready to publish.",
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
  console.log(`  og/${c.slug}.png`);
}
console.log("Service OG images generated.");

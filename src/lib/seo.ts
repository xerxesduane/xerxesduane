import { SERVICE_PAGES, getServicePage } from "../data/servicePages";
import { FAQS } from "../data/content";

export const SITE_ORIGIN = "https://www.xerxesduane.com";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  /** Extra JSON-LD nodes serialized into the head (e.g. Service, FAQPage). */
  jsonLd?: Record<string, unknown>[];
}

/** FAQPage schema, derived from the FAQ content actually rendered on the home page. */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const HOME_META: PageMeta = {
  title: "Threshold Works | Web, Apps, Odoo/ERP & AI Studio in Dubai",
  description:
    "Dubai tech studio for small businesses: websites, web & mobile apps, Odoo/ERP & CRM, automation, AI, SEO and Google/Meta ads. Book a free 60-minute systems audit.",
  canonical: `${SITE_ORIGIN}/`,
  ogTitle: "Threshold Works | Web, Apps, Odoo/ERP & AI Studio in Dubai",
  jsonLd: [FAQ_SCHEMA],
};

/** Normalise a pathname to a bare slug (no leading/trailing slashes). */
export function pathToSlug(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}

/** All routes that should be prerendered, as absolute paths. */
export function allRoutes(): string[] {
  return ["/", ...SERVICE_PAGES.map((p) => `/${p.slug}`)];
}

export function getPageMeta(path: string): PageMeta {
  const slug = pathToSlug(path);
  if (slug === "") return HOME_META;

  const page = getServicePage(slug);
  if (!page) return HOME_META;

  const canonical = `${SITE_ORIGIN}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    canonical,
    ogTitle: page.ogTitle,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.jsonLdName,
        serviceType: page.jsonLdName,
        provider: { "@id": `${SITE_ORIGIN}/#org` },
        areaServed: { "@type": "City", name: "Dubai" },
        url: canonical,
        description: page.metaDescription,
      },
    ],
  };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Build the per-route <head> markup injected into the prerendered HTML. */
export function buildHeadTags(path: string): string {
  const m = getPageMeta(path);
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    `<meta property="og:url" content="${esc(m.canonical)}" />`,
    `<meta property="og:title" content="${esc(m.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:title" content="${esc(m.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
  ];
  for (const node of m.jsonLd ?? []) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(node)}</script>`,
    );
  }
  return tags.join("\n    ");
}

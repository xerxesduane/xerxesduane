import { SERVICE_PAGES, getServicePage } from "../data/servicePages";
import { FAQS } from "../data/content";
import { INSIGHTS, getInsight } from "../data/insights";

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
  return [
    "/",
    "/case-studies",
    "/insights",
    ...INSIGHTS.map((p) => `/insights/${p.slug}`),
    ...SERVICE_PAGES.map((p) => `/${p.slug}`),
  ];
}

const CASE_STUDIES_META: PageMeta = {
  title: "Case Studies | Threshold Works",
  description:
    "Real client work from Threshold Works: Odoo ERP deployments, CRM and web builds, and ad campaigns across the UAE, the Philippines, and beyond.",
  canonical: `${SITE_ORIGIN}/case-studies`,
  ogTitle: "Case Studies | Threshold Works",
};

const INSIGHTS_META: PageMeta = {
  title: "Insights | Threshold Works",
  description:
    "Plain-English thinking on systems, Odoo, automation, and growth for small businesses in Dubai and beyond, from Threshold Works.",
  canonical: `${SITE_ORIGIN}/insights`,
  ogTitle: "Insights | Threshold Works",
};

export function getPageMeta(path: string): PageMeta {
  const slug = pathToSlug(path);
  if (slug === "") return HOME_META;
  if (slug === "case-studies") return CASE_STUDIES_META;
  if (slug === "insights") return INSIGHTS_META;

  if (slug.startsWith("insights/")) {
    const post = getInsight(slug.slice("insights/".length));
    if (post) {
      const canonical = `${SITE_ORIGIN}/insights/${post.slug}`;
      return {
        title: `${post.title} | Threshold Works`,
        description: post.description,
        canonical,
        ogTitle: post.title,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Person", name: post.author, "@id": `${SITE_ORIGIN}/#xerxes` },
            publisher: { "@id": `${SITE_ORIGIN}/#org` },
            mainEntityOfPage: canonical,
            image: `${SITE_ORIGIN}/brand/og-image.png`,
          },
        ],
      };
    }
  }

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
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

import { SERVICE_PAGES, getServicePage } from "../data/servicePages";
import { FAQS } from "../data/content";
import { INSIGHTS, getInsight } from "../data/insights";

export const SITE_ORIGIN = "https://www.xerxesduane.com";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  /** Absolute URL of the social share image. Defaults to the site OG image. */
  ogImage?: string;
  /** Extra JSON-LD nodes serialized into the head (e.g. Service, FAQPage). */
  jsonLd?: Record<string, unknown>[];
}

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/brand/og-image.png`;

/** BreadcrumbList JSON-LD from a trail of { name, url } items. */
function breadcrumb(trail: { name: string; url: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

const HOME_CRUMB = { name: "Home", url: `${SITE_ORIGIN}/` };

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

/** Sitemap lastmod for a route: a post's own date, else the build-date fallback. */
export function routeLastmod(path: string, fallback: string): string {
  const slug = pathToSlug(path);
  if (slug.startsWith("insights/")) {
    const post = getInsight(slug.slice("insights/".length));
    if (post) return post.date;
  }
  return fallback;
}

/** All routes that should be prerendered, as absolute paths. */
export function allRoutes(): string[] {
  return [
    "/",
    "/about",
    "/case-studies",
    "/insights",
    ...INSIGHTS.map((p) => `/insights/${p.slug}`),
    ...SERVICE_PAGES.map((p) => `/${p.slug}`),
  ];
}

const ABOUT_META: PageMeta = {
  title: "About Xerxes Magdaluyo | Threshold Works",
  description:
    "Xerxes Magdaluyo, founder and lead consultant at Threshold Works: a hands-on Odoo consultant helping Dubai small businesses turn fragmented operations into one connected system.",
  canonical: `${SITE_ORIGIN}/about`,
  ogTitle: "About Xerxes Magdaluyo | Threshold Works",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        "@id": `${SITE_ORIGIN}/#xerxes`,
        name: "Xerxes Magdaluyo",
        jobTitle: "Founder & Lead Consultant",
        worksFor: { "@id": `${SITE_ORIGIN}/#org` },
        image: `${SITE_ORIGIN}/brand/founder-xerxes.jpg`,
        url: `${SITE_ORIGIN}/about`,
        knowsAbout: [
          "Odoo Implementation",
          "Odoo Customization",
          "ERP",
          "CRM",
          "Business Process Automation",
          "Web Development",
        ],
      },
    },
    breadcrumb([HOME_CRUMB, { name: "About", url: `${SITE_ORIGIN}/about` }]),
  ],
};

const CASE_STUDIES_META: PageMeta = {
  title: "Case Studies | Threshold Works",
  description:
    "Real client work from Threshold Works: Odoo ERP deployments, CRM and web builds, and ad campaigns across the UAE, the Philippines, and beyond.",
  canonical: `${SITE_ORIGIN}/case-studies`,
  ogTitle: "Case Studies | Threshold Works",
  ogImage: `${SITE_ORIGIN}/brand/og/case-studies.png`,
  jsonLd: [
    breadcrumb([HOME_CRUMB, { name: "Case Studies", url: `${SITE_ORIGIN}/case-studies` }]),
  ],
};

const INSIGHTS_META: PageMeta = {
  title: "Insights | Threshold Works",
  description:
    "Plain-English thinking on systems, Odoo, automation, and growth for small businesses in Dubai and beyond, from Threshold Works.",
  canonical: `${SITE_ORIGIN}/insights`,
  ogTitle: "Insights | Threshold Works",
  ogImage: `${SITE_ORIGIN}/brand/og/insights.png`,
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Insights", url: `${SITE_ORIGIN}/insights` }])],
};

export function getPageMeta(path: string): PageMeta {
  const slug = pathToSlug(path);
  if (slug === "") return HOME_META;
  if (slug === "about") return ABOUT_META;
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
        ogImage: `${SITE_ORIGIN}/brand/og/${post.slug}.png`,
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
            image: `${SITE_ORIGIN}/brand/og/${post.slug}.png`,
          },
          breadcrumb([
            HOME_CRUMB,
            { name: "Insights", url: `${SITE_ORIGIN}/insights` },
            { name: post.title, url: canonical },
          ]),
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
    ogImage: `${SITE_ORIGIN}/brand/og/${page.slug}.png`,
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
      breadcrumb([HOME_CRUMB, { name: page.navLabel, url: canonical }]),
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
    `<meta property="og:image" content="${esc(m.ogImage ?? DEFAULT_OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(m.ogTitle)}" />`,
    `<meta name="twitter:title" content="${esc(m.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.ogImage ?? DEFAULT_OG_IMAGE)}" />`,
  ];
  for (const node of m.jsonLd ?? []) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(node)}</script>`,
    );
  }
  return tags.join("\n    ");
}

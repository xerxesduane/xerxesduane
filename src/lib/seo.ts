import { SERVICE_PAGES, getServicePage } from "../data/servicePages";
import { FAQS } from "../data/content";
import { INSIGHTS, getInsight } from "../data/insights";
import { SERVICE_PAGES_AR, getServicePageAr } from "../data/servicePagesAr";

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
  /** When true, emits robots noindex (e.g. 404). */
  noindex?: boolean;
  /** hreflang alternates (en/ar/x-default) for bilingual pages. */
  alternates?: { hreflang: string; href: string }[];
}

/** Reciprocal hreflang set for a service page that has an Arabic version. */
function serviceAlternates(slug: string): { hreflang: string; href: string }[] {
  return [
    { hreflang: "en", href: `${SITE_ORIGIN}/${slug}` },
    { hreflang: "ar", href: `${SITE_ORIGIN}/ar/${slug}` },
    { hreflang: "x-default", href: `${SITE_ORIGIN}/${slug}` },
  ];
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
    "Dubai tech studio for small businesses: websites, apps, Odoo/ERP & CRM, automation, AI and ads. Founded by Xerxes Duane. Book a free 60-minute systems audit.",
  canonical: `${SITE_ORIGIN}/`,
  ogTitle: "Threshold Works | Web, Apps, Odoo/ERP & AI Studio in Dubai",
  alternates: [
    { hreflang: "en", href: `${SITE_ORIGIN}/` },
    { hreflang: "ar", href: `${SITE_ORIGIN}/ar` },
    { hreflang: "x-default", href: `${SITE_ORIGIN}/` },
  ],
  // Note: the global #org + #website graph lives in index.html (applies to all routes).
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
    "/portfolio",
    "/showreel",
    "/insights",
    "/privacy",
    "/terms",
    ...INSIGHTS.map((p) => `/insights/${p.slug}`),
    ...SERVICE_PAGES.map((p) => `/${p.slug}`),
    "/ar",
    ...SERVICE_PAGES_AR.map((p) => `/ar/${p.slug}`),
  ];
}

const HOME_ALTERNATES = [
  { hreflang: "en", href: `${SITE_ORIGIN}/` },
  { hreflang: "ar", href: `${SITE_ORIGIN}/ar` },
  { hreflang: "x-default", href: `${SITE_ORIGIN}/` },
];

const AR_HOME_META: PageMeta = {
  title: "Threshold Works | استوديو تقني للأعمال الصغيرة في دبي",
  description:
    "استوديو تقني متكامل في دبي للأعمال الصغيرة: مواقع وتطبيقات وأنظمة أودو ERP وأتمتة وذكاء اصطناعي وتحسين محركات البحث. احجز تدقيقًا مجانيًا لأنظمتك.",
  canonical: `${SITE_ORIGIN}/ar`,
  ogTitle: "Threshold Works | استوديو تقني للأعمال الصغيرة في دبي",
  alternates: HOME_ALTERNATES,
};

const ABOUT_META: PageMeta = {
  title: "About Xerxes Duane | Threshold Works",
  description:
    "Xerxes Duane, founder of Threshold Works: a hands-on Odoo consultant helping Dubai small businesses turn fragmented operations into one connected system. You work directly with him.",
  canonical: `${SITE_ORIGIN}/about`,
  ogTitle: "About Xerxes Duane | Threshold Works",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        "@id": `${SITE_ORIGIN}/#xerxes`,
        name: "Xerxes Duane",
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

const PRIVACY_META: PageMeta = {
  title: "Privacy Policy | Threshold Works",
  description:
    "How Threshold Works collects and uses information: contact enquiries, consent-based analytics, cookies, and your choices. Plain language, no data selling.",
  canonical: `${SITE_ORIGIN}/privacy`,
  ogTitle: "Privacy Policy | Threshold Works",
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Privacy Policy", url: `${SITE_ORIGIN}/privacy` }])],
};

const TERMS_META: PageMeta = {
  title: "Terms of Use | Threshold Works",
  description:
    "The terms for using the Threshold Works website: quotes, intellectual property, external links, liability, and governing law (UAE).",
  canonical: `${SITE_ORIGIN}/terms`,
  ogTitle: "Terms of Use | Threshold Works",
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Terms of Use", url: `${SITE_ORIGIN}/terms` }])],
};

const PORTFOLIO_META: PageMeta = {
  title: "Portfolio — Web & Graphic Design | Threshold Works",
  description:
    "A portfolio of website and brand & graphic design work by Threshold Works for businesses across the UAE and beyond. See the craft, then book a free systems audit.",
  canonical: `${SITE_ORIGIN}/portfolio`,
  ogTitle: "Portfolio — Web & Graphic Design | Threshold Works",
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Portfolio", url: `${SITE_ORIGIN}/portfolio` }])],
};

const SHOWREEL_META: PageMeta = {
  title: "Showreel — Video, Editing & Motion | Threshold Works",
  description:
    "Video production, editing, color grading, and animation by Threshold Works: events, documentaries, social reels, and brand work across the UAE and beyond.",
  canonical: `${SITE_ORIGIN}/showreel`,
  ogTitle: "Showreel — Video, Editing & Motion | Threshold Works",
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Showreel", url: `${SITE_ORIGIN}/showreel` }])],
};

export function getPageMeta(path: string): PageMeta {
  const slug = pathToSlug(path);
  if (slug === "") return HOME_META;
  if (slug === "about") return ABOUT_META;
  if (slug === "case-studies") return CASE_STUDIES_META;
  if (slug === "insights") return INSIGHTS_META;
  if (slug === "privacy") return PRIVACY_META;
  if (slug === "terms") return TERMS_META;
  if (slug === "portfolio") return PORTFOLIO_META;
  if (slug === "showreel") return SHOWREEL_META;
  if (slug === "ar") return AR_HOME_META;

  // Arabic service pages.
  if (slug.startsWith("ar/")) {
    const ar = getServicePageAr(slug.slice("ar/".length));
    if (ar) {
      return {
        title: ar.metaTitle,
        description: ar.metaDescription,
        canonical: `${SITE_ORIGIN}/ar/${ar.slug}`,
        ogTitle: ar.metaTitle,
        ogImage: `${SITE_ORIGIN}/brand/og/${ar.slug}.png`,
        alternates: serviceAlternates(ar.slug),
      };
    }
  }

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
    alternates: serviceAlternates(page.slug),
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
  if (m.noindex) {
    tags.push(`<meta name="robots" content="noindex, follow" />`);
  }
  for (const a of m.alternates ?? []) {
    tags.push(`<link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`);
  }
  for (const node of m.jsonLd ?? []) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(node)}</script>`,
    );
  }
  return tags.join("\n    ");
}

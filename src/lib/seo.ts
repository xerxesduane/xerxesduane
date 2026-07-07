import { SERVICE_PAGES, getServicePage } from "../data/servicePages";
import { CASE_STUDIES, FAQS } from "../data/content";
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
  /** Open Graph locale for the route. Defaults to English. */
  locale?: "en_US" | "ar_AR";
  /** hreflang alternates (en/ar/x-default) for bilingual pages. */
  alternates?: { hreflang: string; href: string }[];
}

/** Reciprocal hreflang set for a service page that has an Arabic version. */
function serviceAlternates(slug: string): { hreflang: string; href: string }[] {
  if (!getServicePageAr(slug)) {
    return [
      { hreflang: "en", href: `${SITE_ORIGIN}/${slug}` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}/${slug}` },
    ];
  }
  return [
    { hreflang: "en", href: `${SITE_ORIGIN}/${slug}` },
    { hreflang: "ar", href: `${SITE_ORIGIN}/ar/${slug}` },
    { hreflang: "x-default", href: `${SITE_ORIGIN}/${slug}` },
  ];
}

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/brand/og-image.png`;
const SERVICE_OG_IMAGES = new Set([
  "odoo-erp-dubai",
  "web-development-dubai",
  "ai-automation-dubai",
  "seo-dubai",
  "answer-engine-optimization-dubai",
  "generative-engine-optimization-dubai",
  "custom-software-development-dubai",
  "crm-development-dubai",
  "mobile-app-development-dubai",
  "ecommerce-development-dubai",
  "landing-page-design-dubai",
  "branding-graphic-design-dubai",
  "videography-photography-dubai",
  "video-editing-dubai",
]);

function serviceOgImage(slug: string): string {
  return SERVICE_OG_IMAGES.has(slug)
    ? `${SITE_ORIGIN}/brand/og/${slug}.png`
    : DEFAULT_OG_IMAGE;
}

/**
 * Bump this when a share image changes. Facebook/WhatsApp/LinkedIn cache the
 * OG image by URL for weeks, so a versioned query string forces them to fetch
 * the current image instead of serving a stale (or wrong) cached one.
 */
const OG_IMAGE_VERSION = "7";

/** Absolute, cache-busted share-image URL for a page. */
function ogImageUrl(image?: string): string {
  return `${image ?? DEFAULT_OG_IMAGE}?v=${OG_IMAGE_VERSION}`;
}

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
  title: "Xerxes Duane - Independent Systems Consultant in Dubai",
  description:
    "Websites, CRM, Odoo/ERP, WhatsApp, automation, ads, and AI connected into one practical operating system for small businesses.",
  canonical: `${SITE_ORIGIN}/`,
  ogTitle: "Xerxes Duane - Independent Systems Consultant in Dubai",
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
    ...CASE_STUDIES.map((study) => `/case-studies/${study.slug}`),
    "/portfolio",
    "/showreel",
    "/ai-lab",
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
  title: "Xerxes Duane | استوديو تقني للأعمال الصغيرة في دبي",
  description:
    "استوديو تقني متكامل في دبي للأعمال الصغيرة: مواقع وتطبيقات وأنظمة أودو ERP وأتمتة وذكاء اصطناعي وتحسين محركات البحث. احجز تدقيقًا مجانيًا لأنظمتك.",
  canonical: `${SITE_ORIGIN}/ar`,
  ogTitle: "Xerxes Duane | استوديو تقني للأعمال الصغيرة في دبي",
  ogImage: `${SITE_ORIGIN}/brand/og/ar-home.png`,
  locale: "ar_AR",
  alternates: HOME_ALTERNATES,
};

const ABOUT_META: PageMeta = {
  title: "About - Xerxes Duane",
  description:
    "Independent systems consultant in Dubai helping small businesses connect websites, CRM, Odoo/ERP, automation, ads, WhatsApp, and AI.",
  canonical: `${SITE_ORIGIN}/about`,
  ogTitle: "About - Xerxes Duane",
  ogImage: `${SITE_ORIGIN}/brand/og/about.png`,
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        "@id": `${SITE_ORIGIN}/#xerxes`,
        name: "Xerxes Duane",
        jobTitle: "Independent Systems Consultant",
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
  title: "Work - Xerxes Duane",
  description:
    "Real examples of websites, systems, automations, SEO, AI tools, and business workflows built to save time and increase leads.",
  canonical: `${SITE_ORIGIN}/case-studies`,
  ogTitle: "Work - Xerxes Duane",
  ogImage: `${SITE_ORIGIN}/brand/og/case-studies.png`,
  jsonLd: [
    breadcrumb([HOME_CRUMB, { name: "Case Studies", url: `${SITE_ORIGIN}/case-studies` }]),
  ],
};

const INSIGHTS_META: PageMeta = {
  title: "Insights - Xerxes Duane",
  description:
    "Xerxes Duane shares plain-English thinking on systems, Odoo, automation, and growth for small businesses in Dubai and beyond.",
  canonical: `${SITE_ORIGIN}/insights`,
  ogTitle: "Insights - Xerxes Duane",
  ogImage: `${SITE_ORIGIN}/brand/og/insights.png`,
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Insights", url: `${SITE_ORIGIN}/insights` }])],
};

const PRIVACY_META: PageMeta = {
  title: "Privacy Policy - Xerxes Duane",
  description:
    "How Xerxes Duane collects and uses information: contact enquiries, consent-based analytics, cookies, and your choices. Plain language, no data selling.",
  canonical: `${SITE_ORIGIN}/privacy`,
  ogTitle: "Privacy Policy - Xerxes Duane",
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Privacy Policy", url: `${SITE_ORIGIN}/privacy` }])],
};

const TERMS_META: PageMeta = {
  title: "Terms of Use - Xerxes Duane",
  description:
    "The terms for using the Xerxes Duane website: quotes, intellectual property, external links, liability, and governing law (UAE).",
  canonical: `${SITE_ORIGIN}/terms`,
  ogTitle: "Terms of Use - Xerxes Duane",
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Terms of Use", url: `${SITE_ORIGIN}/terms` }])],
};

const PORTFOLIO_META: PageMeta = {
  title: "Portfolio - Xerxes Duane",
  description:
    "Xerxes Duane's portfolio of website and brand & graphic design work for businesses across the UAE and beyond. See the craft, then book a free systems audit.",
  canonical: `${SITE_ORIGIN}/portfolio`,
  ogTitle: "Portfolio - Xerxes Duane",
  ogImage: `${SITE_ORIGIN}/brand/og/portfolio.png`,
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Portfolio", url: `${SITE_ORIGIN}/portfolio` }])],
};

const SHOWREEL_META: PageMeta = {
  title: "Showreel - Xerxes Duane",
  description:
    "Xerxes Duane's video production, editing, color grading, and animation: events, documentaries, social reels, and brand work across the UAE and beyond.",
  canonical: `${SITE_ORIGIN}/showreel`,
  ogTitle: "Showreel - Xerxes Duane",
  ogImage: `${SITE_ORIGIN}/brand/og/showreel.png`,
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "Showreel", url: `${SITE_ORIGIN}/showreel` }])],
};

const AI_LAB_META: PageMeta = {
  title: "AI Lab - Xerxes Duane",
  description:
    "A collection of practical AI tools and workflow experiments built for real business use cases.",
  canonical: `${SITE_ORIGIN}/ai-lab`,
  ogTitle: "AI Lab - Xerxes Duane",
  ogImage: `${SITE_ORIGIN}/brand/og/demos.png`,
  jsonLd: [breadcrumb([HOME_CRUMB, { name: "AI Lab", url: `${SITE_ORIGIN}/ai-lab` }])],
};

export function getPageMeta(path: string): PageMeta {
  const slug = pathToSlug(path);
  if (slug === "") return HOME_META;
  if (slug === "about") return ABOUT_META;
  if (slug === "ai-lab" || slug === "demos") return AI_LAB_META;
  if (slug === "case-studies") return CASE_STUDIES_META;
  if (slug.startsWith("case-studies/")) {
    const study = CASE_STUDIES.find((item) => item.slug === slug.slice("case-studies/".length));
    if (study) {
      const canonical = `${SITE_ORIGIN}/case-studies/${study.slug}`;
      return {
        title: `${study.client} - Xerxes Duane`,
        description:
          "A practical look at how connected systems, automation, websites, CRM, or AI improved a real business workflow.",
        canonical,
        ogTitle: `${study.client} - Xerxes Duane`,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${study.client} case study`,
            description: study.summary,
            author: { "@id": `${SITE_ORIGIN}/#xerxes` },
            publisher: { "@id": `${SITE_ORIGIN}/#org` },
            mainEntityOfPage: canonical,
          },
          breadcrumb([
            HOME_CRUMB,
            { name: "Case Studies", url: `${SITE_ORIGIN}/case-studies` },
            { name: study.client, url: canonical },
          ]),
        ],
      };
    }
  }
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
        ogImage: serviceOgImage(ar.slug),
        locale: "ar_AR",
        alternates: serviceAlternates(ar.slug),
      };
    }
  }

  if (slug.startsWith("insights/")) {
    const post = getInsight(slug.slice("insights/".length));
    if (post) {
      const canonical = `${SITE_ORIGIN}/insights/${post.slug}`;
      return {
        title: `${post.title} - Xerxes Duane`,
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
  if (!page) {
    return {
      title: "Page Not Found - Xerxes Duane",
      description:
        "This page could not be found. Return to Xerxes Duane's website to explore systems consulting, AI tools, services, and work.",
      canonical: `${SITE_ORIGIN}${path === "/__not-found__" ? "/404" : path}`,
      ogTitle: "Page Not Found - Xerxes Duane",
      noindex: true,
    };
  }

  const canonical = `${SITE_ORIGIN}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    canonical,
    ogTitle: page.ogTitle,
    ogImage: serviceOgImage(page.slug),
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
  const ogImage = ogImageUrl(m.ogImage);
  const locale = m.locale ?? "en_US";
  const localeAlternates = new Set<string>();
  if ((m.alternates ?? []).some((a) => a.hreflang === "ar") || locale === "ar_AR") {
    localeAlternates.add(locale === "ar_AR" ? "en_US" : "ar_AR");
  }
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    `<meta name="robots" content="${m.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}" />`,
    `<meta name="googlebot" content="${m.noindex ? "noindex, follow" : "index, follow"}" />`,
    `<meta property="og:url" content="${esc(m.canonical)}" />`,
    `<meta property="og:locale" content="${esc(locale)}" />`,
    ...[...localeAlternates].map((alt) => `<meta property="og:locale:alternate" content="${esc(alt)}" />`),
    `<meta property="og:title" content="${esc(m.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:image:secure_url" content="${esc(ogImage)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(m.ogTitle)}" />`,
    `<meta name="twitter:title" content="${esc(m.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${esc(m.ogTitle)}" />`,
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

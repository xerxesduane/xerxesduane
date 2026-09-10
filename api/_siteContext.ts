// Grounding for the site assistant (/api/assistant).
//
// The assistant answers from this site and nothing else, so rather than keeping
// a second copy of the copy in a hand-written knowledge base — which drifts the
// moment anyone edits src/data — it reads the site's OWN prerendered pages at
// request time. Every route is static HTML on the same deployment, so a fetch
// is cheap, always current, and literally sources the answer from the page a
// visitor could have read themselves.
//
// Retrieval is deliberately simple: the home page is always in context (it
// carries the pitch, services, packages, stats and FAQs), plus up to three
// more pages picked by keyword. On a 43-route site that beats an embedding
// index on every axis that matters here — no build step, no vector store, no
// drift, and a scoring function you can read.
import { fetchUrlText, isFetchableUrl } from "./_fetchUrl";

/** Always in context: the page that answers most questions on its own. */
const BASE_EN = "/";
const BASE_AR = "/ar";

/** How many keyword-matched pages to add on top of the base page. */
const EXTRA_PAGES = 3;

/** Per-page text budgets, in characters. Keeps a long page from crowding out
 *  the others and keeps the prompt predictable. */
const BASE_BUDGET = 9000;
const PAGE_BUDGET = 6000;

interface Route {
  path: string;
  /** Matched case-insensitively against the visitor's question. */
  keywords: string[];
}

/**
 * The routes worth reading, with the words a visitor would actually use.
 *
 * Not every route is here — /privacy, /terms and most insight posts are
 * reachable but rarely the answer to a chat question, and each one added is
 * prompt budget spent. The three articles that ARE listed earn it: cost and
 * "what happens first" are the questions every prospect asks, and the site
 * answers them there rather than on a service page. Arabic questions fall back
 * to the Arabic home page, which is the whole of the Arabic site's pitch.
 */
const ROUTES: Route[] = [
  {
    path: "/about",
    keywords: ["about", "who", "background", "experience", "story", "based", "located", "location", "dubai", "team", "founder", "independent", "since", "years"],
  },
  {
    path: "/case-studies",
    keywords: ["case", "study", "studies", "client", "clients", "work", "project", "projects", "portfolio", "example", "examples", "result", "results", "worked"],
  },
  {
    path: "/ai-lab",
    keywords: ["ai", "lab", "demo", "demos", "tool", "tools", "try", "playground", "chatbot", "bot", "agent", "automation", "llm", "model"],
  },
  {
    path: "/portfolio",
    keywords: ["portfolio", "showcase", "gallery", "creative", "visual"],
  },
  {
    path: "/showreel",
    keywords: ["showreel", "reel", "video", "videos", "film", "footage", "edit", "editing"],
  },
  {
    path: "/insights",
    keywords: ["insight", "insights", "article", "articles", "blog", "guide", "guides", "read", "write", "post"],
  },
  {
    path: "/odoo-erp-dubai",
    keywords: ["odoo", "erp", "inventory", "accounting", "stock", "warehouse", "manufacturing", "pos", "zoho", "sap", "quickbooks", "spreadsheet", "spreadsheets"],
  },
  {
    path: "/crm-development-dubai",
    keywords: ["crm", "pipeline", "pipelines", "lead", "leads", "deal", "deals", "sales", "follow", "customer", "contacts", "hubspot", "salesforce"],
  },
  {
    path: "/ai-automation-dubai",
    keywords: ["automation", "automate", "automated", "ai", "agent", "agents", "workflow", "workflows", "whatsapp", "chatbot", "bot", "integration", "integrate", "api", "zapier", "make", "n8n"],
  },
  {
    path: "/web-development-dubai",
    keywords: ["website", "web", "site", "develop", "development", "redesign", "wordpress", "react", "frontend", "hosting", "speed", "performance"],
  },
  {
    path: "/ecommerce-development-dubai",
    keywords: ["ecommerce", "e-commerce", "shop", "store", "storefront", "cart", "checkout", "shopify", "woocommerce", "payment", "payments", "products", "selling", "sell"],
  },
  {
    path: "/landing-page-design-dubai",
    keywords: ["landing", "page", "funnel", "conversion", "convert", "campaign", "lead", "capture", "form"],
  },
  {
    path: "/mobile-app-development-dubai",
    keywords: ["app", "apps", "mobile", "ios", "android", "native", "flutter", "play", "appstore"],
  },
  {
    path: "/custom-software-development-dubai",
    keywords: ["custom", "software", "bespoke", "platform", "system", "systems", "dashboard", "internal", "portal", "database"],
  },
  {
    path: "/seo-dubai",
    keywords: ["seo", "search", "google", "rank", "ranking", "rankings", "traffic", "keyword", "keywords", "organic", "backlink", "backlinks"],
  },
  {
    path: "/answer-engine-optimization-dubai",
    keywords: ["aeo", "answer", "engine", "featured", "snippet", "voice", "assistant", "perplexity"],
  },
  {
    path: "/generative-engine-optimization-dubai",
    keywords: ["geo", "generative", "chatgpt", "gemini", "claude", "cited", "citation", "llm", "mentioned"],
  },
  // Cost questions route HERE first. The page carries the whole rate card, the
  // budget package and the charity rate as plain text, so the assistant can
  // answer with a real figure instead of deflecting to a booking form.
  //
  // Still deliberately NOT /insights/website-cost-dubai: that guide quotes
  // what things go for in Dubai generally, and market figures sitting in the
  // assistant's context are figures it can misattribute as his rates. A prompt
  // rule asks it not to; leaving them out of the context means it cannot.
  {
    path: "/pricing",
    keywords: ["cost", "costs", "price", "prices", "pricing", "budget", "quote", "quotes", "much", "expensive", "cheap", "cheapest", "affordable", "afford", "rate", "rates", "fee", "fees", "charge", "charges", "ballpark", "estimate", "discount", "package", "packages", "nonprofit", "non-profit", "charity", "charities", "church", "churches", "ngo"],
  },
  // The budget question deserves the page that answers it in full. /pricing
  // gives the number; this gives the scope, which is what someone spending
  // their last 2,500 actually needs before they commit.
  {
    path: "/starter",
    keywords: ["starter", "cheapest", "budget", "afford", "affordable", "small", "simple", "basic", "minimum", "least", "fixed", "one-page", "onepage", "single", "tight"],
  },
  {
    path: "/insights/what-a-systems-audit-covers",
    keywords: ["proposal", "audit", "free", "consultation", "meeting", "call", "session", "expect", "start", "started", "starting", "begin", "first", "process", "onboarding"],
  },
  {
    path: "/insights/how-much-does-odoo-cost-dubai",
    keywords: ["cost", "costs", "price", "pricing", "budget", "licence", "license", "odoo", "erp", "seat", "seats", "users", "edition", "community", "enterprise"],
  },
  {
    path: "/branding-graphic-design-dubai",
    keywords: ["branding", "brand", "logo", "identity", "graphic", "graphics", "print", "collateral", "visual"],
  },
  {
    path: "/videography-photography-dubai",
    keywords: ["video", "videography", "photo", "photography", "shoot", "camera", "content", "reels"],
  },
  {
    path: "/video-editing-dubai",
    keywords: ["editing", "editor", "edit", "post", "production", "cut", "subtitles", "captions"],
  },
];

/** Words that carry no retrieval signal — they match everything or nothing. */
const STOP = new Set([
  "the", "and", "for", "you", "your", "can", "how", "what", "with", "have", "does", "did", "are", "was",
  "this", "that", "there", "here", "from", "will", "would", "could", "should", "many",
  "why", "when", "where", "which", "into", "out", "get", "got", "any", "all", "not", "but",
  "her", "they", "them", "its", "our", "one", "two", "please", "help", "need",
  "want", "like", "just", "make", "made", "give", "tell", "know", "look", "take", "some", "more",
  // Generic verbs and nouns that appear on every page: they match half the
  // index and drown the word that actually carries the question.
  "work", "works", "working", "build", "builds", "built", "building", "thing", "things",
  "service", "services", "offer", "offers", "provide", "guys",
]);

function tokenise(question: string): string[] {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

/**
 * Score every route against the question and return the best `EXTRA_PAGES`.
 *
 * A word is worth one point per route it hits, so a question naming a single
 * strong term ("odoo") lands on that service page, and a vaguer one ("how do
 * you build websites") spreads across a couple. Routes scoring zero are
 * dropped — padding the prompt with irrelevant pages makes answers worse, not
 * better, and the base page is already there.
 */
export function pickRoutes(question: string, limit = EXTRA_PAGES): string[] {
  const words = tokenise(question);
  if (words.length === 0) return [];
  const scored = ROUTES.map((route) => {
    let score = 0;
    for (const word of words) {
      if (route.keywords.includes(word)) score += 2;
      // A partial hit ("automations" → "automation") is worth less than an
      // exact one but still beats an unrelated page.
      else if (route.keywords.some((k) => k.length > 4 && (k.startsWith(word) || word.startsWith(k)))) score += 1;
    }
    return { path: route.path, score };
  });
  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.path);
}

// --- page cache -------------------------------------------------------------
// The pages are static per deployment, so a short in-isolate TTL turns a busy
// conversation into one fetch per page rather than one per turn. Per-isolate,
// like the in-memory rate limiter — a cache miss costs a fetch, never an error.
const TTL_MS = 15 * 60_000;
const CACHE = new Map<string, { text: string; at: number }>();

async function pageText(origin: string, path: string, budget: number): Promise<string | null> {
  const url = `${origin}${path}`;
  const hit = CACHE.get(url);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.text;

  const safe = isFetchableUrl(url);
  if (!safe) return null;
  try {
    const text = (await fetchUrlText(safe)).slice(0, budget);
    if (CACHE.size > 200) CACHE.clear();
    CACHE.set(url, { text, at: Date.now() });
    return text;
  } catch {
    // A page that won't load is a page the assistant answers without. Never
    // fail the whole reply over one fetch.
    return null;
  }
}

/**
 * Assemble the grounding context for a question: the base page plus the pages
 * its keywords point at, each labelled with the path it came from so the model
 * can name where an answer lives ("that's on the Odoo page").
 */
export async function buildSiteContext(
  origin: string,
  question: string,
  locale: "en" | "ar",
): Promise<string> {
  const base = locale === "ar" ? BASE_AR : BASE_EN;
  const paths = [base, ...pickRoutes(question).filter((p) => p !== base)];
  const pages = await Promise.all(
    paths.map((path, i) => pageText(origin, path, i === 0 ? BASE_BUDGET : PAGE_BUDGET)),
  );
  return paths
    .map((path, i) => (pages[i] ? `<page path="${path}">\n${pages[i]}\n</page>` : null))
    .filter(Boolean)
    .join("\n\n");
}

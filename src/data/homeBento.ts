import {
  Boxes,
  Braces,
  Bot,
  CloudUpload,
  LineChart,
  MessageCircle,
  PanelsTopLeft,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { CASE_STUDIES, SERVICES } from "./content";
import { WEB_DESIGNS } from "./workItems";

/* ---------------------------------------------------------------------------
 * Homepage data.
 *
 * Everything here is drawn from work that actually exists in this repo or in
 * data/content.ts. No invented tools, metrics, reviews or credentials.
 * ------------------------------------------------------------------------- */

export interface Tool {
  label: string;
  icon: LucideIcon;
}

/**
 * The stack actually in use — evidenced by the service pages, the case studies
 * and this project's own dependencies. Labels only: no third-party logos are
 * bundled, so nothing here needs a trademark licence.
 */
export const TOOLS: Tool[] = [
  { label: "Odoo ERP", icon: Boxes },
  { label: "React & TypeScript", icon: Braces },
  { label: "Tailwind CSS", icon: PanelsTopLeft },
  { label: "Claude", icon: Bot },
  { label: "Gemini", icon: Sparkles },
  { label: "Groq", icon: Sparkles },
  { label: "Vercel", icon: CloudUpload },
  { label: "Meta Ads", icon: LineChart },
  { label: "Google Ads", icon: LineChart },
  { label: "WhatsApp Business", icon: MessageCircle },
];

/** Core offerings, trimmed to the compact card. */
export const CORE_SERVICES = SERVICES.slice(0, 5).map((s) => s.title);

/**
 * Documented outcomes, pulled straight from the case studies that carry real
 * measured numbers. Case studies without metrics are represented by scope
 * instead, so nothing is inflated into a statistic it never was.
 */
export interface FeaturedResult {
  slug: string;
  client: string;
  category: string;
  location: string;
  stats: { value: string; label: string }[];
}

export const FEATURED_RESULTS: FeaturedResult[] = CASE_STUDIES.filter(
  (study) => study.stats && study.stats.length > 0,
).map((study) => ({
  slug: study.slug,
  client: study.client,
  category: study.category,
  location: study.location,
  stats: study.stats!.slice(0, 3),
}));

/**
 * Previews shown in the Projects card.
 *
 * Drawn from the portfolio's own screenshot set, filtered to the builds whose
 * client is identified (they carry the live site's URL), so every image is a
 * real screenshot of the site it is captioned with — no logo stands in for a
 * screenshot, and no screenshot is captioned with the wrong client.
 *
 * `title` is "Client · descriptor" in workItems.ts; the split keeps the client
 * name on its own line and the descriptor beneath it.
 */
export const FEATURED_PROJECTS = WEB_DESIGNS.filter((item) => item.href)
  .slice(0, 3)
  .map((item) => {
    const [client, ...restOfTitle] = item.title.split(" · ");
    return {
      client: client.trim(),
      descriptor: restOfTitle.join(" · ").trim(),
      image: item.thumb,
      /** Full original title, for the image's alt text. */
      title: item.title,
    };
  });

export const HERO = {
  // Plain words on purpose: the people this is for run 2-10 person businesses
  // in a city where English is often a second language, so "systems", "stack"
  // and "wired" are words they skim past. Short also buys fold space, and the
  // home page has to land inside one viewport.
  headline: "Less admin. More business.",
  // The headline is memorable but says nothing about the offer, so this line
  // carries the whole "what and for whom". Literal on purpose: it is also what
  // a search engine or an AI assistant will quote when describing the site.
  subhead: "Websites, CRM, Odoo and AI automation for small businesses in Dubai.",
  ctaLabel: "Get in touch",
  // /contact, not /#contact: the home page no longer carries a contact
  // section, so the anchor it used to target isn't there to scroll to.
  ctaHref: "/contact",
};

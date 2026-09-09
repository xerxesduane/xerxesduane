import {
  Bot,
  FolderOpen,
  House,
  Layers,
  MessageCircleQuestion,
  User,
  type LucideIcon,
} from "lucide-react";
import { CONTACT } from "./content";

/* ---------------------------------------------------------------------------
 * Shell data — the profile sidebar's identity and the site's primary
 * destinations. Presentation lives in components/shell; this file is the only
 * place the nav is defined, so the desktop rail and the mobile bar can never
 * drift apart.
 * ------------------------------------------------------------------------- */

export interface ShellNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Extra paths that should light this item up (e.g. detail routes). */
  matches?: string[];
}

export const SHELL_NAV: ShellNavItem[] = [
  { label: "Home", href: "/", icon: House },
  {
    label: "Projects",
    href: "/case-studies",
    icon: FolderOpen,
    matches: ["/case-studies", "/portfolio", "/showreel"],
  },
  { label: "Services", href: "/#services", icon: Layers },
  { label: "AI Lab", href: "/ai-lab", icon: Bot },
  { label: "About", href: "/about", icon: User, matches: ["/about", "/insights"] },
  { label: "FAQs / Contact", href: "/#contact", icon: MessageCircleQuestion },
];

export const SHELL_IDENTITY = {
  name: "Xerxes Duane",
  handle: "@xerxesduane",
  /** Positioning line — kept factual, no metrics or availability claims. */
  tagline: "Independent systems consultant",
  location: "Dubai & the UAE",
  portrait: "/brand/portrait-560.webp",
  portraitFallback: "/brand/founder-xerxes.jpg",
};

export interface ShellSocial {
  label: string;
  href: string;
  /** Simple-icons style path is overkill here; lucide covers what we need. */
  kind: "linkedin" | "instagram" | "whatsapp" | "email";
}

/** Only accounts that actually exist. Nothing invented. */
export const SHELL_SOCIALS: ShellSocial[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/xerxesduane", kind: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/xerxes.duane", kind: "instagram" },
  { label: "WhatsApp", href: `https://wa.me/${CONTACT.whatsapp}`, kind: "whatsapp" },
  { label: "Email", href: `mailto:${CONTACT.email}`, kind: "email" },
];

/**
 * True when `path` should light up `item`. Exact match for the homepage so
 * every route doesn't inherit it; prefix match for section roots.
 */
export function isNavActive(item: ShellNavItem, path: string): boolean {
  const clean = path.split("#")[0].replace(/\/+$/, "") || "/";
  if (item.href.startsWith("/#")) return false;
  if (item.href === "/") return clean === "/";
  const candidates = item.matches ?? [item.href];
  return candidates.some((c) => clean === c || clean.startsWith(c + "/"));
}

import {
  MessageSquareReply,
  ReceiptText,
  GitBranch,
  CornerDownLeft,
  ScanSearch,
  Route,
  type LucideIcon,
} from "lucide-react";

export interface AiLabCard {
  /** Matches a demo `id` in src/pages/Demos.tsx — the card links to /ai-lab#<demoId>. */
  demoId: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  whatItDoes: string;
  example: string;
  cta: string;
}

// Six business-outcome framed entry points into the live AI Lab. Each one maps
// to a real demo already available on /ai-lab.
export const AI_LAB_CARDS: AiLabCard[] = [
  {
    demoId: "leadresponse",
    icon: MessageSquareReply,
    title: "WhatsApp Lead Handler",
    problem: "Leads come in through WhatsApp but get missed, delayed, or handled inconsistently.",
    whatItDoes:
      "AI qualifies the enquiry, suggests a reply, and flags the next step — before a human takes over.",
    example: "A customer asks about availability, pricing, or booking.",
    cta: "Try WhatsApp AI",
  },
  {
    demoId: "quote",
    icon: ReceiptText,
    title: "UAE VAT Quote Builder",
    problem: "Quoting is slow, messy, or inconsistent across the team.",
    whatItDoes: "AI turns rough job notes into a clean, itemized quote with 5% UAE VAT and a total.",
    example: "AC servicing for 3 units in Dubai Marina with callout and parts.",
    cta: "Build a quote",
  },
  {
    demoId: "pipeline",
    icon: GitBranch,
    title: "Odoo Readiness Scanner",
    problem: "The business is ready for better systems but doesn't know what to move into Odoo first.",
    whatItDoes:
      "AI reviews how you sell and proposes the pipeline stages, fields, and automations a CRM or Odoo setup needs.",
    example: "Sales enquiries come from Instagram, WhatsApp, and walk-ins. Stock is tracked manually.",
    cta: "Scan my workflow",
  },
  {
    demoId: "reply",
    icon: CornerDownLeft,
    title: "Arabic-English Reply Assistant",
    problem: "Customer replies need to sound professional, warm, and clear — in English, Arabic, or both.",
    whatItDoes: "AI drafts a ready-to-send reply in the right tone, for sales, support, reviews, or bookings.",
    example: "A customer is upset about a delayed delivery.",
    cta: "Test bilingual AI",
  },
  {
    demoId: "aeo",
    icon: ScanSearch,
    title: "AI Search Visibility Checker",
    problem: "Customers are starting to search through ChatGPT-style tools, not just Google.",
    whatItDoes: "AI checks how clearly a business is positioned for AI search and suggests what to fix.",
    example: "A dental clinic in Jumeirah offering Invisalign and family dentistry.",
    cta: "Check visibility",
  },
  {
    demoId: "process",
    icon: Route,
    title: "Workflow Automation Finder",
    problem: "Teams waste hours repeating admin tasks that could be automated.",
    whatItDoes:
      "AI maps a manual workflow and suggests practical automations across forms, CRM, Odoo, email, or WhatsApp.",
    example: "Every enquiry gets copied from WhatsApp into Excel, then sent manually to the sales team.",
    cta: "Find automations",
  },
];

export const AI_LAB_TRUST = ["Live demos", "No sign-up", "Use sample data", "Built around UAE workflows"];

import { Bot, Boxes, Check, CircleDollarSign, Film, LayoutDashboard, Palette, Search, ShoppingBag, Smartphone } from "lucide-react";
import type { ServicePageData } from "../data/servicePages";
import Reveal from "./ui/Reveal";

const visualType = (slug: string) => {
  if (slug.includes("odoo") || slug.includes("software")) return "system";
  if (slug.includes("crm") || slug.includes("ai")) return "workflow";
  if (slug.includes("ecommerce") || slug.includes("landing")) return "conversion";
  if (slug.includes("mobile") || slug.includes("web-development")) return "product";
  if (slug.includes("branding") || slug.includes("video")) return "creative";
  return "search";
};

const visualContent = {
  system: {
    icon: Boxes,
    label: "Connected operations",
    title: "One flow. One source of truth.",
    nodes: ["Enquiry", "Quotation", "Inventory", "Delivery"],
  },
  workflow: {
    icon: LayoutDashboard,
    label: "Clearer workflows",
    title: "The next action is always visible.",
    nodes: ["Capture", "Qualify", "Assign", "Follow up"],
  },
  conversion: {
    icon: ShoppingBag,
    label: "Conversion journey",
    title: "Less friction between interest and action.",
    nodes: ["Visit", "Understand", "Trust", "Convert"],
  },
  product: {
    icon: Smartphone,
    label: "Digital product",
    title: "Useful on every screen.",
    nodes: ["Discover", "Use", "Return", "Grow"],
  },
  creative: {
    icon: Palette,
    label: "Creative system",
    title: "A consistent idea across every format.",
    nodes: ["Strategy", "Create", "Adapt", "Publish"],
  },
  search: {
    icon: Search,
    label: "Search visibility",
    title: "Built to become the useful answer.",
    nodes: ["Question", "Content", "Authority", "Citation"],
  },
};

export default function ServiceVisual({ page }: { page: ServicePageData }) {
  const content = visualContent[visualType(page.slug)];
  const Icon = content.icon;

  return (
    <section className="pb-16 sm:pb-24" aria-label={`${page.navLabel} visual overview`}>
      <div className="container-bl">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-cream p-6 text-ink shadow-[0_30px_120px_-70px_rgba(218,164,66,0.9)] sm:p-9">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(218,164,66,0.35),transparent_36%),linear-gradient(135deg,rgba(11,15,13,0.04),transparent_45%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold">
                  <Icon size={24} strokeWidth={1.7} />
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">{content.label}</p>
                <h2 className="mt-3 max-w-sm text-3xl leading-tight !text-ink sm:text-4xl">{content.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
                  Every build starts with the real journey, then removes the friction, repeated work, and blind spots around it.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-ink p-4 sm:p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gold">Working model</span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-cream/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> live flow
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {content.nodes.map((node, index) => (
                    <div key={node} className="group rounded-xl border border-cream/10 bg-cream/[0.04] p-4 transition-colors hover:border-gold/35 hover:bg-gold/[0.08]">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-gold/70">{String(index + 1).padStart(2, "0")}</span>
                        <Check size={14} className="text-gold" />
                      </div>
                      <p className="mt-5 text-sm font-semibold text-cream">{node}</p>
                      <div className="mt-3 h-1 rounded-full bg-cream/8">
                        <div className="h-full rounded-full bg-gold/70" style={{ width: `${52 + index * 13}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[Bot, CircleDollarSign, Film].map((SmallIcon, index) => (
                    <div key={index} className="flex min-h-14 items-center justify-center rounded-xl border border-cream/8 text-gold/55">
                      <SmallIcon size={17} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useState } from "react";
import { m } from "framer-motion";
import { Globe, Megaphone, Users, Boxes, Sparkles, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import { useReducedMotionPref } from "../lib/usePrefs";
import SectionHeading from "./ui/SectionHeading";

type Node = { id: string; label: string; icon: LucideIcon; x: number; y: number; desc: string };

// Coordinates live in an 800×600 viewBox; HTML nodes are positioned by the same
// fractions so the SVG connectors and the node chips always line up at any size.
const HUB = { x: 400, y: 300 };
const NODES: Node[] = [
  { id: "website", label: "Website", icon: Globe, x: 180, y: 140, desc: "Captures every enquiry and pushes it straight into your system — no copy-paste, nothing slips." },
  { id: "ads", label: "Ads", icon: Megaphone, x: 620, y: 140, desc: "Google & Meta spend tied to real outcomes, with every lead flowing into the CRM automatically." },
  { id: "crm", label: "CRM", icon: Users, x: 668, y: 340, desc: "Every lead, conversation and follow-up in one place your team actually uses." },
  { id: "erp", label: "ERP / Odoo", icon: Boxes, x: 400, y: 470, desc: "Sales, inventory, purchasing and accounting on one shared source of truth." },
  { id: "ai", label: "AI", icon: Sparkles, x: 132, y: 340, desc: "Assistants and agents that answer, qualify and automate across the whole stack — the demos in my AI Lab, wired into your tools." },
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export default function ConnectedSystems() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotionPref();
  const activeNode = NODES.find((n) => n.id === active) ?? null;

  return (
    <section id="connected" className="scroll-mt-24 py-20 sm:py-28" aria-label="The whole stack, connected">
      <div className="container-bl">
        <SectionHeading
          eyebrow="The whole stack"
          title={
            <>
              Your tools, finally <span className="text-gradient-gold">talking to each other.</span>
            </>
          }
          subtitle="Most businesses run on disconnected apps. I wire your website, ads, CRM, ERP and AI into one flow — so a lead becomes a customer without anything falling through the cracks."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-12 max-w-3xl"
        >
          <m.div variants={fadeUp} className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            {/* connector + pulse layer */}
            <svg
              viewBox="0 0 800 600"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
              preserveAspectRatio="xMidYMid meet"
            >
              {NODES.map((n) => {
                const on = active === n.id || active === null;
                return (
                  <line
                    key={n.id}
                    x1={n.x}
                    y1={n.y}
                    x2={HUB.x}
                    y2={HUB.y}
                    stroke={active === n.id ? "#DAA442" : "rgba(218,164,66,0.28)"}
                    strokeWidth={active === n.id ? 2 : 1.25}
                    strokeDasharray="2 7"
                    strokeLinecap="round"
                    opacity={on ? 1 : 0.25}
                  />
                );
              })}
              {/* data pulses flowing into the hub (omitted under reduced motion) */}
              {!reduced &&
                NODES.map((n, i) => (
                  <m.circle
                    key={`p-${n.id}`}
                    r={3.5}
                    fill="#DAA442"
                    initial={false}
                    animate={{ cx: [n.x, HUB.x], cy: [n.y, HUB.y], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: i * 0.52 }}
                  />
                ))}
            </svg>

            {/* hub */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(HUB.x, 800), top: pct(HUB.y, 600) }}
            >
              <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-gold/40 bg-ink-surface text-gold shadow-[0_0_50px_-8px_rgba(218,164,66,0.55)] sm:h-24 sm:w-24">
                <span aria-hidden className="absolute inset-0 rounded-2xl bg-gold/10 motion-safe:animate-pulse-glow" />
                <Network size={26} strokeWidth={1.6} className="relative" />
                <span className="relative mt-1 px-1 text-center font-mono text-[8.5px] uppercase leading-tight tracking-wider text-gold/90">
                  One system
                </span>
              </div>
            </div>

            {/* nodes */}
            {NODES.map((n) => {
              const Icon = n.icon;
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(n.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((cur) => (cur === n.id ? null : n.id))}
                  aria-pressed={isActive}
                  className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl outline-none"
                  style={{ left: pct(n.x, 800), top: pct(n.y, 600) }}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl border bg-ink-surface transition-all duration-300 sm:h-14 sm:w-14 ${
                      isActive
                        ? "border-gold/60 text-gold shadow-[0_0_28px_-6px_rgba(218,164,66,0.7)]"
                        : "border-cream/12 text-cream-dim group-hover:border-gold/40"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      isActive ? "text-gold" : "text-muted-dark"
                    }`}
                  >
                    {n.label}
                  </span>
                </button>
              );
            })}
          </m.div>

          {/* caption — announces the highlighted node */}
          <m.p
            variants={fadeUp}
            aria-live="polite"
            className="mx-auto mt-6 min-h-[3rem] max-w-xl text-center text-sm leading-relaxed text-muted"
          >
            {activeNode ? (
              <>
                <span className="font-semibold text-cream">{activeNode.label}: </span>
                {activeNode.desc}
              </>
            ) : (
              <span className="text-muted-dark">
                Hover or tap any part of the stack to see how it connects. One flow, one source of truth.
              </span>
            )}
          </m.p>
        </m.div>
      </div>
    </section>
  );
}

import { m } from "framer-motion";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import Kinetic from "../components/fx/Kinetic";
import Contact from "../components/Contact";
import { fadeUp, stagger } from "../lib/motion";

const FOCUS = [
  "Start by understanding how your business actually operates",
  "Replace manual, duplicated work with systems that run themselves",
  "Build for scale, so the tools still fit as you grow",
  "Shape everything around your real operations, not a generic template",
];

const PROJECTS = [
  "Construction and manufacturing workflows",
  "E-commerce and lead-management systems",
  "Inventory operations",
  "Website builds and integrations",
  "Marketing automation",
  "Customer-management platforms",
];

export default function About() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="container-bl">
          <m.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <m.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              About
            </m.span>
            <Kinetic as="h1" className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
              The person behind <span className="text-gradient-gold italic">Threshold Works.</span>
            </Kinetic>
          </m.div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-bl">
          <div className="mx-auto grid max-w-4xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="glass border-glow rounded-3xl p-7 text-center">
                <img
                  src="/brand/founder-xerxes.jpg"
                  alt="Xerxes Duane, founder and lead consultant of Threshold Works"
                  width={120}
                  height={120}
                  className="mx-auto h-28 w-28 rounded-2xl object-cover ring-1 ring-gold/30"
                />
                <h2 className="mt-5 font-display text-2xl text-cream">Xerxes Duane</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-gold/80">
                  Founder &amp; Lead Consultant
                </p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 text-xs text-muted">
                  <MapPin size={13} className="text-gold" />
                  Dubai · serving across borders
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-[17px] leading-relaxed text-muted">
                <p>
                  I help growing businesses run on systems that actually work
                  together. Instead of a website in one place, spreadsheets in
                  another, and a handful of apps that don't talk to each other, I
                  connect sales, CRM, inventory, purchasing, accounting, your
                  website, and your day-to-day workflows into one platform your
                  team will genuinely use.
                </p>
                <p>
                  My work sits in the gap between off-the-shelf tools that never
                  quite fit and expensive enterprise consultants who bill for
                  layers most businesses don't need. I build practical, scalable
                  systems around how your business really operates, often on
                  flexible platforms like Odoo, but the tool is always chosen to
                  fit the problem rather than the other way around.
                </p>
                <p className="text-cream-dim">My approach is simple:</p>
                <ul className="space-y-2.5">
                  {FOCUS.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-base text-cream-dim">
                      <Check size={18} className="mt-1 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-bl">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-mono text-xs uppercase tracking-wider text-gold">
              Recent work spans
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <li key={p} className="glass rounded-xl px-5 py-4 text-sm text-cream-dim">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[17px] leading-relaxed text-muted">
              Alongside client work, I lead digital for{" "}
              <a
                href="https://fellowshipdubai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dim underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold"
              >
                Fellowship Dubai
              </a>
              , a multi-site church in Dubai, looking after their website design
              and development, their Google Business Profile and local search,
              and the content and digital marketing across Facebook and Instagram.
            </p>
            <p className="mt-6 font-display text-xl italic text-gold">
              Whatever the project, the standard stays the same: smart systems,
              honest work, and results you can measure. I do this through my
              Dubai studio, Threshold Works.
            </p>
            <div className="mt-8">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.7)] transition duration-300 hover:bg-gold-soft"
              >
                Book your free systems audit
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}

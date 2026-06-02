import { ArrowUpRight, Check, MapPin } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import Contact from "../components/Contact";

const FOCUS = [
  "Understand how the business actually operates",
  "Eliminate manual processes and duplicated work",
  "Build scalable systems that teams can adopt",
  "Customize Odoo around real operational needs",
];

const PROJECTS = [
  "Construction and manufacturing workflows",
  "E-commerce and lead management systems",
  "Inventory operations and purchasing",
  "Website and CRM integrations",
  "Marketing automation and customer management",
];

export default function About() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="container-bl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              About
            </span>
            <h1 className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
              The person behind <span className="text-gradient-gold italic">Threshold Works.</span>
            </h1>
          </div>
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
                  I help businesses streamline operations by building and
                  customizing Odoo-based business systems that connect sales, CRM,
                  inventory, purchasing, accounting, websites, and internal
                  workflows into a single platform.
                </p>
                <p>
                  While not an official Odoo Partner, I specialize in Odoo
                  implementation, customization, automation, and business process
                  development for companies that need practical solutions rather
                  than expensive enterprise consulting layers.
                </p>
                <p className="text-cream-dim">My focus is simple:</p>
                <ul className="space-y-2.5">
                  {FOCUS.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-base text-cream-dim">
                      <Check size={18} className="mt-1 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p>
                  Recent projects include construction and manufacturing-related
                  workflows, e-commerce and lead management systems, inventory
                  operations, website integrations, marketing automation, and
                  customer management platforms.
                </p>
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
            <p className="mt-8 font-display text-xl italic text-gold">
              Whether you need a new Odoo deployment, process optimization, or
              custom development, I help turn fragmented operations into
              structured, measurable systems.
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

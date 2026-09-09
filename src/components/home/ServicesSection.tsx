import { m } from "framer-motion";
import SystemDiagram from "./SystemDiagram";
import { SERVICES } from "../../data/content";
import { fadeUp, stagger, VIEWPORT } from "../../lib/motion";

/**
 * Light, compact services list for the homepage.
 *
 * Replaces the previous full-bleed black video section, which could not sit on
 * the warm canvas. Keeps `id="services"` so the existing /#services links —
 * nav, footer, and inbound links — still land in the right place.
 */
export default function ServicesSection() {
  return (
    <m.section
      id="services"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="scroll-mt-24 py-14 sm:py-16"
      aria-label="What I build"
    >
      <m.header variants={fadeUp} className="mb-6 max-w-2xl">
        <span className="eyebrow">Services</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          What I build
        </h2>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-fg-soft">
          One connected setup rather than a stack of tools that never speak to each other.
        </p>
      </m.header>

      <m.div variants={fadeUp}>
        <SystemDiagram />
      </m.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <m.article
              key={service.title}
              variants={fadeUp}
              className="group flex flex-col gap-2 rounded-card border border-line bg-panel p-5 shadow-card transition duration-300 ease-smooth hover:-translate-y-[3px] hover:border-accent/45 hover:shadow-card-hover"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[0.85rem] bg-accent text-accent-ink shadow-[0_6px_14px_-8px_rgb(var(--c-accent))] transition duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:-rotate-6">
                <Icon size={19} strokeWidth={2.2} aria-hidden />
              </span>
              <h3 className="mt-1 font-display text-base font-bold text-fg transition-colors duration-300 group-hover:text-accent-deep">
                {service.title}
              </h3>
              <p className="text-sm leading-snug text-fg-soft">{service.description}</p>
              {service.price && (
                <p className="mt-auto pt-2 font-display text-xs font-bold uppercase tracking-wide text-accent-deep">
                  {service.price}
                </p>
              )}
            </m.article>
          );
        })}
      </div>
    </m.section>
  );
}

import { m } from "framer-motion";
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
      </m.header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <m.article
              key={service.title}
              variants={fadeUp}
              className="flex flex-col gap-2 rounded-card border border-line bg-panel p-5 shadow-card transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-ink">
                <Icon size={18} strokeWidth={2.1} aria-hidden />
              </span>
              <h3 className="mt-1 font-display text-base font-bold text-fg">
                {service.title}
              </h3>
              <p className="text-sm leading-snug text-fg-soft">{service.description}</p>
              {service.price && (
                <p className="mt-auto pt-2 font-display text-xs font-bold uppercase tracking-wide text-accent">
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

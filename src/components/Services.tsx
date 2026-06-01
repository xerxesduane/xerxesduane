import { m } from "framer-motion";
import { SERVICES } from "../data/content";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="What we build"
          title={
            <>
              One studio. <span className="text-gradient-gold">The whole stack.</span>
            </>
          }
          subtitle="Most studios sell you one piece. We build the whole system, and the AI that ties it all together."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <m.article
                key={s.title}
                variants={scaleIn}
                className={`glass glass-hover group relative flex flex-col rounded-2xl p-6 ${
                  s.featured
                    ? "border-glow sm:col-span-2 lg:row-span-2 lg:p-8"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors group-hover:bg-gold/15 ${
                    s.featured ? "h-14 w-14" : "h-12 w-12"
                  }`}
                >
                  <Icon size={s.featured ? 28 : 22} strokeWidth={1.6} />
                </div>

                <h3
                  className={`mt-5 font-display text-cream ${
                    s.featured ? "text-2xl lg:text-3xl" : "text-xl"
                  }`}
                >
                  {s.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-gold/80">
                  {s.tagline}
                </p>
                <p
                  className={`mt-3 text-muted ${
                    s.featured ? "text-base lg:text-lg lg:max-w-md" : "text-sm"
                  }`}
                >
                  {s.description}
                </p>

                {s.featured && (
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-widest text-gold">
                    <span className="h-px w-8 bg-gold/50" />
                    Featured capability
                  </span>
                )}
              </m.article>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

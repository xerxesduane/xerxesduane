import { m } from "framer-motion";
import { INDUSTRIES } from "../data/content";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Industries() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Industries we serve"
          title={
            <>
              Built for the businesses{" "}
              <span className="text-gradient-gold">we believe in.</span>
            </>
          }
          subtitle="We work best with small, owner-led businesses, where the founder still picks up the phone, and good tech can quietly change everything."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <m.article
                key={ind.name}
                variants={scaleIn}
                className={`glass glass-hover group flex flex-col rounded-2xl p-6 ${
                  ind.mission ? "ring-1 ring-olive-light/25" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/5 text-gold ring-1 ring-cream/10 transition-colors group-hover:bg-gold/10">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  {ind.mission && (
                    <span className="rounded-full bg-olive-light/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-sage">
                      Mission-driven
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg text-cream">{ind.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{ind.blurb}</p>
                {ind.worked && (
                  <p className="mt-4 inline-flex w-fit rounded-md bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold/90">
                    {ind.worked}
                  </p>
                )}
              </m.article>
            );
          })}
        </m.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-dark">
          Also serving legal services, clinics, consultancies, real estate,
          trading companies, restaurants, and design studios.{" "}
          <a href="#contact" className="text-gold hover:text-gold-soft">
            Not sure if we're a fit? Book a free audit →
          </a>
        </p>
      </div>
    </section>
  );
}

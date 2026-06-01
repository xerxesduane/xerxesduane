import { m } from "framer-motion";
import { STATS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Counter from "./ui/Counter";

export default function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-bl">
        <div className="glass border-glow relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4"
          >
            {STATS.map((s) => (
              <m.div key={s.label} variants={fadeUp}>
                <div className="font-display text-4xl font-semibold text-gold sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mx-auto mt-3 max-w-[14ch] text-sm text-muted">
                  {s.label}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

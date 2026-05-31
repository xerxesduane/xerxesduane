import { motion } from "framer-motion";
import { LAYERS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Layers() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="The system"
          title={
            <>
              Four layers, <span className="text-gradient-gold">built to work together.</span>
            </>
          }
          subtitle="Most agencies sell you Layer 3. We build all four, because the marketing doesn't work if the foundation is broken."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {LAYERS.map((layer) => (
            <motion.div
              key={layer.no}
              variants={fadeUp}
              className="glass glass-hover relative overflow-hidden rounded-2xl p-6"
            >
              <span className="font-mono text-5xl font-semibold text-cream/8">
                {layer.no}
              </span>
              <h3 className="mt-2 text-xl text-cream">{layer.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gold/80">
                {layer.items}
              </p>
              <p className="mt-3 text-sm text-muted">{layer.blurb}</p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

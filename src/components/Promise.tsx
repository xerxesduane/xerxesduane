import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { PROMISE } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Reveal from "./ui/Reveal";

export default function Promise() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-bl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">The Threshold Works promise</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">
            We earn trust the <span className="text-gradient-gold">slow way.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="glass rounded-2xl p-7"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              What you'll never get
            </h3>
            <ul className="mt-5 space-y-3">
              {PROMISE.never.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <X size={17} className="mt-0.5 shrink-0 text-muted-dark" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="glass border-glow rounded-2xl p-7"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-gold">
              What you'll always get
            </h3>
            <ul className="mt-5 space-y-3">
              {PROMISE.always.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-cream"
                >
                  <Check size={17} className="mt-0.5 shrink-0 text-gold" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

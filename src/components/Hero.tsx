import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { fadeUp, stagger, EASE } from "../lib/motion";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="container-bl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cream-dim/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            All-in-one tech studio · Dubai
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-4xl leading-[1.04] sm:text-6xl md:text-7xl"
          >
            Your business is paying for
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold italic">tech you don't use.</span>
            <br className="hidden sm:block" /> Let's find out how much.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl"
          >
            Threshold Works is the all-in-one tech studio for small businesses in Dubai
            that can't afford a full tech team. Websites, marketing, automation,
            and AI, built honestly, by one trusted partner.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.8)] transition duration-300 hover:bg-gold-soft sm:w-auto"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/40 blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />
              Book your free audit
              <ArrowUpRight size={17} strokeWidth={2.5} />
            </a>
            <a
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
            >
              See how we work
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs text-muted"
          >
            <span className="inline-flex items-center gap-1 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>Quietly trusted since 2019</span>
            <span className="text-muted-dark">·</span>
            <span>Dubai → New Zealand</span>
            <span className="text-muted-dark">·</span>
            <span>60-min audit, zero pressure</span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        className="mt-16 flex justify-center"
        aria-hidden
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/20 p-1">
          <span className="h-2 w-1 animate-scroll-cue rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}

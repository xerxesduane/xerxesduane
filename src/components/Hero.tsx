import { m } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { fadeUp, stagger, EASE } from "../lib/motion";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="container-bl">
        <m.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <m.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cream-dim/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            All-in-one tech studio · Dubai
          </m.span>

          <m.h1
            variants={fadeUp}
            className="mt-7 text-4xl leading-[1.04] sm:text-6xl md:text-7xl"
          >
            Big-company systems for{" "}
            <span className="text-gradient-gold italic">small businesses</span>
            <br className="hidden sm:block" /> that can't afford a tech team.
          </m.h1>

          <m.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl"
          >
            Most small businesses in Dubai are duct-taping together a website,
            spreadsheets, and five apps that don't talk to each other. Threshold
            Works builds the websites, apps, ERP, automation, and AI that actually
            work together, honestly, under one roof, so you can stop managing tools
            and get back to growing.
          </m.p>

          <m.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#contact" className="w-full px-7 py-3.5 sm:w-auto">
              Book your free audit
              <ArrowUpRight size={17} strokeWidth={2.5} />
            </Button>
            <Button
              variant="ghost"
              href="#services"
              className="w-full px-7 py-3.5 sm:w-auto"
            >
              See how we work
            </Button>
          </m.div>

          <m.div
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
          </m.div>
        </m.div>
      </div>

      {/* scroll cue */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        className="mt-16 flex justify-center"
        aria-hidden
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/20 p-1">
          <span className="h-2 w-1 animate-scroll-cue rounded-full bg-gold" />
        </div>
      </m.div>
    </section>
  );
}

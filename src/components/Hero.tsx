import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, EASE } from "../lib/motion";
import Button from "./ui/Button";
import Magnetic from "./fx/Magnetic";
import Kinetic from "./fx/Kinetic";
import LogoDraw from "./fx/LogoDraw";
import VideoHero from "./fx/VideoHero";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* full-bleed footage layer (poster prerendered, video client-only) */}
      <VideoHero />
      {/* depth: faint golden-hour glow behind the doorway + headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_42%_at_50%_18%,rgba(218,164,66,0.10),transparent_70%)]"
      />
      <div className="container-bl">
        <m.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <LogoDraw className="mx-auto mb-7 h-14 w-14" />

          <m.span
            variants={fadeUp}
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cream-dim/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Independent Systems Consultant � Dubai
          </m.span>

          <Kinetic
            as="h1"
            className="mt-7 text-[2.15rem] leading-[1.07] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Big-company systems
            <br className="hidden sm:block" /> for small businesses
            <br />
            <span className="text-gradient-gold italic">that can't afford a tech team.</span>
          </Kinetic>

          <m.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl"
          >
            I help growing businesses in Dubai turn disconnected websites,
            CRMs, spreadsheets, ads, and WhatsApp messages into one connected
            system — built clearly, run honestly, and designed to bring in
            leads, save time, and support real growth.
          </m.p>

          <m.p
            variants={fadeUp}
            className="mx-auto mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dark"
          >
            Websites · CRM · Odoo/ERP · Automation · AI
          </m.p>

          <m.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic strength={0.3} className="w-full sm:w-auto">
              <Button href="#contact" className="w-full px-7 py-3.5 sm:w-auto">
                Book your free systems audit
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </Button>
            </Magnetic>
            <Button
              variant="ghost"
              href="/ai-lab"
              className="w-full px-7 py-3.5 sm:w-auto"
            >
              See the AI Lab
            </Button>
          </m.div>

          <m.p
            variants={fadeUp}
            className="mx-auto mt-5 font-mono text-[11px] tracking-wide text-muted-dark"
          >
            Free · 60 minutes · no lock-in · you own everything I build
          </m.p>

          <m.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs text-muted"
          >
            <span>50+ businesses helped since 2019</span>
            <span className="text-muted-dark">·</span>
            <span>Dubai to New Zealand</span>
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

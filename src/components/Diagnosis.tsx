import { m } from "framer-motion";
import { Globe, Receipt, Target, CreditCard } from "lucide-react";
import { EASE, fadeUp, VIEWPORT } from "../lib/motion";

const PAINS = [
  { icon: Globe, text: "Your website doesn't talk to your CRM." },
  { icon: Receipt, text: "Your CRM doesn't talk to your invoicing." },
  { icon: Target, text: "Your ads spend money on people who'll never convert." },
  { icon: CreditCard, text: "And you're paying for software you don't fully use." },
];

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const delayedFadeUp = (delay: number) => ({
  hidden: fadeUp.hidden,
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

const cardsReveal = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.22 },
  },
};

export default function Diagnosis() {
  return (
    <section
      id="opportunity"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 py-28 sm:py-32"
      aria-label="The opportunity"
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-ink/65" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <m.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={fadeUp}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-gold sm:text-sm">
            THE OPPORTUNITY
          </p>
          <h2 className="font-display text-5xl leading-[0.9] tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-8xl">
            Most small businesses in Dubai are one connected system away from{" "}
            <span className="text-gold">real growth.</span>
          </h2>
        </m.div>

        <m.p
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={delayedFadeUp(0.12)}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream-dim sm:text-lg"
        >
          Great marketing brings you leads. Systems that actually work together
          turn those leads into paying customers, and hand you back your time.
        </m.p>

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={cardsReveal}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2"
        >
          {PAINS.map((p) => (
            <m.div
              key={p.text}
              variants={fadeUp}
              className="liquid-glass flex items-start gap-5 rounded-[1.5rem] px-6 py-6 text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
                <p.icon size={19} strokeWidth={1.8} />
              </span>
              <p className="text-[15px] leading-relaxed text-cream sm:text-base">{p.text}</p>
            </m.div>
          ))}
        </m.div>

        <m.p
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={delayedFadeUp(0.28)}
          className="mx-auto mt-16 max-w-3xl font-display text-2xl leading-snug text-cream sm:text-3xl"
        >
          You don't need more tools. You need someone to look at the whole
          picture, fix what's broken, and connect the system around how your
          business actually works.
        </m.p>
      </div>
    </section>
  );
}

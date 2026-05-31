import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import type { ServicePageData } from "../data/servicePages";
import { CASE_STUDIES } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Reveal from "../components/ui/Reveal";
import Process from "../components/Process";
import Promise from "../components/Promise";
import Contact from "../components/Contact";

export default function ServicePage({ page }: { page: ServicePageData }) {
  const Icon = page.icon;
  const proof = page.caseStudyClient
    ? CASE_STUDIES.find((c) => c.client === page.caseStudyClient)
    : undefined;

  return (
    <>
      {/* Header */}
      <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="container-bl">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold"
            >
              <Icon size={14} strokeWidth={1.8} />
              {page.eyebrow}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl"
            >
              {page.h1Lead}{" "}
              <span className="text-gradient-gold italic">{page.h1Accent}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl"
            >
              {page.lede}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="#contact"
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.8)] transition duration-300 hover:bg-gold-soft sm:w-auto"
              >
                Book your free systems audit
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
              <a
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
              >
                <ArrowLeft size={16} strokeWidth={2.2} />
                Back to everything we do
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 sm:py-24">
        <div className="container-bl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">{page.bulletsHeading}</h2>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          >
            {page.bullets.map((b) => (
              <motion.article
                key={b.title}
                variants={fadeUp}
                className="glass glass-hover rounded-2xl p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Check size={18} strokeWidth={2.4} />
                </span>
                <h3 className="mt-4 text-lg text-cream">{b.title}</h3>
                <p className="mt-2 text-sm text-muted">{b.body}</p>
              </motion.article>
            ))}
          </motion.div>

          {/* Who it's for */}
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
            <div className="glass rounded-2xl p-7">
              <h3 className="font-mono text-xs uppercase tracking-wider text-gold">
                {page.forWhoHeading}
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {page.forWho.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm text-cream-dim">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Proof */}
          {proof && (
            <Reveal delay={0.15} className="mx-auto mt-6 max-w-2xl">
              <div className="glass border-glow rounded-2xl p-7">
                <span className="font-mono text-xs uppercase tracking-wider text-gold/80">
                  {proof.location} · {proof.category}
                </span>
                <p className="mt-3 text-base text-cream-dim">{proof.challenge}</p>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {proof.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-2xl text-gold">{s.value}</div>
                      <div className="mt-1 text-xs text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-display text-base italic text-cream">
                  {proof.takeaway}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Process />
      <Promise />
      <Contact />
    </>
  );
}

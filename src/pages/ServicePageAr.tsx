import { m } from "framer-motion";
import { ArrowUpRight, Check, CalendarCheck, MessageCircle } from "lucide-react";
import type { ServicePageAr as ArPage } from "../data/servicePagesAr";
import { AR_UI } from "../data/servicePagesAr";
import { CONTACT } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Reveal from "../components/ui/Reveal";
import FaqList from "../components/FaqList";

const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "مرحبًا Xerxes Duane، أودّ حجز تدقيق مجاني لأنظمتي.",
)}`;

export default function ServicePageAr({ page }: { page: ArPage }) {
  return (
    <>
      {/* Header */}
      <section id="top" className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="container-bl">
          <div className="mx-auto mb-6 flex max-w-3xl justify-center">
            <a
              href={`/${page.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 font-mono text-xs text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
            >
              {AR_UI.english}
            </a>
          </div>
          <m.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <m.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-gold"
            >
              {page.eyebrow}
            </m.span>
            <m.h1 variants={fadeUp} className="mt-7 text-3xl leading-[1.4] sm:text-4xl md:text-5xl">
              {page.h1}
            </m.h1>
            <m.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-lg leading-loose text-muted">
              {page.lede}
            </m.p>
            <m.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft sm:w-auto"
              >
                <MessageCircle size={17} />
                {AR_UI.bookAudit}
              </a>
              <a
                href={CONTACT.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
              >
                <CalendarCheck size={16} />
                {AR_UI.bookInstantly}
              </a>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 sm:py-20">
        <div className="container-bl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl">{page.bulletsHeading}</h2>
          </Reveal>
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          >
            {page.bullets.map((b) => (
              <m.article key={b.title} variants={fadeUp} className="glass glass-hover rounded-2xl p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Check size={18} strokeWidth={2.4} />
                </span>
                <h3 className="mt-4 text-lg text-cream">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
              </m.article>
            ))}
          </m.div>

          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
            <div className="glass rounded-2xl p-7">
              <h3 className="font-mono text-xs uppercase tracking-wider text-gold">{page.forWhoHeading}</h3>
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
        </div>
      </section>

      <FaqList heading={page.faqsHeading} items={page.faqs} />

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
        <div className="container-bl">
          <div className="glass border-glow mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-10">
            <h2 className="text-2xl sm:text-3xl">
              مستعد للبدء؟ <span className="text-gradient-gold">احجز تدقيقك المجاني.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              ٦٠ دقيقة، بلا ضغط. تخرج بخريطة واضحة لأنظمتك وثلاثة مكاسب سريعة يمكنك تطبيقها فورًا.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft sm:w-auto"
              >
                <MessageCircle size={17} />
                {CONTACT.whatsappDisplay}
              </a>
              <a
                href={`/${page.slug}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
              >
                {AR_UI.english}
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

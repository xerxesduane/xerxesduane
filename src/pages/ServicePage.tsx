import { m } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { SERVICE_PAGES, type ServicePageData } from "../data/servicePages";
import { getServicePageAr } from "../data/servicePagesAr";
import { CASE_STUDIES } from "../data/content";
import { INSIGHTS } from "../data/insights";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Reveal from "../components/ui/Reveal";
import Process from "../components/Process";
import Promise from "../components/Promise";
import FaqList from "../components/FaqList";
import Contact from "../components/Contact";

export default function ServicePage({ page }: { page: ServicePageData }) {
  const Icon = page.icon;
  const proof = page.caseStudyClient
    ? CASE_STUDIES.find((c) => c.client === page.caseStudyClient)
    : undefined;
  const relatedPosts = INSIGHTS.filter((p) =>
    p.relatedServices?.includes(page.slug),
  ).slice(0, 3);
  const hasArabicPage = Boolean(getServicePageAr(page.slug));

  return (
    <>
      {/* Header */}
      <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="container-bl">
          {hasArabicPage && <div className="mx-auto mb-6 flex max-w-3xl justify-center">
            <a
              href={`/ar/${page.slug}`}
              lang="ar"
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 font-mono text-xs text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
            >
              العربية
            </a>
          </div>}
          <m.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <m.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold"
            >
              <Icon size={14} strokeWidth={1.8} />
              {page.eyebrow}
            </m.span>

            <m.h1
              variants={fadeUp}
              className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl"
            >
              {page.h1Lead}{" "}
              <span className="text-gradient-gold italic">{page.h1Accent}</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl"
            >
              {page.lede}
            </m.p>

            {page.price && (
              <m.p
                variants={fadeUp}
                className="mt-6 font-mono text-sm text-gold"
              >
                {page.price}
                <span className="text-muted-dark">
                  {" "}
                  · fixed quote after your free audit
                </span>
              </m.p>
            )}

            <m.div
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
            </m.div>
          </m.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 sm:py-24">
        <div className="container-bl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">{page.bulletsHeading}</h2>
          </Reveal>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          >
            {page.bullets.map((b) => (
              <m.article
                key={b.title}
                variants={fadeUp}
                className="glass glass-hover rounded-2xl p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Check size={18} strokeWidth={2.4} />
                </span>
                <h3 className="mt-4 text-lg text-cream">{b.title}</h3>
                <p className="mt-2 text-sm text-muted">{b.body}</p>
              </m.article>
            ))}
          </m.div>

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
                {proof.stats && (
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {proof.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-2xl text-gold">{s.value}</div>
                        <div className="mt-1 text-xs text-muted">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                {proof.scope && (
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {proof.scope.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-cream-dim">
                        <Check size={15} className="shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
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

      <FaqList heading={`${page.navLabel} questions, answered`} items={page.faqs} />

      {/* Cross-links to the other services */}
      <section className="py-16 sm:py-20" aria-label="Other services">
        <div className="container-bl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl">
              Need more than {page.navLabel}?{" "}
              <span className="text-gradient-gold">It all connects.</span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {SERVICE_PAGES.filter((p) => p.slug !== page.slug).slice(0, 6).map((p) => {
              const PIcon = p.icon;
              return (
                <a
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="glass glass-hover group flex items-center gap-3 rounded-2xl p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                    <PIcon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-medium text-cream transition-colors group-hover:text-gold">
                    {p.navLabel}
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wider text-muted">
                      in Dubai
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="pb-16 sm:pb-20" aria-label="Related reading">
          <div className="container-bl">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-mono text-xs uppercase tracking-wider text-gold">
                From the blog
              </h2>
              <ul className="mt-4 space-y-3">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`/insights/${p.slug}`}
                      className="text-cream-dim transition-colors hover:text-gold"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <Contact />
    </>
  );
}

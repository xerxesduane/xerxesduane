import { m } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import type { CaseStudy } from "../data/content";
import { SERVICE_PAGES } from "../data/servicePages";
import { fadeUp, stagger } from "../lib/motion";
import Contact from "../components/Contact";
import Reveal from "../components/ui/Reveal";

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const services = SERVICE_PAGES.filter((service) =>
    study.relatedServices.includes(service.slug),
  );

  return (
    <>
      <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="container-bl">
          <m.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl">
            <m.a
              variants={fadeUp}
              href="/case-studies"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} />
              All case studies
            </m.a>
            <m.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gold">
                {study.category}
              </span>
              <span className="font-mono text-xs text-muted-dark">{study.location}</span>
            </m.div>
            <m.h1 variants={fadeUp} className="mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
              {study.client}
            </m.h1>
            <m.p variants={fadeUp} className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              {study.summary}
            </m.p>
          </m.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-bl">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal className="glass border-glow rounded-3xl p-7 sm:p-10">
              <span className="font-mono text-xs uppercase tracking-wider text-gold">Before</span>
              <h2 className="mt-4 text-3xl text-cream sm:text-4xl">What needed to change</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {study.challenge}
              </p>
              <div className="mt-9 border-t border-cream/10 pt-8">
                <span className="font-mono text-xs uppercase tracking-wider text-gold">What changed</span>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {study.approach.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream-dim">
                      <Check size={17} className="mt-0.5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="glass rounded-3xl p-7 sm:p-8">
              {study.image && (
                <div className="flex min-h-40 items-center justify-center rounded-2xl border border-cream/10 bg-cream p-8">
                  <img src={study.image} alt={`${study.client} project`} className="max-h-28 max-w-full object-contain" />
                </div>
              )}
              {study.stats && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-gold">Measured result</span>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {study.stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-cream/8 bg-ink-deep/40 p-4">
                        <div className="font-mono text-2xl font-semibold text-gold">{stat.value}</div>
                        <div className="mt-1 text-xs text-muted">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {study.scope && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-gold">Delivered</span>
                  <ul className="mt-4 space-y-3">
                    {study.scope.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-cream-dim">
                        <Check size={15} className="shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {study.url && (
                <a href={study.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-soft">
                  Visit live site <ExternalLink size={15} />
                </a>
              )}
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-16 max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-gold">The outcome</span>
            <p className="mt-5 font-display text-3xl italic leading-tight text-cream sm:text-4xl">
              {study.takeaway}
            </p>
            <a
              href="/#contact"
              data-cursor="link"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
            >
              Want a result like this? Book your free audit
              <ArrowUpRight size={15} />
            </a>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <a key={service.slug} href={`/${service.slug}`} className="glass glass-hover group rounded-2xl p-5">
                  <Icon size={20} className="text-gold" />
                  <h2 className="mt-4 text-base text-cream group-hover:text-gold">{service.navLabel}</h2>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Explore service <ArrowUpRight size={11} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}

import { m } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../data/content";
import { fadeUp, scaleIn, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Services() {
  const featured = SERVICES.find((service) => service.featured) ?? SERVICES[0];
  const supporting = SERVICES.filter((service) => service.title !== featured.title);
  const FeaturedIcon = featured.icon;

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_68%)]"
      />
      <div className="container-bl">
        <SectionHeading
          eyebrow="What we build"
          title={
            <>
              One studio. <span className="text-gradient-gold">The whole stack.</span>
            </>
          }
          subtitle="Most studios sell you one piece. We build the whole system, and the AI that ties it all together."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1.42fr)] lg:items-start"
        >
          <m.article
            variants={scaleIn}
            data-cursor="view"
            className="border-glow group relative flex flex-col overflow-hidden rounded-[2rem] border border-gold/25 bg-cream text-ink shadow-[0_30px_120px_-70px_rgba(218,164,66,0.95)] lg:sticky lg:top-28"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,15,13,0.05)_0%,transparent_42%),radial-gradient(circle_at_85%_10%,rgba(218,164,66,0.34),transparent_34%)]"
            />
            <div className="relative flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-gold shadow-[0_18px_45px_-24px_rgba(11,15,13,0.8)] transition-transform duration-300 group-hover:-translate-y-1">
                  <FeaturedIcon size={30} strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-deep">
                      {featured.tagline}
                    </p>
                    <span className="rounded-full border border-ink/10 bg-ink/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">
                      Featured
                    </span>
                  </div>
                  <h3 className="mt-3 text-3xl leading-[1.08] !text-ink sm:text-4xl">
                    {featured.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
                {featured.description}
              </p>

              <div className="mt-6 rounded-2xl border border-ink/10 bg-ink/[0.045] p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {["Workflows", "Assistants", "Lead handling", "Team time back"].map(
                    (item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full bg-cream/60 px-3 py-2 text-sm text-ink/75"
                      >
                        <CheckCircle2 size={15} className="shrink-0 text-gold-deep" />
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                {featured.price && (
                  <p className="font-mono text-sm font-semibold text-ink">
                    {featured.price}
                  </p>
                )}
                <a
                  href="#contact"
                  data-cursor="link"
                  className="group/link inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition duration-300 hover:bg-gold hover:text-ink"
                >
                  Scope this
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.3}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </m.article>

          <m.div
            variants={stagger}
            className="grid gap-3 sm:grid-cols-2"
          >
            {supporting.map((s, index) => {
              const Icon = s.icon;
              return (
                <m.article
                  key={s.title}
                  variants={fadeUp}
                  data-cursor="view"
                  className="glass glass-hover group relative min-h-56 overflow-hidden rounded-2xl p-5"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-gold group-hover:text-ink">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <span className="font-mono text-[10px] text-muted-dark">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl leading-tight text-cream transition-colors group-hover:text-gold">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gold/75">
                    {s.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-cream/8 pt-4">
                    {s.price && (
                      <p className="font-mono text-xs text-gold">{s.price}</p>
                    )}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.2}
                      className="shrink-0 text-muted-dark transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    />
                  </div>
                </m.article>
              );
            })}
          </m.div>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-cream/10 bg-cream/[0.04] px-5 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p className="text-sm text-muted-dark">
            Indicative starting prices. You get one fixed quote after your free
            audit, no surprises and no lock-in. Ad spend and software licences are
            billed separately.
          </p>
          <a
            href="#contact"
            data-cursor="link"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/30 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
          >
            Start with audit
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </a>
        </m.div>
      </div>
    </section>
  );
}

import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { SERVICE_PAGES } from "../data/servicePages";

export default function NotFound() {
  return (
    <section id="top" className="relative overflow-hidden pb-24">
      <div className="container-bl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            404
          </span>
          <h1 className="mt-7 text-4xl leading-[1.06] sm:text-5xl">
            This page took a wrong turn,{" "}
            <span className="text-gradient-gold italic">but your systems don't have to.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
            The page you're after doesn't exist or has moved. Let's get you back
            to something useful.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.8)] transition duration-300 hover:bg-gold-soft sm:w-auto"
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
              Back to home
            </a>
            <a
              href="/#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
            >
              Book a free audit
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
            {SERVICE_PAGES.map((p) => (
              <a
                key={p.slug}
                href={`/${p.slug}`}
                className="transition-colors hover:text-gold"
              >
                {p.navLabel}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

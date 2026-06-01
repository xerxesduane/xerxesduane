import { m } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { INSIGHTS, formatDate } from "../data/insights";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";

export default function Insights() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="container-bl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Insights
          </span>
          <h1 className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
            Plain-English answers <span className="text-gradient-gold italic">to real business questions.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl">
            No jargon, no fluff. Practical thinking on systems, Odoo, automation,
            and growth for small businesses in Dubai and beyond.
          </p>
          <div className="mt-9">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-6 py-3 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold"
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
              Back to home
            </a>
          </div>
        </div>

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2"
        >
          {INSIGHTS.map((post) => (
            <m.article key={post.slug} variants={fadeUp}>
              <a
                href={`/insights/${post.slug}`}
                className="glass glass-hover group flex h-full flex-col rounded-2xl p-7"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-muted-dark">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-4 font-display text-xl text-cream transition-colors group-hover:text-gold sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted">{post.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-gold">
                  Read
                  <ArrowUpRight size={14} strokeWidth={2.4} />
                </span>
              </a>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

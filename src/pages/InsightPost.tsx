import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { type InsightPost as Post, formatDate } from "../data/insights";
import { INSIGHTS } from "../data/insights";
import { getServicePage } from "../data/servicePages";
import Contact from "../components/Contact";

function Body({ blocks }: { blocks: Post["body"] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2 key={i} className="pt-2 font-display text-2xl text-cream sm:text-3xl">
              {b.text}
            </h2>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="space-y-2.5">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[17px] leading-relaxed text-muted">
                  <Check size={18} className="mt-1 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-gold/50 pl-5 font-display text-xl italic text-cream-dim"
            >
              {b.text}
            </blockquote>
          );
        }
        return (
          <p key={i} className="text-[17px] leading-relaxed text-muted">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export default function InsightPost({ post }: { post: Post }) {
  const others = INSIGHTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const related = (post.relatedServices ?? [])
    .map((slug) => getServicePage(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <article className="pt-36 pb-16 sm:pt-44">
        <div className="container-bl">
          <div className="mx-auto max-w-2xl">
            <a
              href="/insights"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-gold transition-colors hover:text-gold-soft"
            >
              <ArrowLeft size={14} strokeWidth={2.4} />
              All insights
            </a>

            <h1 className="mt-6 font-display text-3xl leading-tight text-cream sm:text-4xl md:text-[2.75rem]">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-3 font-mono text-xs text-muted-dark">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{formatDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>

            <hr className="my-9 border-cream/8" />

            <Body blocks={post.body} />

            <div className="mt-12 rounded-2xl glass border-glow p-7 text-center">
              <p className="font-display text-xl text-cream">
                Want this mapped for your business?
              </p>
              <a
                href="/#contact"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.7)] transition duration-300 hover:bg-gold-soft"
              >
                Book your free systems audit
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
            </div>

            {related.length > 0 && (
              <div className="mt-14">
                <h2 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
                  Related services
                </h2>
                <ul className="mt-4 space-y-3">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={`/${s.slug}`}
                        className="text-cream-dim transition-colors hover:text-gold"
                      >
                        {s.navLabel} in Dubai
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {others.length > 0 && (
              <div className="mt-14">
                <h2 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
                  Keep reading
                </h2>
                <ul className="mt-4 space-y-3">
                  {others.map((p) => (
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
            )}
          </div>
        </div>
      </article>

      <Contact />
    </>
  );
}

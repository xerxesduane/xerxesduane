import { Plus } from "lucide-react";

interface FaqListProps {
  heading?: string;
  items: { q: string; a: string }[];
}

/**
 * Accessible FAQ accordion using native <details>/<summary>: no JS required,
 * content always present in the DOM (good for SEO and the prerendered HTML).
 *
 * Used by the service pages; the homepage uses the animated variant in
 * components/FAQ.tsx. Both share the same card treatment so they read as one
 * pattern across the site.
 */
export default function FaqList({ heading = "Questions, answered", items }: FaqListProps) {
  return (
    <section className="py-12 sm:py-16" aria-label="Frequently asked questions">
      <h2 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
        {heading}
      </h2>
      <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-panel shadow-card">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start transition-colors marker:content-[''] hover:bg-panel-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6 sm:py-5">
              <span className="font-display text-[1.02rem] font-bold text-fg transition-colors group-open:text-accent-deep sm:text-lg">
                {f.q}
              </span>
              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-panel-alt text-fg-soft transition duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-accent group-open:text-accent-ink"
              >
                <Plus size={17} strokeWidth={2.4} />
              </span>
            </summary>
            <p className="max-w-prose px-5 pb-5 text-[0.95rem] leading-relaxed text-fg-soft sm:px-6">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

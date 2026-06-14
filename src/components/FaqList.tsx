import { Plus } from "lucide-react";

interface FaqListProps {
  heading?: string;
  items: { q: string; a: string }[];
}

/**
 * Accessible FAQ accordion using native <details>/<summary>: no JS required,
 * content always present in the DOM (good for SEO and the prerendered HTML).
 */
export default function FaqList({ heading = "Questions, answered", items }: FaqListProps) {
  return (
    <section className="py-16 sm:py-24" aria-label="Frequently asked questions">
      <div className="container-bl">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl sm:text-4xl">{heading}</h2>
          <div className="mt-10 divide-y divide-cream/8 border-y border-cream/8">
            {items.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-start text-cream marker:content-['']">
                  <span className="font-display text-lg">{f.q}</span>
                  <Plus
                    size={18}
                    className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="pb-5 pe-8 text-[15px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

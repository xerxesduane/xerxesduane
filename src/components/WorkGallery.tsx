import { useCallback, useEffect, useState } from "react";
import { m } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { wipeReveal } from "../lib/motion";
import type { WorkItem } from "../data/workItems";

export default function WorkGallery({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) =>
      setActive((cur) =>
        cur === null ? null : (cur + d + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4">
        {items.map((it, i) => (
          <figure key={it.src} className="break-inside-avoid">
            <m.button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View ${it.title}`}
              data-cursor="view"
              variants={wipeReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="glass glass-hover block w-full overflow-hidden rounded-xl"
            >
              <img
                src={it.thumb}
                width={it.w}
                height={it.h}
                loading="lazy"
                alt={it.title}
                className="w-full"
              />
            </m.button>
            {it.href && (
              <figcaption className="mt-2 flex items-center justify-between gap-2 px-1 text-xs">
                <span className="text-cream-dim">{it.title}</span>
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-gold hover:underline"
                >
                  Live site <ArrowUpRight size={12} />
                </a>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-deep/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className="flex max-h-[90vh] max-w-full flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[active].src}
              alt={items[active].title}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            {items[active].href && (
              <a
                href={items[active].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition-colors hover:bg-gold-soft"
              >
                Visit {items[active].title.split(" — ")[0]} live
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}

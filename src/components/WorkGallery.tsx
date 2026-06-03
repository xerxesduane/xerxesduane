import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View ${it.label} ${i + 1}`}
            className="glass glass-hover block w-full overflow-hidden rounded-xl"
          >
            <img
              src={it.thumb}
              width={it.w}
              height={it.h}
              loading="lazy"
              alt={`${it.label} ${i + 1}`}
              className="w-full"
            />
          </button>
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
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold"
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
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <img
            src={items[active].src}
            alt={`${items[active].label} ${active + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}

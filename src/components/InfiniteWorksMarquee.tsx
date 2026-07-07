import { MARQUEE_IMAGES } from "../data/studioMarquee";

/**
 * Infinite horizontal strip of interface-direction GIFs (reference works).
 * These are visual directions the studio can build toward — NOT client work,
 * and the eyebrow copy says so.
 */
export default function InfiniteWorksMarquee() {
  // Duplicate the 8 works for a seamless -50% translate loop (16 items total).
  const items = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section
      aria-label="Interface directions we can build"
      className="studio-reference-page studio-reference-section w-full overflow-hidden py-16 md:py-20"
    >
      <p className="font-studio-pixel mb-6 px-6 text-center text-xs uppercase text-[color:var(--studio-muted)]">
        Interface directions we can build
      </p>
      <div className="w-full overflow-hidden">
        <div className="flex w-max animate-studio-marquee">
          {items.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Interface preview"
              loading="lazy"
              aria-hidden={i >= MARQUEE_IMAGES.length}
              className="mx-3 h-[280px] w-auto rounded-2xl object-cover shadow-lg md:h-[500px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

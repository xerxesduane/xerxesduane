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
      className="studio-reference-page mb-16 mt-16 w-full overflow-hidden bg-[#FDFCFA] md:mt-20"
    >
      <p className="font-studio-body mb-6 px-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-[#273C46]">
        Interface directions we can build
      </p>
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
    </section>
  );
}

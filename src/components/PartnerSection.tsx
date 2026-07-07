import { useCallback, useRef, useState } from "react";
import Button from "./Button";
import { CONTACT } from "../data/content";
import { MARQUEE_IMAGES } from "../data/studioMarquee";

interface Thumb {
  id: number;
  x: number;
  y: number;
  rotation: number;
  src: string;
}

/**
 * Reference partner CTA: hovering the big white container spawns GIF thumbnails
 * at the cursor that fade/scale out. Disabled on coarse pointers and reduced
 * motion.
 */
export default function PartnerSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  // Only affects pointer behavior (never markup), so a lazy init is SSR-safe.
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const lastSpawn = useRef(0);
  const nextId = useRef(0);
  const imgIndex = useRef(0);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !containerRef.current) return;
      const now = performance.now();
      if (now - lastSpawn.current < 80) return;
      lastSpawn.current = now;

      const rect = containerRef.current.getBoundingClientRect();
      const thumb: Thumb = {
        id: nextId.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        rotation: Math.random() * 20 - 10,
        src: MARQUEE_IMAGES[imgIndex.current++ % MARQUEE_IMAGES.length],
      };
      setThumbs((t) => [...t.slice(-11), thumb]);
      // Remove after the 1000ms fade-out completes.
      setTimeout(() => {
        setThumbs((t) => t.filter((x) => x.id !== thumb.id));
      }, 1000);
    },
    [enabled],
  );

  return (
    <section
      aria-labelledby="partner-heading"
      className="studio-reference-page studio-reference-section w-full px-6 py-12"
    >
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        className="studio-reference-panel relative mx-auto max-w-7xl overflow-hidden rounded-[40px] py-48"
      >
        {thumbs.map((t) => (
          <img
            key={t.id}
            src={t.src}
            alt=""
            aria-hidden
            className="studio-thumb-fade pointer-events-none absolute h-28 w-40 rounded-xl object-cover shadow-lg"
            style={{
              left: t.x,
              top: t.y,
              transform: `translate(-50%, -50%) rotate(${t.rotation}deg)`,
            }}
          />
        ))}

        <div className="relative flex flex-col items-center px-6 text-center">
          <h2
            id="partner-heading"
            className="font-studio-serif mb-12 text-[54px] leading-none text-[color:var(--studio-gold)] md:text-[72px] lg:text-[96px]"
          >
            Partner with Xerxes
          </h2>
          <Button variant="primary" href={CONTACT.calendar} target="_blank" rel="noopener">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[10px] font-semibold">
              XD
            </span>
            Book a free systems audit
          </Button>
        </div>
      </div>
    </section>
  );
}

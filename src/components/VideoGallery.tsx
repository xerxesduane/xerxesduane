import { useState } from "react";
import { Play } from "lucide-react";
import { m } from "framer-motion";
import { VIDEOS } from "../data/videos";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";

/**
 * Click-to-play YouTube gallery. Renders lightweight thumbnails (no YouTube
 * cookies/scripts until the visitor clicks play). No-JS users get a normal
 * link to YouTube.
 *
 * Six across on the board: twelve videos in three rows of four ran 1,647px,
 * and the thumbnail is a target to click, not something to read. The tag moves
 * onto the still so the caption is a single line of title.
 */
export default function VideoGallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 board:grid-cols-6"
    >
      {VIDEOS.map((v) => (
        <m.figure
          key={v.id}
          variants={scaleIn}
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-video">
            <span className="pointer-events-none absolute end-2 top-2 z-10 rounded-full bg-ink-deep/75 px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-gold/95 board:text-[0.7rem] backdrop-blur-sm">
              {v.tag}
            </span>
            {active === v.id ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <a
                href={`https://youtu.be/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setActive(v.id);
                }}
                aria-label={`Play video: ${v.title}`}
                data-cursor="play"
                className="group absolute inset-0 block"
              >
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ink-deep/30 transition-colors group-hover:bg-ink-deep/15" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-fg-onSolid shadow-solid transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                </span>
              </a>
            )}
          </div>
          <figcaption className="px-3 py-2">
            <span className="block truncate text-sm text-cream board:text-[0.8rem]" title={v.title}>
              {v.title}
            </span>
          </figcaption>
        </m.figure>
      ))}
    </m.div>
  );
}

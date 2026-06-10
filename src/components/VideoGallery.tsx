import { useState } from "react";
import { Play } from "lucide-react";
import { m } from "framer-motion";
import { VIDEOS } from "../data/videos";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";

/**
 * Click-to-play YouTube gallery. Renders lightweight thumbnails (no YouTube
 * cookies/scripts until the visitor clicks play). No-JS users get a normal
 * link to YouTube.
 */
export default function VideoGallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {VIDEOS.map((v) => (
        <m.figure
          key={v.id}
          variants={scaleIn}
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-video">
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
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink-deep shadow-[0_10px_30px_-8px_rgba(218,164,66,0.8)] transition-transform duration-300 group-hover:scale-110">
                  <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                </span>
              </a>
            )}
          </div>
          <figcaption className="flex items-center justify-between gap-3 p-4">
            <span className="text-sm text-cream">{v.title}</span>
            <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold/90">
              {v.tag}
            </span>
          </figcaption>
        </m.figure>
      ))}
    </m.div>
  );
}

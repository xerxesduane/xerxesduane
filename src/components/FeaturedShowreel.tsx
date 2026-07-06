import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { VIDEOS } from "../data/videos";
import Reveal from "./ui/Reveal";

/**
 * Cinematic featured-video band. Click-to-play YouTube (same privacy pattern
 * as VideoGallery: no YouTube cookies/scripts until the visitor presses play)
 * inside a liquid-glass rounded frame, with a "Creative proof" overlay card
 * that links to the full showreel.
 */
export default function FeaturedShowreel() {
  const featured = VIDEOS[0];
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="showreel-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_50%_45%_at_50%_0%,rgba(218,164,66,0.10),transparent_70%)]"
      />
      <div className="container-bl">
        <Reveal>
          <figure className="liquid-glass relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
            <div className="relative aspect-video">
              {playing ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0`}
                  title={featured.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <a
                  href={`https://youtu.be/${featured.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    setPlaying(true);
                  }}
                  aria-label={`Play video: ${featured.title}`}
                  data-cursor="play"
                  className="group absolute inset-0 block"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${featured.id}/maxresdefault.jpg`}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      // not every video has a maxres thumbnail — fall back
                      e.currentTarget.src = `https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`;
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                  />
                  {/* cinematic bottom gradient so the overlay card reads cleanly */}
                  <span className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/20 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink-deep shadow-[0_10px_40px_-8px_rgba(218,164,66,0.8)] transition-transform duration-300 group-hover:scale-110">
                    <Play size={26} fill="currentColor" strokeWidth={0} className="ml-1" />
                  </span>
                </a>
              )}
            </div>

            {/* bottom overlay card */}
            {!playing && (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="pointer-events-auto max-w-xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold" id="showreel-heading">
                    Creative proof
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream-dim sm:text-base">
                    Behind the systems work is an in-house creative studio: video,
                    photography, design, and content that help businesses not only
                    run better, but look sharper and communicate clearly.
                  </p>
                  <a
                    href="/showreel"
                    data-cursor="link"
                    className="group/link mt-4 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink"
                  >
                    View showreel
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.4}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                </div>
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

import VideoHero from "./fx/VideoHero";

/**
 * Second full screen: the original hero footage (with its fade loop), moved
 * down from the top of the page when the Mainframe landing hero took over.
 * Deliberately light on copy — one calm brand statement over the film.
 */
export default function FormerHeroVideoSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink">
      <VideoHero />
      <div className="relative z-10 px-5 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          Xerxes Duane · Dubai, UAE
        </p>
        <h2 className="mt-5 text-4xl text-cream sm:text-5xl md:text-6xl">
          Serve first. <span className="text-gradient-gold italic">Build second.</span>
        </h2>
        <p className="mt-4 text-sm text-cream-dim sm:text-base">The whole stack, connected.</p>
      </div>
    </section>
  );
}

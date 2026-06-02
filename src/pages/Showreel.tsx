import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import VideoGallery from "../components/VideoGallery";
import Contact from "../components/Contact";

export default function Showreel() {
  return (
    <>
      <section className="container-bl scroll-mt-24 pt-32 pb-12 sm:pt-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold/60" aria-hidden />
            Showreel · video &amp; motion
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl">
            Footage into{" "}
            <span className="text-gradient-gold italic">stories that move.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            A selection of video production, editing, color grading, animation,
            and social content, shot and cut across events, documentaries, and
            brand work in the UAE and beyond. Tap any thumbnail to play.
          </p>
        </Reveal>
      </section>

      <section className="container-bl pb-20 sm:pb-28">
        <VideoGallery />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-dark">
          Videos open from YouTube only when you press play, so nothing loads
          until you choose to watch.
        </p>

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(218,164,66,0.8)] transition duration-300 hover:bg-gold-soft"
          >
            Have a video project? Let's talk
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </a>
        </div>
      </section>

      <Contact />
    </>
  );
}

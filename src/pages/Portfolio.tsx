import { ArrowUpRight, Clapperboard } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import WorkGallery from "../components/WorkGallery";
import Contact from "../components/Contact";
import { WEB_DESIGNS, GRAPHIC_DESIGNS } from "../data/workItems";

export default function Portfolio() {
  return (
    <>
      <section className="container-bl scroll-mt-24 pt-32 pb-12 sm:pt-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold/60" aria-hidden />
            Portfolio · web &amp; design
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl">
            Work that looks the part{" "}
            <span className="text-gradient-gold italic">and does the job.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            A selection of websites and brand &amp; graphic design for businesses
            across the UAE and beyond. Tap any piece to view it full size.
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href="/showreel"
              className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/50 hover:text-gold"
            >
              <Clapperboard size={16} />
              Watch the video showreel
            </a>
          </div>
        </Reveal>
      </section>

      {WEB_DESIGNS.length > 0 && (
        <section id="web" className="container-bl scroll-mt-24 py-12">
          <Reveal>
            <h2 className="mb-8 text-3xl sm:text-4xl">
              Web <span className="text-gradient-gold">designs</span>
            </h2>
          </Reveal>
          <WorkGallery items={WEB_DESIGNS} />
        </section>
      )}

      {GRAPHIC_DESIGNS.length > 0 && (
        <section id="graphic" className="container-bl scroll-mt-24 py-12 sm:py-16">
          <Reveal>
            <h2 className="mb-8 text-3xl sm:text-4xl">
              Graphic <span className="text-gradient-gold">designs</span>
            </h2>
          </Reveal>
          <WorkGallery items={GRAPHIC_DESIGNS} />
        </section>
      )}

      <section className="container-bl pb-20 sm:pb-28">
        <div className="mt-6 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(218,164,66,0.8)] transition duration-300 hover:bg-gold-soft"
          >
            Like what you see? Let's talk
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </a>
        </div>
      </section>

      <Contact />
    </>
  );
}

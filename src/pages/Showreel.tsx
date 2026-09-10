import { Clapperboard } from "lucide-react";
import VideoGallery from "../components/VideoGallery";
import Contact from "../components/Contact";
import PageHeader from "../components/page/PageHeader";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";

export default function Showreel() {
  return (
    <>
      <PageHeader
        eyebrow="Showreel · video & motion"
        title={<>Footage into stories that move.</>}
        lede="Video production, editing, colour grading, animation and social content: shot and cut across events, documentaries and brand work in the UAE and beyond. Tap any thumbnail to play."
        actions={
          <>
            <PrimaryAction href="#contact">Start a video project</PrimaryAction>
            <GhostAction href="/portfolio" icon={<Clapperboard size={15} aria-hidden />}>
              Portfolio
            </GhostAction>
          </>
        }
      />

      <section className="rounded-panel bg-gradient-to-r from-canvas-sunk/30 via-wash/40 to-wash-strong/60 p-3 sm:p-4">
        <VideoGallery />
      </section>

      <p className="mt-4 text-sm text-fg-faint">
        Videos open from YouTube only when you press play, so nothing loads
        until you choose to watch.
      </p>

      <Contact />
    </>
  );
}

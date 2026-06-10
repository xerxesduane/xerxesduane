import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotionPref } from "../../lib/usePrefs";

/**
 * Full-bleed hero footage layer (Verteal-style). The poster + ink scrims are
 * prerendered (decorative, aria-hidden); the looping video mounts client-side
 * only on motion-safe fine pointers without Save-Data — touch/mobile and
 * reduced-motion users get the cinematic still. Pauses when off-screen.
 */
export default function VideoHero() {
  const reduced = useReducedMotionPref();
  const fine = useFinePointer();
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced || !fine) return;
    type NetInfo = { saveData?: boolean };
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (conn?.saveData) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client-only init; intentional SSR-safe pattern
    setShowVideo(true);
  }, [reduced, fine]);

  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <img
        src="/hero/poster.webp"
        alt=""
        width={1600}
        height={900}
        className="h-full w-full object-cover"
      />
      {showVideo && (
        <video
          ref={videoRef}
          src="/hero/hero-1080.mp4"
          poster="/hero/poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {/* ink scrims: keep the cream/gold copy AA-legible over bright footage,
          and dissolve the section into the page background at the bottom */}
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,15,13,0.6)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}

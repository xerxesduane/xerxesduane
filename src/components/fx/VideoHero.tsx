import { useEffect, useRef, useState } from "react";
import { useReducedMotionPref } from "../../lib/usePrefs";

/** Fade duration (ms) for both the fade-in and fade-out ramps. */
const FADE_MS = 500;
/** Start fading out when this much of the clip remains (seconds). */
const FADE_OUT_REMAINING = 0.55;

/**
 * Full-bleed hero footage layer. The poster + ink scrims are prerendered
 * (decorative, aria-hidden); the muted/inline video mounts client-side on
 * desktop AND mobile. Instead of a hard loop, the clip fades in over 500ms
 * once it can play, fades out over the final ~0.55s, then restarts and fades
 * back in — a smooth "liquid" loop driven by requestAnimationFrame (opacity
 * is set imperatively; no CSS transitions). Skipped under reduced-motion or
 * Save-Data — those get the cinematic still. Pauses when off-screen.
 */
export default function VideoHero() {
  const reduced = useReducedMotionPref();
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    type NetInfo = { saveData?: boolean };
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (conn?.saveData) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client-only init; intentional SSR-safe pattern
    setShowVideo(true);
  }, [reduced]);

  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;

    // Some mobile browsers require muted as a property (not just the attribute)
    // before they'll honor autoplay.
    v.muted = true;
    v.style.opacity = "0";

    let raf = 0;
    // Current fade ramp: null = idle, otherwise animate opacity from -> to.
    let ramp: { from: number; to: number; start: number } | null = null;
    let canPlay = false;
    let fadingOut = false;

    const startRamp = (to: number) => {
      ramp = { from: parseFloat(v.style.opacity) || 0, to, start: performance.now() };
    };

    const tick = (now: number) => {
      if (ramp) {
        const t = Math.min(1, (now - ramp.start) / FADE_MS);
        v.style.opacity = String(ramp.from + (ramp.to - ramp.from) * t);
        if (t >= 1) ramp = null;
      }
      // Begin the fade-out ramp as the clip approaches its end.
      if (canPlay && !fadingOut && v.duration > 0 && v.duration - v.currentTime <= FADE_OUT_REMAINING) {
        fadingOut = true;
        startRamp(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onCanPlay = () => {
      if (canPlay) return;
      canPlay = true;
      startRamp(1);
    };
    const onEnded = () => {
      v.currentTime = 0;
      fadingOut = false;
      v.play().catch(() => {});
      startRamp(1);
    };
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("ended", onEnded);
    v.play().catch(() => {});

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("ended", onEnded);
      io.disconnect();
    };
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
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-0"
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

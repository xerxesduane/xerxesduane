import { Component, lazy, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "../../lib/useTheme";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * A slow, brand-coloured mesh gradient behind every page (Paper Shaders).
 *
 * The palettes are not decorative guesses. `fg-faint` on the plain canvas is
 * 4.71:1, barely over AA, so every colour in the light palette is at least as
 * light as the canvas (white, pale wash, pale peach). The gradient can only
 * raise contrast there, never lower it. Measured on rendered frames, fg-faint
 * stays at 4.9:1 or better in dark mode. Change a colour and re-measure before
 * shipping it.
 *
 * Cost is kept off the critical path:
 * - Nothing renders on the server, so the prerendered HTML is untouched. The
 *   shader chunk is fetched two seconds after `load`, once the page is idle,
 *   so it never competes with the page's own first paint (see START_DELAY_MS).
 * - It fades in, so it never pops.
 * - Paper pauses the render loop when the tab is hidden.
 * - Pixels are capped: the gradient is soft, so rendering it at a fraction of
 *   a high-DPI phone's resolution is invisible and saves the GPU.
 * - Reduced motion gets a still frame; Save-Data and browsers without WebGL2
 *   get the plain canvas colour, which is what the page had before.
 */

/**
 * A failed chunk (offline, an ad blocker, a stale deploy) must not take the
 * page down with it: an unhandled rejection from `lazy` unmounts the whole
 * app. It resolves to nothing instead, and the plain canvas shows through.
 */
const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react")
    .then((m) => ({ default: m.MeshGradient }))
    .catch(() => ({ default: () => null })),
);

/** Contains anything else the shader throws while rendering. */
class Contained extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const PALETTES = {
  light: ["#f5f3ec", "#ffffff", "#eef4fc", "#fdf2ea"],
  dark: ["#0c1526", "#132139", "#1b2d4e", "#2c1f1b"],
} as const;

/** About 1000×600. The gradient is a blur, so upscaling it is invisible. */
const MAX_PIXELS = 600_000;

/**
 * How long after `load` to wait before starting. Measured: starting at idle
 * straight after `load` competed with the page's own image paints and pushed
 * LCP on /ministry from ~0.55s to ~1s. Two seconds clears it.
 */
const START_DELAY_MS = 2000;

function canRender(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

/** Run once the page has loaded, painted and gone quiet. */
function afterPageSettles(run: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  let idle: number | undefined;
  const timer = window.setTimeout(() => {
    idle = w.requestIdleCallback ? w.requestIdleCallback(run, { timeout: 2000 }) : undefined;
    if (idle === undefined) run();
  }, START_DELAY_MS);
  return () => {
    window.clearTimeout(timer);
    if (idle !== undefined) w.cancelIdleCallback?.(idle);
  };
}

export default function MeshBackground() {
  const { theme } = useTheme();
  const reduced = useReducedMotionPref();
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!canRender()) return;
    const start = () => {
      setReady(true);
      // Let the canvas draw its first frame before fading it in.
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    };
    if (document.readyState === "complete") return afterPageSettles(start);
    let cancel = () => {};
    const onLoad = () => {
      cancel = afterPageSettles(start);
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      cancel();
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-20 transition-opacity duration-[1200ms] ease-out ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <Contained>
        <Suspense fallback={null}>
          <MeshGradient
            colors={[...PALETTES[theme]]}
            distortion={0.8}
            swirl={0.12}
            speed={reduced ? 0 : 0.18}
            frame={reduced ? 12_000 : 0}
            minPixelRatio={1}
            maxPixelCount={MAX_PIXELS}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </Contained>
    </div>
  );
}

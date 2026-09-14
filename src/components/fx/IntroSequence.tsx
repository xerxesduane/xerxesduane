import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Compass, Hammer, Map, Rocket, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Wordmark from "../ui/Wordmark";
import { useReducedMotionPref } from "../../lib/usePrefs";

/** Plays once per tab, not on every route change. */
const SEEN_KEY = "xd-intro-seen";

/** Total run before the overlay is torn out of the DOM. */
const RUN_MS = 2700;

/** The studio's actual process, short enough to read at a glance. */
const STEPS: { label: string; icon: LucideIcon }[] = [
  { label: "Discover", icon: Compass },
  { label: "Plan", icon: Map },
  { label: "Build", icon: Hammer },
  { label: "Test", icon: ShieldCheck },
  { label: "Launch", icon: Rocket },
];

/**
 * The workflow pipeline that runs before the dashboard appears: the connector
 * fills left to right and each node pops and checks off as it is reached.
 *
 * Deliberately cheap and unobtrusive:
 * - It never renders on the server, so the prerendered HTML — the thing search
 *   engines and a failed-JS visitor get — is untouched.
 * - Skipped entirely under `prefers-reduced-motion`, and shown once per tab.
 * - Any click or key dismisses it, and it removes itself either way, so it can
 *   never strand someone behind an overlay.
 * - `aria-hidden`, because it is decoration; assistive tech goes straight to
 *   the page underneath.
 */
/**
 * Whether this tab should see the intro. Resolved on first call and cached, so
 * every later call returns the identical value — which is what
 * useSyncExternalStore requires of a snapshot, and what stops the overlay
 * being torn out mid-run once the effect marks the session seen.
 */
let eligibility: boolean | null = null;
function getEligibility(): boolean {
  if (eligibility === null) {
    try {
      eligibility = sessionStorage.getItem(SEEN_KEY) !== "1";
    } catch {
      // Blocked storage: don't replay on every view.
      eligibility = false;
    }
  }
  return eligibility;
}

/** Nothing ever changes it after the first read. */
const subscribeNoop = () => () => {};

/** Server snapshot is false, so the intro never reaches the prerendered HTML. */
const notOnServer = () => false;

export default function IntroSequence() {
  const reduced = useReducedMotionPref();
  const eligible = useSyncExternalStore(subscribeNoop, getEligibility, notOnServer);
  const [dismissed, setDismissed] = useState(false);
  const show = eligible && !reduced && !dismissed;

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* not fatal */
    }
    const done = () => setDismissed(true);
    const timer = window.setTimeout(done, RUN_MS);
    window.addEventListener("keydown", done);
    window.addEventListener("pointerdown", done);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", done);
      window.removeEventListener("pointerdown", done);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="intro" aria-hidden>
      <div className="w-full max-w-3xl px-6">
        <div className="intro__mark mb-10 flex justify-center">
          <Wordmark size={30} />
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* The rail sits behind the nodes, inset so it starts and ends at
              the first and last node rather than the container edge. */}
          <div className="absolute inset-x-[10%] top-[22px] intro__track">
            <span className="intro__fill" />
          </div>

          <ol className="relative flex items-start justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.label}
                  className="flex w-[20%] flex-col items-center gap-2.5"
                  style={{ ["--i" as string]: i }}
                >
                  <span className="intro__node relative grid h-11 w-11 place-items-center rounded-2xl border border-line bg-panel shadow-card">
                    <Icon size={18} strokeWidth={2} className="text-fg" aria-hidden />
                    <span className="intro__check absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-ink">
                      <Check size={12} strokeWidth={3} aria-hidden />
                    </span>
                  </span>
                  <span className="intro__label text-center font-technical text-[0.68rem] font-bold uppercase tracking-[0.12em] text-fg-soft">
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="intro__status mt-10 flex items-center justify-center gap-2 text-sm text-fg-soft">
          <span className="intro__pulse h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Bringing the systems online
        </p>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Boxes,
  Globe,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedBeam } from "../vendor/AnimatedBeam";
import { LogoMark } from "../ui/Wordmark";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * Icon above label, not beside it: the beams run between icon centres, and a
 * label sitting on that line would be crossed by its own connection.
 */
function Node({
  icon: Icon,
  label,
  nodeRef,
}: {
  icon: LucideIcon;
  label: string;
  nodeRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex w-[5.5rem] flex-col items-center gap-1.5">
      <div
        ref={nodeRef}
        className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-panel text-accent shadow-card"
      >
        <Icon size={19} strokeWidth={2.1} aria-hidden />
      </div>
      <span className="text-center text-[0.74rem] font-bold leading-tight text-fg">{label}</span>
    </div>
  );
}

/**
 * "One system, not twelve tools", drawn.
 *
 * Six tools on the outside, one hub in the middle, and a highlight travelling
 * along each connection. Built on the vendored Magic UI AnimatedBeam
 * (components/vendor/AnimatedBeam.tsx), re-coloured to the accent tokens. Each
 * node is something this practice actually wires up and has a service page on
 * this site, so the figure describes the offer rather than decorating it.
 *
 * It is an **illustration of how these builds are wired**, not a readout of
 * anything live — the caption says so, and the figure is `aria-hidden` with the
 * same information given as text beneath it, because a moving SVG is no way to
 * convey anything to a screen reader.
 *
 * The beams stop when the figure scrolls out of view or the tab is hidden, and
 * never start under `prefers-reduced-motion`; the static paths still draw, so
 * the diagram reads the same either way.
 *
 * The endpoints are six individually named refs rather than an array: the
 * `react-hooks/refs` lint rule (correctly) rejects indexing into a list of
 * refs while rendering.
 */
export default function SystemDiagram() {
  const reduced = useReducedMotionPref();
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const site = useRef<HTMLDivElement>(null);
  const whatsapp = useRef<HTMLDivElement>(null);
  const ads = useRef<HTMLDivElement>(null);
  const crm = useRef<HTMLDivElement>(null);
  const odoo = useRef<HTMLDivElement>(null);
  const dashboards = useRef<HTMLDivElement>(null);

  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(el);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const still = reduced || !onScreen || !tabVisible;
  const beam = { containerRef: container, still, pathWidth: 1.5 };

  return (
    <figure className="mb-8 overflow-hidden rounded-card border border-line bg-panel p-5 shadow-card sm:p-7">
      <div
        ref={container}
        aria-hidden
        className="relative mx-auto grid max-w-xl grid-cols-[auto_1fr_auto] items-center"
      >
        <div className="flex flex-col gap-4">
          <Node icon={Globe} label="Website" nodeRef={site} />
          <Node icon={MessageCircle} label="WhatsApp" nodeRef={whatsapp} />
          <Node icon={LineChart} label="Ads" nodeRef={ads} />
        </div>

        <div className="flex justify-center">
          <div
            ref={hub}
            className="z-10 grid h-16 w-16 place-items-center rounded-3xl border border-accent/40 bg-accent-soft shadow-card"
          >
            <LogoMark size={30} />
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <Node icon={Users} label="CRM" nodeRef={crm} />
          <Node icon={Boxes} label="Odoo ERP" nodeRef={odoo} />
          <Node icon={LayoutDashboard} label="Dashboards" nodeRef={dashboards} />
        </div>

        <AnimatedBeam {...beam} fromRef={site} toRef={hub} curvature={-34} delay={0} />
        <AnimatedBeam {...beam} fromRef={whatsapp} toRef={hub} delay={0.5} />
        <AnimatedBeam {...beam} fromRef={ads} toRef={hub} curvature={34} delay={1} />
        <AnimatedBeam {...beam} fromRef={hub} toRef={crm} curvature={-34} delay={0.25} />
        <AnimatedBeam {...beam} fromRef={hub} toRef={odoo} delay={0.75} />
        <AnimatedBeam {...beam} fromRef={hub} toRef={dashboards} curvature={34} delay={1.25} />
      </div>

      <figcaption className="mx-auto mt-5 max-w-2xl text-[0.82rem] leading-relaxed text-fg-soft">
        <span className="font-bold text-fg">How the pieces connect.</span> Website, WhatsApp and
        ads feed one hub; CRM, Odoo and your dashboards read from the same place. An illustration
        of how these builds are wired — not a live view of any client&rsquo;s system.
      </figcaption>
    </figure>
  );
}

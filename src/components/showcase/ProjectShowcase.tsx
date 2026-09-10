import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, MousePointerClick } from "lucide-react";
import Overlay from "../ui/Overlay";
import { IconTile, PANEL_HOVER } from "../page/Panel";
import { LayersGlyph } from "../ui/NavIcons";
import { useFinePointer, useReducedMotionPref } from "../../lib/usePrefs";
import { WEB_DESIGNS, type WorkItem } from "../../data/workItems";

/**
 * The reel is ~9kB of interaction code plus nineteen previews. It is only
 * fetched when someone actually opens the showcase, so the pages that host the
 * launcher card stay as light as they were.
 */
const ProjectReel = lazy(() => import("./ProjectReel"));

function Loading() {
  return (
    <p className="p-10 text-center text-sm text-fg-soft" role="status">
      Loading the reel…
    </p>
  );
}

/** The full-size look at one build, with an honest note about what it links to. */
function Preview({ item, onBack }: { item: WorkItem; onBack: () => void }) {
  const back = useRef<HTMLButtonElement>(null);
  useEffect(() => { back.current?.focus({ preventScroll: true }); }, []);
  return (
    <div className="project-browser">
      <div className="project-browser-toolbar flex flex-wrap items-center justify-between gap-3">
        <button
          ref={back}
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-[0.8rem] font-bold text-fg transition hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft size={15} strokeWidth={2.4} aria-hidden className="rtl-flip" />
          Back to the reel
        </button>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[0.8rem] font-bold text-fg-onSolid transition hover:bg-navy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
          >
            Open the live site
            <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden className="text-accent" />
          </a>
        ) : (
          <p className="text-[0.78rem] text-fg-faint">
            Screenshot from the archive, this build has no public link.
          </p>
        )}
      </div>
      <div className="project-browser-caption"><h3 className="font-display text-lg font-extrabold text-fg">{item.title}</h3><p className="text-sm text-fg-soft">Archived website screenshot{item.href ? " · Use Open the live site to explore the current website." : "."}</p></div>
      <img
        src={item.src}
        width={item.w}
        height={item.h}
        alt={`${item.title}, full screenshot`}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full bg-plate"
      />
    </div>
  );
}

interface ProjectShowcaseProps {
  /** Which builds go on the reel. Defaults to every web build in the archive. */
  items?: WorkItem[];
  className?: string;
}

/**
 * The launcher card plus the overlay it opens.
 *
 * The card is a plain button, so it works without JavaScript having loaded the
 * reel, on touch, and from the keyboard. Everything inside the overlay is also
 * reachable from /portfolio's ordinary grid, so the 3D view is never the only
 * way to see the work.
 */
export default function ProjectShowcase({ items = WEB_DESIGNS, className = "" }: ProjectShowcaseProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const reduced = useReducedMotionPref();
  const fine = useFinePointer();

  const close = useCallback(() => {
    setOpen(false);
    setSelected(null);
  }, []);

  const preview = items.slice(0, 3);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative flex w-full flex-col gap-3 overflow-hidden rounded-card border border-line bg-panel p-4 text-start shadow-card sm:p-5 ${PANEL_HOVER} ${className}`}
      >
        <div className="flex items-center gap-3">
          <IconTile>
            <LayersGlyph size={20} />
          </IconTile>
          <h2 className="min-w-0 flex-1 font-display text-card font-extrabold uppercase tracking-[0.045em] text-fg transition-colors duration-300 group-hover:text-accent-deep">
            Websites &amp; funnels
          </h2>
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-line bg-panel-alt px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-accent-deep sm:inline-flex">
            <MousePointerClick size={13} strokeWidth={2.4} aria-hidden />
            Spin the reel
          </span>
        </div>
        <p className="-mt-1 text-[0.9rem] leading-snug text-fg-soft">
          {items.length} website designs from my portfolio archive. Open the reel and explore
          the screenshots, with live links where available.
        </p>
        <span className="grid grid-cols-3 gap-2.5" aria-hidden>
          {preview.map((item) => (
            <span
              key={item.src}
              className="overflow-hidden rounded-xl border border-line bg-plate"
            >
              <img
                src={item.thumb}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top transition duration-500 ease-smooth group-hover:scale-[1.04]"
              />
            </span>
          ))}
        </span>
      </button>

      <Overlay
        open={open}
        onClose={close}
        presentation={selected ? "preview" : "immersive"}
        title={selected ? selected.title : "Websites & funnels"}
        description={
          selected
            ? "Full screenshot of the build."
            : "Drag the reel sideways, or use the arrow keys. Choose a build to see it full size."
        }
      >
        {selected && <Preview item={selected} onBack={() => {
          setSelected(null);
          requestAnimationFrame(() => {
            const dialog = document.querySelector('[role="dialog"]');
            (dialog?.querySelector<HTMLElement>('[aria-label^="Project reel"]') ?? dialog?.querySelector<HTMLElement>("ul button"))?.focus({ preventScroll: true });
          });
        }} />}
        <div hidden={!!selected}>
          <Suspense fallback={<Loading />}>
            {/* Reduced motion or a coarse pointer starts on the flat list; the
                cylinder is one button away either way. */}
            <ProjectReel items={items} active={!selected} flatByDefault={reduced || !fine} onSelect={setSelected} />
          </Suspense>
        </div>
      </Overlay>
    </>
  );
}

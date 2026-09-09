import type { ReactNode } from "react";
import { ArrowRight, Bot, ChartNoAxesColumn, Trophy, User } from "lucide-react";
import Panel from "../page/Panel";
import PanelBoard from "../page/PanelBoard";
import Counter from "../ui/Counter";
import ResultCard from "./ResultCard";
import { FolderGlyph, LayersGlyph } from "../ui/NavIcons";
import { Marquee } from "../vendor/Marquee";
import { AI_LAB_COUNT, AI_LAB_HOME_ROWS, AI_LAB_TRUST } from "../../data/aiLabHome";
import { STATS } from "../../data/content";
import {
  CORE_SERVICES,
  FEATURED_PROJECTS,
  FEATURED_RESULTS,
} from "../../data/homeBento";
import { SHELL_IDENTITY } from "../../data/shell";

/** Shared "go deeper" link, used by the panels that can't be links themselves. */
function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group/more inline-flex items-center gap-1.5 rounded text-[0.82rem] font-bold text-accent-deep transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
    >
      {children}
      <ArrowRight
        size={14}
        strokeWidth={2.6}
        aria-hidden
        className="rtl-flip transition-transform duration-300 ease-smooth group-hover/more:translate-x-1"
      />
    </a>
  );
}

/**
 * The bento board: a pale-blue washed container holding the six entry points.
 *
 * Four real columns once there's the width for them (the `board` breakpoint),
 * two below that, one on a phone. Spans are chosen so both rows fill the track
 * exactly, and the whole board clears a 900px-tall desktop viewport without
 * anything being clipped or shrunk to fit.
 *
 * Each card carries one small motion of its own on top of the shared card
 * hover (see components/page/Panel.tsx). Every one of them is *idle by
 * default* and starts on hover or keyboard focus — unlike the tools strip
 * above the board, which runs continuously because it is a marquee. Pausing is
 * done with `animation-play-state`, so a track resumes from where it stopped
 * rather than snapping back to the start.
 */
export default function BentoBoard() {
  return (
    <PanelBoard rail cols="board:grid-cols-4">
      {/* ---- Projects: a clipped reel of real client-site screenshots ---- */}
      <Panel
        iconNode={<FolderGlyph size={20} />}
        label="Projects"
        blurb="Websites, ERP rollouts and campaigns built for real businesses."
        href="/case-studies"
        span="sm:col-span-2"
      >
        <div className="grid min-h-0 flex-1 items-center gap-3 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <ul className="flex flex-col justify-center gap-2">
            {FEATURED_PROJECTS.map((project) => (
              <li key={project.image} className="min-w-0">
                <p className="truncate text-[0.85rem] font-bold leading-tight text-fg">
                  {project.client}
                </p>
                <p className="truncate text-[0.72rem] leading-tight text-fg-faint">
                  {project.descriptor}
                </p>
              </li>
            ))}
          </ul>

          {/* The reel. Clipped to a fixed window; scrolls only while the card
              is hovered or focused, and holds its position when it isn't. */}
          <Marquee
            vertical
            startOnHover
            repeat={2}
            className="h-[10rem] rounded-xl border border-line bg-canvas-sunk/60 p-1.5 [--duration:14s] [--gap:0.375rem]"
          >
            {FEATURED_PROJECTS.map((project) => (
              <figure
                key={project.image}
                className="shrink-0 overflow-hidden rounded-lg border border-line bg-plate"
              >
                <img
                  src={project.image}
                  alt={`${project.title} — screenshot of the live site`}
                  loading="lazy"
                  decoding="async"
                  className="h-[6.5rem] w-full object-cover object-top"
                />
              </figure>
            ))}
          </Marquee>
        </div>
      </Panel>

      {/* ---- About: the portrait on a small fan of cards ---- */}
      <Panel icon={User} label="About" href="/about">
        {/* Two blank card backs behind the one real photograph — a photo stack
            without pretending there are three different photographs. */}
        <div className="relative h-[6.75rem]">
          <span
            aria-hidden
            className="absolute inset-x-6 inset-y-1 rounded-xl border border-line bg-panel-alt transition duration-500 ease-smooth group-hover:-translate-x-3 group-hover:-rotate-[7deg] group-focus-visible:-translate-x-3 group-focus-visible:-rotate-[7deg]"
          />
          <span
            aria-hidden
            className="absolute inset-x-3 inset-y-0.5 rounded-xl border border-line bg-panel-alt transition duration-500 ease-smooth group-hover:translate-x-3 group-hover:rotate-[5deg] group-focus-visible:translate-x-3 group-focus-visible:rotate-[5deg]"
          />
          <img
            src={SHELL_IDENTITY.portrait}
            alt=""
            width={560}
            height={560}
            loading="lazy"
            decoding="async"
            className="relative h-full w-full rounded-xl border border-line object-cover object-[center_22%] shadow-card transition duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:-rotate-[1.5deg] group-focus-visible:-translate-y-0.5"
          />
        </div>
        <p className="text-[0.85rem] leading-snug text-fg-soft">
          Independent consultant wiring websites, CRM, Odoo and AI into one
          system small businesses can actually run.
        </p>
        <p className="mt-auto text-[0.76rem] font-semibold text-fg-faint">
          {SHELL_IDENTITY.location} · serving the wider GCC
        </p>
      </Panel>

      {/* ---- AI Lab: two rows that slide apart on hover ---- */}
      <Panel
        icon={Bot}
        label="AI Lab"
        blurb="Live demos you can run right here."
        footer={<MoreLink href="/ai-lab">All {AI_LAB_COUNT} tools</MoreLink>}
      >
        <div className="flex flex-col gap-1.5">
          {AI_LAB_HOME_ROWS.map((row, i) => (
            <Marquee
              key={i}
              startOnHover
              reverse={i % 2 === 1}
              repeat={2}
              className="mask-fade-edges [--duration:24s] [--gap:0.375rem]"
            >
              {row.map(({ demoId, label, demo }) => {
                const Icon = demo.icon;
                return (
                  <a
                    key={demoId}
                    href={`/ai-lab#${demoId}`}
                    className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel-alt px-3 py-1.5 text-[0.8rem] font-semibold text-fg-soft transition hover:border-accent/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-panel"
                  >
                    <Icon size={14} strokeWidth={2.2} aria-hidden className="text-accent" />
                    {label}
                  </a>
                );
              })}
            </Marquee>
          ))}
        </div>
        <p className="truncate text-[0.72rem] text-fg-faint">{AI_LAB_TRUST.join(" · ")}</p>
      </Panel>

      {/* ---- Experience: figures already published on the site ---- */}
      <Panel icon={ChartNoAxesColumn} label="Experience" href="/about" className="max-sm:hidden">
        <dl className="my-auto grid grid-cols-2 gap-x-3 gap-y-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="origin-left transition duration-500 ease-smooth group-hover:rotate-[-0.8deg] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[1.7rem] font-extrabold leading-none tracking-tight text-fg transition-colors duration-300 group-hover:text-accent-deep">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 block text-[0.72rem] leading-tight text-fg-soft">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      {/* ---- Services ---- */}
      <Panel iconNode={<LayersGlyph size={20} />} label="Services" href="/#services">
        <ol className="divide-y divide-line-soft">
          {CORE_SERVICES.map((title, i) => (
            <li
              key={title}
              className="flex items-baseline gap-2 py-[0.42rem] transition-transform duration-300 ease-smooth group-hover:translate-x-1 group-focus-visible:translate-x-1"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="grow text-[0.84rem] font-semibold leading-snug text-fg">
                {title}
              </span>
              <span className="shrink-0 font-display text-[0.68rem] font-bold tabular-nums text-fg-faint transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </Panel>

      {/* ---- Featured results: measured outcomes, not testimonials ---- */}
      <Panel
        icon={Trophy}
        label="Featured results"
        blurb="Measured outcomes from published case studies."
        span="sm:col-span-2"
        className="max-sm:hidden"
        footer={<MoreLink href="/case-studies">All case studies</MoreLink>}
      >
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {FEATURED_RESULTS.slice(0, 2).map((result) => (
            <li key={result.slug}>
              <ResultCard result={result} />
            </li>
          ))}
        </ul>
      </Panel>
    </PanelBoard>
  );
}

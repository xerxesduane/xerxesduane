import { m } from "framer-motion";
import { Bot, ChartNoAxesColumn, FolderOpen, Layers, Trophy, User } from "lucide-react";
import BentoCard from "./BentoCard";
import Counter from "../ui/Counter";
import { AI_LAB_CARDS, AI_LAB_TRUST } from "../../data/aiLabHome";
import { STATS } from "../../data/content";
import {
  CORE_SERVICES,
  FEATURED_PROJECTS,
  FEATURED_RESULTS,
} from "../../data/homeBento";
import { SHELL_IDENTITY } from "../../data/shell";
import { stagger, VIEWPORT } from "../../lib/motion";

/**
 * The bento board: a pale-blue washed container holding the six entry points.
 *
 * Spans are tuned so both rows fill twelve columns and the whole board is
 * visible without scrolling on a large desktop.
 */
export default function BentoBoard() {
  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="rounded-panel bg-gradient-to-r from-canvas-sunk/40 via-wash/50 to-wash-strong/80 p-3 sm:p-4"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
        {/* ---- Projects: real client work, real imagery ---- */}
        <BentoCard
          icon={FolderOpen}
          label="Projects"
          blurb="Websites, ERP rollouts and campaigns built for real businesses."
          href="/case-studies"
          span="lg:col-span-5"
        >
          <ul className="mt-1 grid grid-cols-2 gap-2">
            {FEATURED_PROJECTS.map((project) => (
              <li
                key={project.slug}
                className="overflow-hidden rounded-xl border border-line bg-panel-alt"
              >
                {/* `contain`, not `cover`: these are a mix of client logos and
                    site screenshots, and cropping a logo cuts the wordmark. */}
                <div className="flex h-16 w-full items-center justify-center overflow-hidden bg-canvas-sunk p-2">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-display text-lg font-extrabold text-fg-faint">
                      {project.client.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="px-2.5 py-1.5">
                  <p className="truncate text-xs font-semibold text-fg">{project.client}</p>
                  <p className="truncate text-[0.7rem] text-fg-faint">{project.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* ---- About ---- */}
        <BentoCard
          icon={User}
          label="About"
          blurb="Who I am and how I work."
          href="/about"
          span="lg:col-span-3"
        >
          <div className="mt-1 flex items-center gap-3 rounded-xl border border-line bg-panel-alt p-3">
            <img
              src={SHELL_IDENTITY.portrait}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="h-14 w-14 shrink-0 rounded-full border border-line object-cover object-top"
            />
            <p className="text-xs leading-snug text-fg-soft">
              Independent consultant wiring websites, CRM, Odoo and AI into one
              system for small businesses in Dubai.
            </p>
          </div>
          <p className="text-xs text-fg-faint">
            {SHELL_IDENTITY.location} · Serving the wider GCC
          </p>
        </BentoCard>

        {/* ---- AI Lab: links to demos that actually run ---- */}
        <BentoCard
          icon={Bot}
          label="AI Lab"
          blurb="Live demos you can run in the browser — no sign-up."
          span="lg:col-span-4"
        >
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {AI_LAB_CARDS.map((card) => (
              <li key={card.demoId}>
                <a
                  href={`/ai-lab#${card.demoId}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel-alt px-2.5 py-1.5 text-xs font-medium text-fg-soft transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-panel"
                >
                  <card.icon size={13} strokeWidth={2} aria-hidden className="text-accent" />
                  {card.title}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-fg-faint">
            {AI_LAB_TRUST.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* ---- Experience: figures already published on the site ---- */}
        <BentoCard
          icon={ChartNoAxesColumn}
          label="Experience"
          href="/about"
          span="lg:col-span-3"
        >
          <dl className="grid grid-cols-2 gap-x-3 gap-y-3">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-xl font-extrabold text-accent">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-0.5 block text-[0.68rem] leading-tight text-fg-soft">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </BentoCard>

        {/* ---- Services ---- */}
        <BentoCard
          icon={Layers}
          label="Services"
          href="/#services"
          span="lg:col-span-3"
        >
          <ul className="divide-y divide-line-soft">
            {CORE_SERVICES.map((title, i) => (
              <li key={title} className="flex items-center justify-between gap-2 py-1.5">
                <span className="truncate text-xs font-medium text-fg">{title}</span>
                <span className="font-mono text-[0.62rem] tabular-nums text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* ---- Featured results: measured outcomes, not testimonials ---- */}
        <BentoCard
          icon={Trophy}
          label="Featured results"
          blurb="Measured outcomes from published case studies."
          span="lg:col-span-6"
        >
          <ul className="grid gap-2 sm:grid-cols-3">
            {FEATURED_RESULTS.map((result) => (
              <li key={result.slug}>
                <a
                  href={`/case-studies/${result.slug}`}
                  className="flex h-full flex-col rounded-xl border border-line bg-panel-alt p-3 transition hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-panel"
                >
                  <p className="truncate text-xs font-semibold text-fg">{result.client}</p>
                  <p className="truncate text-[0.68rem] text-fg-faint">{result.category}</p>
                  <dl className="mt-2 space-y-1">
                    {result.stats.map((stat) => (
                      <div key={stat.label} className="flex items-baseline gap-1.5">
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="font-display text-sm font-extrabold text-accent">
                          {stat.value}
                        </dd>
                        <span className="truncate text-[0.65rem] text-fg-soft">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </dl>
                </a>
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </m.div>
  );
}

import { ArrowLeft, Check, Compass, ListChecks, Quote } from "lucide-react";
import AboutIntro from "../components/about/AboutIntro";
import PageHeader from "../components/page/PageHeader";
import Panel from "../components/page/Panel";
import PanelBoard from "../components/page/PanelBoard";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";

const FOCUS = [
  "Start by understanding how your business actually operates",
  "Replace manual, duplicated work with systems that run themselves",
  "Build for scale, so the tools still fit as you grow",
  "Shape everything around your real operations, not a generic template",
];

const PROJECTS = [
  "Construction and manufacturing workflows",
  "E-commerce and lead-management systems",
  "Inventory operations",
  "Website builds and integrations",
  "Marketing automation",
  "Customer-management platforms",
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        className="board:mb-2"
        title={<>Hi, I&rsquo;m Xerxes.</>}
        lede="I build the systems that keep a small business running when nobody is watching them."
        actions={
          <>
            <PrimaryAction href="/contact">Book a free audit</PrimaryAction>
            <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
              Home
            </GhostAction>
          </>
        }
      />

      <AboutIntro />

      {/* Twelfths, with each panel given the width its content wants, rather
          than four equal columns. At four equal the panels measured 341, 302,
          230 and 172px and the row takes the tallest, so a third of the board
          was air. Six columns was worse (the narrow panels wrapped more than
          the wide one saved) and so were proportional fractions, because the
          work list is a fixed number of rows and does not answer to width. */}
      <PanelBoard cols="board:grid-cols-12 board:gap-3" className="mt-2 board:mt-1 board:p-3">
        {/* Bio */}
        <Panel icon={Compass} label="How I work" span="board:col-span-4" className="board:gap-2 board:p-3">
          <div className="space-y-1.5 text-[0.8rem] leading-snug text-fg-soft">
            <p>
              I help growing businesses run on systems that actually work
              together. Instead of a website in one place, spreadsheets in
              another, and a handful of apps that don't talk to each other, I
              connect sales, CRM, inventory, purchasing, accounting, your
              website, and your day-to-day workflows into one platform your
              team will genuinely use.
            </p>
            <p>
              My work sits in the gap between off-the-shelf tools that never
              quite fit and expensive enterprise consultants who bill for
              layers most businesses don't need. I build practical, scalable
              systems around how your business really operates, often on
              flexible platforms like Odoo, but the tool is always chosen to
              fit the problem rather than the other way around.
            </p>
          </div>
        </Panel>

        {/* Approach */}
        <Panel icon={ListChecks} label="My approach" span="board:col-span-3" className="board:gap-2 board:p-3">
          <ul className="space-y-1.5">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[0.8rem] leading-snug text-fg-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Recent work */}
        <Panel icon={Compass} label="Recent work spans" span="board:col-span-3" className="board:gap-2 board:p-3">
          {/* A wrapping cloud rather than one row per item. As a grid it was
              six rows whatever width it had, which made it the tallest panel
              on the board; wrapped, the short labels share a line and it packs
              into four. */}
          <ul className="flex flex-wrap gap-1.5">
            {PROJECTS.map((p) => (
              <li
                key={p}
                className="rounded-lg border border-line bg-panel-alt px-2.5 py-1 text-[0.78rem] leading-snug text-fg-soft board:py-0.5"
              >
                {p}
              </li>
            ))}
          </ul>
        </Panel>

        {/* HIDDEN (re-add later): Fellowship Dubai engagement panel — the
            client card is also commented out in data/content.ts. */}

        {/* Closing note */}
        <Panel icon={Quote} label="Why I do it" span="board:col-span-2" className="board:gap-2 board:p-3">
          <p className="font-display text-[0.95rem] italic leading-snug text-fg">
            I don't just create things. I help your business run, and I stay for
            the parts of your life it touches. Serving comes first; the build is
            how I do it.
          </p>
        </Panel>
      </PanelBoard>

    </>
  );
}

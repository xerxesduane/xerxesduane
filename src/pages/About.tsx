import { ArrowLeft, Check, Compass, ListChecks, Quote } from "lucide-react";
import AboutIntro from "../components/about/AboutIntro";
import Contact from "../components/Contact";
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
        title={<>Hi, I&rsquo;m Xerxes.</>}
        lede="I build the systems that keep a small business running when nobody is watching them."
        actions={
          <>
            <PrimaryAction href="/#contact">Book a free audit</PrimaryAction>
            <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
              Home
            </GhostAction>
          </>
        }
      />

      <AboutIntro />

      <PanelBoard className="mt-4">
        {/* Bio */}
        <Panel icon={Compass} label="How I work" span="lg:col-span-7">
          <div className="space-y-3 text-[0.95rem] leading-relaxed text-fg-soft">
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
        <Panel icon={ListChecks} label="My approach" span="lg:col-span-5">
          <ul className="space-y-2">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-fg-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Recent work */}
        <Panel icon={Compass} label="Recent work spans" span="lg:col-span-7">
          <ul className="grid gap-2 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <li
                key={p}
                className="rounded-xl border border-line bg-panel-alt px-3.5 py-2.5 text-sm text-fg-soft"
              >
                {p}
              </li>
            ))}
          </ul>
        </Panel>

        {/* HIDDEN (re-add later): Fellowship Dubai engagement panel — the
            client card is also commented out in data/content.ts. */}

        {/* Closing note */}
        <Panel icon={Quote} label="Why I do it" span="lg:col-span-5">
          <p className="font-display text-lg italic leading-relaxed text-fg sm:text-xl">
            I don't just create things. I help your business run, and I stay for
            the parts of your life it touches. Serving comes first; the build is
            how I do it.
          </p>
        </Panel>
      </PanelBoard>

      <Contact />
    </>
  );
}

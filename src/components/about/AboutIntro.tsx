import { m } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CloudUpload,
  Code2,
  LayoutDashboard,
  LineChart,
  MapPin,
  PanelsTopLeft,
  ScanSearch,
  Sparkles,
  Target,
  UserRoundCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import DeskIllustration from "./DeskIllustration";
import { BOARD_WASH } from "../page/PanelBoard";
import { SHELL_IDENTITY } from "../../data/shell";
import { TRUST } from "../../data/trust";
import { fadeUp, stagger } from "../../lib/motion";

/**
 * The four disciplines, each pointing at the service page that covers it, so
 * the list is a route into the site rather than a decorative résumé. The
 * glyphs stand for the tools named in `tools` — lucide marks, not third-party
 * logos, so nothing here needs a trademark licence.
 */
const DISCIPLINES: {
  title: string;
  tools: string;
  href: string;
  icons: LucideIcon[];
}[] = [
  {
    title: "Systems, Odoo & CRM",
    tools: "Odoo ERP · CRM · dashboards",
    href: "/odoo-erp-dubai",
    icons: [Boxes, Users, LayoutDashboard],
  },
  {
    title: "AI automation & agents",
    tools: "Claude · Gemini · Groq · WhatsApp",
    href: "/ai-automation-dubai",
    icons: [Bot, Sparkles, Workflow],
  },
  {
    title: "Web, commerce & apps",
    tools: "React · TypeScript · Tailwind · Vercel",
    href: "/web-development-dubai",
    icons: [Code2, PanelsTopLeft, CloudUpload],
  },
  {
    title: "Search & paid growth",
    tools: "SEO · AEO · Meta & Google Ads",
    href: "/seo-dubai",
    icons: [ScanSearch, LineChart, Target],
  },
];

/** One of the two facts pinned under the list. */
function Fact({
  icon: Icon,
  title,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-panel-alt px-3.5 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
        <Icon size={17} strokeWidth={2.2} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.85rem] font-bold leading-tight text-fg">{title}</span>
        <span className="block text-[0.72rem] leading-tight text-fg-faint">{detail}</span>
      </span>
    </div>
  );
}

/**
 * The About page's opening card: a short statement, the four disciplines as a
 * numbered list, two grounding facts, and the portrait filling the right
 * column.
 *
 * Every claim here is one the site already makes elsewhere — the founding year
 * comes from `TRUST.since`, the team size and the four countries from the
 * published FAQs, and each discipline links to the service page that details
 * it. Nothing is asserted that isn't backed somewhere else on the site.
 */
export default function AboutIntro() {
  return (
    <m.section
      variants={stagger}
      initial="hidden"
      animate="show"
      aria-label="Introduction"
      className="rounded-panel p-3 sm:p-4"
      style={{ background: BOARD_WASH }}
    >
      <div className="grid overflow-hidden rounded-card border border-line bg-panel shadow-card lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)]">
        {/* ---- the words ---- */}
        {/* `min-w-0`: a grid item defaults to `min-width: auto`, and the
            `truncate` line inside the discipline rows is `white-space: nowrap`,
            so without this the column sizes to that string and overflows the
            card on a phone. */}
        <div className="order-2 min-w-0 p-5 sm:p-7 lg:order-1">
          <m.p
            variants={fadeUp}
            className="font-display text-[1.45rem] font-extrabold leading-[1.25] tracking-tight text-fg sm:text-[1.7rem]"
          >
            Most small businesses don&rsquo;t need more tools.{" "}
            <span className="font-bold text-fg-soft">
              They need the ones they already have to start talking to each other. That has been
              the whole job since {TRUST.since}.
            </span>
          </m.p>

          <m.p variants={fadeUp} className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-fg-soft">
            <span className="font-bold text-fg">Independent, and hands-on.</span> My work sits
            between off-the-shelf tools that never quite fit and enterprise consultants who bill
            for layers a 2&ndash;10 person team doesn&rsquo;t need. The retainer is month to month,
            and if you don&rsquo;t need me I&rsquo;ll say so.
          </m.p>

          {/* ---- what that work actually is ---- */}
          <m.ol variants={fadeUp} className="mt-6 divide-y divide-line-soft border-y border-line-soft">
            {DISCIPLINES.map((item, i) => (
              <li key={item.title}>
                {/* One line from `sm` up — icons, title, arrow, number. On a
                    phone there isn't room for that, so the row wraps: icons and
                    the number share the first line and the title takes the
                    full width below, rather than squeezing into ~150px. */}
                <a
                  href={item.href}
                  className="group flex flex-wrap items-center gap-x-3.5 gap-y-1.5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel sm:flex-nowrap sm:gap-4"
                >
                  <span aria-hidden className="order-1 flex shrink-0 -space-x-1.5">
                    {item.icons.map((Glyph, g) => (
                      <span
                        key={g}
                        className="grid h-[1.85rem] w-[1.85rem] place-items-center rounded-lg border border-line bg-panel text-accent shadow-pill transition duration-300 ease-smooth group-hover:-translate-y-0.5 sm:h-8 sm:w-8"
                        style={{ transitionDelay: `${g * 45}ms` }}
                      >
                        <Glyph size={15} strokeWidth={2.2} />
                      </span>
                    ))}
                  </span>

                  <span className="order-3 w-full min-w-0 sm:order-2 sm:w-auto sm:flex-1">
                    <span className="block text-[0.95rem] font-bold leading-tight text-fg transition-colors group-hover:text-accent-deep">
                      {item.title}
                    </span>
                    <span className="block truncate text-[0.75rem] leading-tight text-fg-faint">
                      {item.tools}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.4}
                    aria-hidden
                    className="order-4 hidden shrink-0 -translate-x-1 text-accent opacity-0 transition duration-300 ease-smooth group-hover:translate-x-0 group-hover:opacity-100 sm:order-3 sm:block"
                  />
                  <span className="order-2 ms-auto shrink-0 font-display text-[0.7rem] font-bold tabular-nums text-fg-faint sm:order-4 sm:ms-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </m.ol>

          <m.div variants={fadeUp} className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <Fact
              icon={UserRoundCheck}
              title="Founder & lead consultant"
              detail={`Independent since ${TRUST.since}`}
            />
            <Fact
              icon={MapPin}
              title={`Based in ${SHELL_IDENTITY.location}`}
              detail="GMT+4 · GCC, NZ & the Philippines"
            />
          </m.div>
        </div>

        {/* ---- the illustration ---- */}
        <m.div
          variants={fadeUp}
          className="order-1 flex items-end justify-center overflow-hidden border-b border-line bg-gradient-to-br from-wash/60 to-wash-strong/75 px-4 pt-6 lg:order-2 lg:border-b-0 lg:border-s lg:px-5 lg:pt-10"
        >
          <DeskIllustration className="w-full max-w-[24rem] lg:max-w-none" />
        </m.div>
      </div>
    </m.section>
  );
}

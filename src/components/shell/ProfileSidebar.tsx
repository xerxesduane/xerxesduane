import { m } from "framer-motion";
import { Languages } from "lucide-react";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "../ui/ThemeToggle";
import Wordmark from "../ui/Wordmark";
import { SHELL_IDENTITY, SHELL_NAV, isNavActive } from "../../data/shell";
import { fadeUp, stagger } from "../../lib/motion";

interface ProfileSidebarProps {
  /** Current path, for the active nav state. */
  path: string;
  /** The same page in the other language. */
  lang: { href: string; label: string };
}

/**
 * The persistent profile rail: portrait, identity, socials, then the primary
 * navigation. Desktop only — MobileNav covers narrow viewports, and both read
 * SHELL_NAV so they can't drift.
 *
 * The rail is sticky rather than fixed so it participates in normal document
 * flow: no nested scroll container, and the footer is still reachable.
 */
export default function ProfileSidebar({ path, lang }: ProfileSidebarProps) {
  return (
    <m.aside
      variants={stagger}
      initial="hidden"
      animate="show"
      aria-label="Profile and site navigation"
      className="hidden shrink-0 lg:block lg:h-full lg:w-[19rem] xl:w-[21rem]"
    >
      <div className="flex h-full flex-col gap-5 overflow-y-auto py-8 pr-1">
        {/* Brand lockup */}
        <m.a
          variants={fadeUp}
          href="/"
          aria-label="Xerxes Duane — home"
          className="w-fit rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <Wordmark size={26} />
        </m.a>

        {/* Portrait, with the decorative ring echoing the canvas arcs. */}
        <m.div variants={fadeUp} className="relative w-fit">
          <span
            aria-hidden
            className="absolute -right-1 -top-3 h-12 w-12 rounded-full border border-line"
          />
          <img
            src={SHELL_IDENTITY.portrait}
            width={160}
            height={160}
            alt={`${SHELL_IDENTITY.name}, ${SHELL_IDENTITY.tagline}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="relative h-32 w-32 rounded-full border border-line object-cover object-top shadow-card xl:h-36 xl:w-36"
          />
        </m.div>

        {/* Identity */}
        <m.div variants={fadeUp}>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">
            {SHELL_IDENTITY.name}
          </h2>
          <p className="mt-1 font-technical text-xs tracking-wide text-accent">{SHELL_IDENTITY.handle}</p>
          <p className="mt-2 text-sm leading-snug text-fg-soft">
            {SHELL_IDENTITY.tagline}
            <span className="block text-fg-faint">{SHELL_IDENTITY.location}</span>
          </p>
        </m.div>

        {/* Socials + theme switch, on one row like the reference composition. */}
        <m.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
          <SocialLinks />
          <ThemeToggle />
        </m.div>

        <div className="hairline" aria-hidden />

        {/* Primary navigation */}
        <m.nav variants={fadeUp} aria-label="Primary" className="flex flex-col gap-1">
          {SHELL_NAV.map((item) => {
            const active = isNavActive(item, path);
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.95rem] font-medium transition duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                  active
                    ? "border border-line bg-panel text-fg shadow-pill"
                    : "border border-transparent text-fg-soft hover:bg-panel/70 hover:text-fg"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={1.9}
                  aria-hidden
                  className={
                    active ? "text-accent" : "text-fg-faint transition group-hover:text-accent"
                  }
                />
                {item.label}
              </a>
            );
          })}
          <a
            href={lang.href}
            lang={lang.label === "English" ? "en" : "ar"}
            className="mt-1 flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-[0.95rem] font-medium text-fg-soft transition duration-300 ease-smooth hover:bg-panel/70 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <Languages size={19} strokeWidth={1.9} aria-hidden className="text-fg-faint" />
            {lang.label}
          </a>
        </m.nav>

        <m.p
          variants={fadeUp}
          className="mt-auto pt-4 text-xs text-fg-faint"
        >
          © {new Date().getFullYear()} {SHELL_IDENTITY.name}. All rights reserved.
        </m.p>
      </div>
    </m.aside>
  );
}

import { m } from "framer-motion";
import { Languages } from "lucide-react";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "../ui/ThemeToggle";
import { LogoMark } from "../ui/Wordmark";
import { SHELL_IDENTITY, SHELL_NAV, isNavActive, navHref, navLabel } from "../../data/shell";
import { fadeUp, stagger } from "../../lib/motion";

interface ProfileSidebarProps {
  /** Current path, for the active nav state. */
  path: string;
  /** The same page in the other language. */
  lang: { href: string; label: string };
  locale?: "en" | "ar";
}

/**
 * The persistent profile rail: portrait, identity, socials, then the primary
 * navigation. Desktop only — MobileNav covers narrow viewports, and both read
 * SHELL_NAV so they can't drift.
 *
 * Sizing is deliberately budgeted so the whole rail — including the last nav
 * item — fits inside a 900px-tall viewport without a nested scrollbar. The
 * `overflow-y-auto` below is only a safety valve for genuinely short windows
 * (a laptop at 720px with browser chrome); at ordinary desktop heights nothing
 * scrolls but the page itself.
 */
export default function ProfileSidebar({ path, lang, locale = "en" }: ProfileSidebarProps) {
  const ar = locale === "ar";
  const tagline = ar ? SHELL_IDENTITY.taglineAr : SHELL_IDENTITY.tagline;
  const location = ar ? SHELL_IDENTITY.locationAr : SHELL_IDENTITY.location;
  return (
    <m.aside
      variants={stagger}
      initial="hidden"
      animate="show"
      aria-label="Profile and site navigation"
      className="hidden shrink-0 lg:block lg:w-[17.5rem] xl:w-[19rem] board:w-[21rem]"
    >
      <div className="sticky top-0 flex max-h-dvh flex-col gap-4 overflow-y-auto py-6 pe-1">
        {/* Portrait + identity, as one link home. The logo mark rides the
            portrait's corner so the brand asset stays present without a
            second lockup competing with the name below it. */}
        <m.a
          variants={fadeUp}
          href="/"
          aria-label={`${SHELL_IDENTITY.name} — home`}
          className="group flex flex-col items-center rounded-3xl px-2 pt-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        >
          <span className="relative">
            <img
              src={SHELL_IDENTITY.portrait}
              width={144}
              height={144}
              alt={`${SHELL_IDENTITY.name}, ${tagline}`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-[7.5rem] w-[7.5rem] rounded-full border border-line bg-panel object-cover object-top shadow-card transition duration-500 ease-smooth group-hover:-translate-y-0.5 board:h-[8.5rem] board:w-[8.5rem]"
            />
            <span
              aria-hidden
              className="absolute -bottom-0.5 -end-0.5 grid h-9 w-9 place-items-center rounded-full border border-line bg-panel shadow-pill"
            >
              <LogoMark size={20} />
            </span>
          </span>

          <h2 className="mt-4 font-display text-[1.6rem] font-extrabold leading-none tracking-tight text-fg">
            {SHELL_IDENTITY.name}
          </h2>
          {/* The handle is a Latin token: pin it LTR so RTL bidi doesn't
              throw the "@" to the far end of the line. */}
          <p className="mt-1.5 text-[0.8rem] font-medium text-fg-faint">
            <span dir="ltr">{SHELL_IDENTITY.handle}</span> · {location}
          </p>
          <p className="mt-1 text-[0.85rem] font-semibold text-accent-deep">{tagline}</p>
        </m.a>

        {/* Socials + theme switch, centred under the identity block. */}
        <m.div variants={fadeUp} className="flex items-center justify-center gap-2">
          <SocialLinks />
          <ThemeToggle />
        </m.div>

        <div className="hairline" aria-hidden />

        {/* Primary navigation */}
        <m.nav variants={fadeUp} aria-label="Primary" className="flex flex-col gap-0.5">
          {SHELL_NAV.map((item) => {
            const active = isNavActive(item, path);
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={navHref(item, locale)}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-[0.95rem] font-semibold transition duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                  active
                    ? "border border-line bg-panel text-fg shadow-pill"
                    : "border border-transparent text-fg-soft hover:bg-panel hover:text-fg"
                }`}
              >
                <Icon
                  size={19}
                  className={
                    active
                      ? "text-accent"
                      : "text-fg-faint transition-colors duration-300 group-hover:text-accent"
                  }
                />
                <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5">
                  {navLabel(item, locale)}
                </span>
              </a>
            );
          })}
          <a
            href={lang.href}
            lang={lang.label === "English" ? "en" : "ar"}
            className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-2.5 text-[0.95rem] font-semibold text-fg-soft transition duration-300 ease-smooth hover:bg-panel hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <Languages size={19} strokeWidth={2} aria-hidden className="text-fg-faint" />
            <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5">
              {lang.label}
            </span>
          </a>
        </m.nav>

        <m.p variants={fadeUp} className="pt-1 text-center text-[0.7rem] text-fg-faint">
          © {new Date().getFullYear()} {SHELL_IDENTITY.name}
        </m.p>
      </div>
    </m.aside>
  );
}

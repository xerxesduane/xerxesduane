import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Languages, ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import Wordmark from "./ui/Wordmark";
import Magnetic from "./fx/Magnetic";
import { getLenis } from "../lib/lenisStore";
import { NAV_LINKS } from "../data/content";
import { AR_NAV_LINKS, AR_CHROME } from "../data/servicePagesAr";
import { EASE } from "../lib/motion";
import { SERVICE_PAGES } from "../data/servicePages";

const menuVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

export default function Nav({
  langHref,
  langLabel,
  locale = "en",
}: {
  langHref: string;
  langLabel: string;
  locale?: "en" | "ar";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const ar = locale === "ar";
  const links = ar ? AR_NAV_LINKS : NAV_LINKS;
  const homeHref = ar ? "/ar" : "/";
  const bookLabel = ar ? AR_CHROME.bookAudit : "Book a free audit";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // body overflow alone doesn't halt Lenis's rAF scrolling — stop it too.
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-bl pt-3 sm:pt-4">
        <m.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className={`nav-surface flex items-center justify-between rounded-full px-4 py-2.5 sm:px-5 ${
            scrolled ? "nav-surface--scrolled" : ""
          }`}
        >
          <m.a
            href={homeHref}
            className="py-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <Wordmark />
            {/* name comes from the visible wordmark; suffix gives context */}
            <span className="sr-only">{ar ? "— الصفحة الرئيسية" : "— home"}</span>
          </m.a>

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href} className="group/nav relative">
                <Magnetic strength={0.25}>
                  <a
                    href={l.href}
                    className="nav-link inline-flex items-center gap-1 text-sm text-cream-dim/80 transition-colors duration-200 hover:text-gold"
                  >
                    {l.label}
                    {!ar && l.label === "Services" && <ChevronDown size={13} className="transition-transform group-hover/nav:rotate-180 group-focus-within/nav:rotate-180" />}
                  </a>
                </Magnetic>
                {!ar && l.label === "Services" && (
                  <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-5 opacity-0 transition duration-200 group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                    <div className="nav-surface grid grid-cols-2 gap-1 rounded-2xl p-3 shadow-2xl">
                      {SERVICE_PAGES.map((service) => {
                        const Icon = service.icon;
                        return (
                          <a key={service.slug} href={`/${service.slug}`} className="group/service flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gold/10 focus:bg-gold/10">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                              <Icon size={15} />
                            </span>
                            <span className="text-xs text-cream-dim transition-colors group-hover/service:text-gold">{service.navLabel}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <m.a
              href={langHref}
              lang={langLabel === "عربي" ? "ar" : "en"}
              aria-label={`Switch language to ${langLabel}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 px-3 py-2 text-sm text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <Languages size={15} />
              {langLabel}
            </m.a>
            <Magnetic strength={0.35} className="hidden sm:inline-block">
              <m.a
                href="#contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep shadow-[0_8px_24px_-10px_rgba(218,164,66,0.7)] transition-colors duration-300 hover:bg-gold-soft"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                {bookLabel}
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </m.a>
            </Magnetic>
            <m.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? (ar ? AR_CHROME.closeMenu : "Close menu") : (ar ? AR_CHROME.openMenu : "Open menu")}
              aria-expanded={open}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold/50 hover:text-gold md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </m.span>
              </AnimatePresence>
            </m.button>
          </div>
        </m.nav>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-ink-deep/70 backdrop-blur-sm md:hidden"
            />
            <m.div
              key="nav-panel"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="container-bl md:hidden"
            >
              <div className="nav-surface mt-2 max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-2xl p-4">
                <m.ul
                  className="flex flex-col"
                  variants={menuVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {links.map((l) => (
                    <m.li key={l.href} variants={itemVariants}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-3 text-base text-cream transition-colors hover:bg-gold/10 hover:text-gold"
                      >
                        {l.label}
                      </a>
                    </m.li>
                  ))}
                </m.ul>
                {!ar && (
                  <div className="mt-3 border-t border-cream/10 pt-3">
                    <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-wider text-gold">Service directory</p>
                    <div className="grid grid-cols-2 gap-1">
                      {SERVICE_PAGES.map((service) => (
                        <a
                          key={service.slug}
                          href={`/${service.slug}`}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-xs leading-tight text-cream-dim transition-colors hover:bg-gold/10 hover:text-gold"
                        >
                          {service.navLabel}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <m.a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.08 + links.length * 0.055 }}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink-deep shadow-[0_10px_30px_-12px_rgba(218,164,66,0.8)]"
                >
                  {bookLabel}
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </m.a>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

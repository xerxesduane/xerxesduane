import Wordmark from "./ui/Wordmark";
import { InstagramIcon, LinkedinIcon } from "./ui/BrandIcons";
import { CONTACT, NAV_LINKS } from "../data/content";
import { SERVICE_PAGES } from "../data/servicePages";
import { SERVICE_PAGES_AR, AR_CHROME } from "../data/servicePagesAr";

export default function Footer({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const tagline = ar
    ? AR_CHROME.footerTagline
    : "Independent systems support for small businesses in Dubai.";
  const serviceItems = ar
    ? SERVICE_PAGES_AR.map((p) => ({ href: `/ar/${p.slug}`, label: p.navLabel }))
    : SERVICE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.navLabel }));
  const gridCols = ar
    ? "sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]"
    : "sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1.55fr_1fr]";
  const linkCls = "link-grow text-cream-dim transition-colors hover:text-gold";

  return (
    <footer className="border-t border-cream/8 bg-ink-deep/60 py-14">
      <div className="container-bl">
        <div className={`grid gap-10 ${gridCols}`}>
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs font-display text-lg italic text-cream-dim">
              {tagline}
            </p>
            {!ar && (
              <>
                <p className="mt-3 text-sm text-muted">
                  Xerxes Duane · Dubai, UAE
                </p>
                <p className="mt-1 text-xs text-muted-dark">
                  Serving Dubai &amp; the wider UAE.
                </p>
              </>
            )}
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.linkedin.com/in/xerxesduane"
                target="_blank"
                rel="noopener"
                aria-label={ar ? AR_CHROME.linkedinAria : "Xerxes Duane on LinkedIn"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.instagram.com/xerxes.duane"
                target="_blank"
                rel="noopener"
                aria-label={ar ? AR_CHROME.instagramAria : "Xerxes Duane on Instagram"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Studio column (English only — no Arabic equivalents yet) */}
          {!ar && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/case-studies" className={linkCls}>
                    Case studies
                  </a>
                </li>
                <li>
                  <a href="/ai-lab" className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-soft">
                    AI Lab
                    <span aria-hidden>→</span>
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              {ar ? AR_CHROME.footerServicesHeading : "Services in Dubai"}
            </h3>
            <ul className={`mt-4 text-sm ${ar ? "space-y-2.5" : "grid grid-cols-2 gap-x-4 gap-y-2.5"}`}>
              {serviceItems.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={linkCls}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              {ar ? AR_CHROME.footerContactHeading : "Get in touch"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                  className={linkCls}
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={linkCls}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href="/whatsapp-optin.html" className={linkCls}>
                  {ar ? "تحديثات واتساب" : "Get WhatsApp updates"}
                </a>
              </li>
              <li className="text-muted">{ar ? "دبي، الإمارات" : CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/8 pt-6 text-xs text-muted-dark sm:flex-row">
          {ar ? (
            <>
              <span>© {new Date().getFullYear()} {AR_CHROME.footerRights}</span>
              <span>{AR_CHROME.footerSince}</span>
            </>
          ) : (
            <>
              <span>© {new Date().getFullYear()} Xerxes Duane. Built with care in Dubai.</span>
              <span className="flex items-center gap-3">
                <a href="/privacy" className="transition-colors hover:text-gold">
                  Privacy
                </a>
                <span aria-hidden>·</span>
                <a href="/terms" className="transition-colors hover:text-gold">
                  Terms
                </a>
                <span aria-hidden>·</span>
                <span>Quietly trusted since 2019.</span>
              </span>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

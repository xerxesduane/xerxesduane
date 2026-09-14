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
  const linkCls =
    "link-grow inline-block py-1 text-cream-dim transition-colors hover:text-gold lg:py-0";

  return (
    <footer className="border-t border-cream/8 bg-ink-deep/60 py-6 lg:py-5">
      <div className="container-bl">
        {/* Desktop: four stacked columns cost ~450px, which no page can spare
            if it is to fit one screen. The footer is still navigation — it is
            just one row of it here. */}
        <nav
          aria-label={ar ? AR_CHROME.footerServicesHeading : "Footer"}
          className="hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm lg:flex"
        >
          {(ar ? serviceItems.slice(0, 6) : NAV_LINKS).map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Phone: the same links, folded rather than stacked. Four full
            columns ran 1,431px — three times the page above them — and the
            five primary destinations already live in the bottom bar, so here
            they are a wrapped row, the service pages sit behind a disclosure
            (still in the markup, still crawlable), and contact is one line. */}
        <div className="lg:hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Wordmark />
              <p className="mt-2.5 max-w-xs font-display text-base italic text-cream-dim">
                {tagline}
              </p>
              {!ar && (
                <p className="mt-2 text-xs text-muted">Xerxes Duane · Dubai, UAE</p>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
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

          {!ar && (
            <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-x-4 gap-y-0.5 text-sm">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className={linkCls}>
                  {l.label}
                </a>
              ))}
              <a href="/case-studies" className={linkCls}>
                Case studies
              </a>
              <a href="/insights" className="link-grow inline-block py-1 text-gold transition-colors hover:text-gold-soft">
                Insights
              </a>
            </nav>
          )}

          <details className="group mt-3 rounded-xl border border-cream/10 px-4 pb-2.5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2.5 font-mono text-xs uppercase tracking-wider text-muted-dark [&::-webkit-details-marker]:hidden">
              {ar ? AR_CHROME.footerServicesHeading : "Services in Dubai"}
              <span aria-hidden className="transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              {serviceItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <div className="mt-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              {ar ? AR_CHROME.footerContactHeading : "Get in touch"}
            </h3>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-sm">
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
              <li className="py-1 text-muted">{ar ? "دبي، الإمارات" : CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-cream/8 pt-4 text-xs text-muted-dark sm:flex-row lg:mt-4 lg:border-t-0 lg:pt-0">
          {ar ? (
            <>
              <span>© {new Date().getFullYear()} {AR_CHROME.footerRights}</span>
              <span>{AR_CHROME.footerSince}</span>
            </>
          ) : (
            <>
              <span>© {new Date().getFullYear()} Xerxes Duane. Built with care in Dubai.</span>
              <span className="flex items-center gap-3">
                <a href="/privacy" className="inline-block py-1 transition-colors hover:text-gold lg:py-0">
                  Privacy
                </a>
                <span aria-hidden>·</span>
                <a href="/terms" className="inline-block py-1 transition-colors hover:text-gold lg:py-0">
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

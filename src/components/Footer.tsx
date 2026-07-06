import Wordmark from "./ui/Wordmark";
import { CONTACT, NAV_LINKS } from "../data/content";
import { SERVICE_PAGES } from "../data/servicePages";
import { SERVICE_PAGES_AR, AR_CHROME } from "../data/servicePagesAr";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.36 2.67.95 3.34.64 4.13.34 4.9.14 5.77.08 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56.79-.31 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92-.31-.79-.72-1.46-1.38-2.12C21.33 1.36 20.66.95 19.87.64c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
  );
}

export default function Footer({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const tagline = ar
    ? AR_CHROME.footerTagline
    : "Serve first. Build second.";
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

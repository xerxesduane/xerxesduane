import Wordmark from "./ui/Wordmark";
import { CONTACT, NAV_LINKS } from "../data/content";
import { SERVICE_PAGES } from "../data/servicePages";

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

export default function Footer() {
  return (
    <footer className="border-t border-cream/8 bg-ink-deep/60 py-14">
      <div className="container-bl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs font-display text-lg italic text-cream-dim">
              Smart systems. Honest work. Real results.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              Studio
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-cream-dim transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              Services in Dubai
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICE_PAGES.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/${p.slug}`}
                    className="text-cream-dim transition-colors hover:text-gold"
                  >
                    {p.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-dark">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-cream-dim transition-colors hover:text-gold"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-muted">{CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/8 pt-6 text-xs text-muted-dark sm:flex-row">
          <span>© {new Date().getFullYear()} Threshold Works. Built with care in Dubai.</span>
          <span>Quietly trusted since 2019.</span>
        </div>
      </div>
    </footer>
  );
}

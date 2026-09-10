/**
 * Certifications, partner badges and qualifications — real ones only.
 *
 * EMPTY ON PURPOSE. The Credentials tile on the homepage renders only when
 * this array has entries, and the board rebalances around it when it doesn't,
 * so an unfilled list costs nothing and claims nothing. A certification is the
 * kind of thing a prospect checks, so an invented one is worse than a missing
 * one.
 *
 * To add one:
 *
 *   { name: "Odoo Certified v17", issuer: "Odoo", year: 2025,
 *     href: "https://…verification-url" }
 *
 * `href` should point at something a stranger can verify — the issuer's
 * directory entry or a credential page. Leave it off rather than linking
 * somewhere that doesn't prove anything. Drop a square logo into
 * /public/brand/credentials/ and name it in `logo` if the issuer has one.
 */
export interface Credential {
  /** The certification as the issuer words it. */
  name: string;
  /** Who awarded it. */
  issuer: string;
  /** Year awarded, or omitted if it isn't dated. */
  year?: number;
  /** A public page a stranger could check it against. */
  href?: string;
  /** Path under /public, e.g. "/brand/credentials/odoo.png". */
  logo?: string;
}

export const CREDENTIALS: Credential[] = [];

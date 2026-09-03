/**
 * Trust / social-proof signals — single source of truth.
 *
 * Everything here is OFF until `enabled: true` and real values are filled in.
 * Do NOT publish invented numbers or a fake rating — Google penalises
 * self-serving review markup, and false claims erode the exact trust we want.
 *
 * To go live:
 *   1. Fill the real values below (see "HOW TO GET" notes).
 *   2. Set `enabled: true`.
 *   3. Deploy. The <GoogleRating /> badge then renders in the contact section.
 *   4. (Optional) Once you have genuine Google reviews, ask to add an
 *      `aggregateRating` node to the Organization JSON-LD in index.html.
 */
export interface TrustConfig {
  enabled: boolean;
  /** e.g. 40 — businesses helped. Count real, nameable clients. */
  clientCount: number | null;
  /** Founding year, already shown elsewhere as "since 2019". */
  since: number;
  /** Real Google Business Profile rating, or null to hide. */
  google: {
    rating: number; // e.g. 4.9  (HOW TO GET: your Google Business Profile)
    reviewCount: number; // e.g. 27
    url: string; // public reviews link (share.google/… already in schema)
  } | null;
  /**
   * Client logos for the logo wall.
   *
   * Deliberately empty: a logo IS the client's name, so the wall is off
   * site-wide and the image files have been removed. Proof is carried by
   * RESULTS and CASE_STUDIES instead. Only add entries here for a client who
   * has given written permission to be named.
   */
  logos: { name: string; src: string }[];
}

export const TRUST: TrustConfig = {
  // The logo wall is off — the site names no clients. The Google rating is live
  // only because it points to a real public profile.
  enabled: true,
  clientCount: 50,
  since: 2019,
  google: {
    rating: 5,
    reviewCount: 5,
    url: "https://maps.app.goo.gl/NnSU1FNaZKF2EJE99",
  },
  logos: [],
};

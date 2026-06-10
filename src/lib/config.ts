/**
 * Feature flags for the motion system.
 *
 * PRELOADER_ENABLED: the intro count-up curtain. Shipped OFF until Lighthouse
 * numbers are compared — because the curtain mounts after hydration, enabling
 * it also means uncommenting the first-paint snippet in index.html (see the
 * "tw-intro" comment there) so there is no flash-then-cover artifact.
 */
export const PRELOADER_ENABLED = false;

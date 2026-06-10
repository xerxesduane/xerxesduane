import type Lenis from "lenis";

/**
 * Module-level handle to the active Lenis instance (type-only import — no
 * runtime cost, SSR-safe). Lets the nav stop/start scrolling for the mobile
 * menu and lets anchor handling scroll smoothly, without prop-drilling.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

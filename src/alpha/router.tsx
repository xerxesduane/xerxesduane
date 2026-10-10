/**
 * A small stand-in for the parts of @tanstack/react-router that Alpha Connect
 * uses, so the app's pages could be carried over from its original build
 * unchanged: createFileRoute, Link, useLocation, useNavigate and
 * Route.useSearch.
 *
 * The app lives under one path on the ministry host (BASE). Every `to` in the
 * pages is written as if the app sat at the root, exactly as it did before,
 * and is prefixed here. Navigation is pushState; middleware.ts serves the
 * same alpha-connect.html for every path below BASE, so a refresh or a
 * shared deep link lands on the right screen.
 */
import { useEffect, useSyncExternalStore, type AnchorHTMLAttributes, type ComponentType, type MouseEvent } from "react";

export const BASE = "/alpha-connect";

type HeadMeta = { title?: string; name?: string; property?: string; content?: string };

type RouteOptions = {
  component: ComponentType;
  validateSearch?: (raw: Record<string, unknown>) => unknown;
  head?: () => { meta?: HeadMeta[] };
};

export type AppRoute = {
  path: string;
  options: RouteOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSearch: () => any;
};

/** Every page registers itself here when its module loads. */
export const routes = new Map<string, AppRoute>();

/** "/run-alpha/" and "/run-alpha" are the same screen. */
function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function createFileRoute(path: string) {
  return (options: RouteOptions): AppRoute => {
    const route: AppRoute = {
      path: normalize(path),
      options,
      useSearch: () => {
        const { search } = useLocation();
        const raw = Object.fromEntries(new URLSearchParams(search));
        return options.validateSearch ? options.validateSearch(raw) : raw;
      },
    };
    routes.set(route.path, route);
    return route;
  };
}

/* ---------- location ---------- */

const NAV_EVENT = "alpha:navigate";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
}

const snapshot = () => window.location.pathname + window.location.search;

/** The app-relative path: "/alpha-connect/invites" reads as "/invites". */
function appPath(pathname: string): string {
  if (pathname === BASE || pathname === `${BASE}/`) return "/";
  if (pathname.startsWith(`${BASE}/`)) return normalize(pathname.slice(BASE.length));
  // Anywhere else (a preview or localhost serving the bare html file).
  return "/";
}

export function useLocation() {
  const href = useSyncExternalStore(subscribe, snapshot, snapshot);
  const url = new URL(href, window.location.origin);
  return { pathname: appPath(url.pathname), search: url.search };
}

export function hrefFor(to: string, search?: Record<string, string | undefined>): string {
  const path = to === "/" ? BASE : `${BASE}${to}`;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(search ?? {})) if (v !== undefined) params.set(k, v);
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

function go(href: string, replace = false) {
  if (href === snapshot()) return;
  if (replace) window.history.replaceState(null, "", href);
  else window.history.pushState(null, "", href);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function useNavigate() {
  return ({ to, search, replace }: { to: string; search?: Record<string, string | undefined>; replace?: boolean }) =>
    go(hrefFor(to, search), replace);
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  search?: Record<string, string | undefined>;
};

export function Link({ to, search, onClick, children, ...rest }: LinkProps) {
  const href = hrefFor(to, search);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target) return;
    e.preventDefault();
    go(href);
  };
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

/* ---------- rendering ---------- */

const DEFAULT_TITLE = "Alpha at Fellowship · Invite friends to Alpha in Dubai";

export function RouterView({ notFound: NotFound }: { notFound: ComponentType }) {
  const { pathname } = useLocation();
  const route = routes.get(pathname);

  useEffect(() => {
    // Each screen starts at the top, as it did with the original router.
    window.scrollTo(0, 0);
    const meta = route?.options.head?.().meta ?? [];
    document.title = meta.find((m) => m.title)?.title ?? DEFAULT_TITLE;
  }, [route]);

  if (!route) return <NotFound />;
  const Page = route.options.component;
  return <Page />;
}

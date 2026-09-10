import { useEffect, useState } from "react";

/**
 * This month's visit count, or `null` when there isn't one to show.
 *
 * `null` is load-bearing. It covers the prerender (no number in the static
 * HTML, which would otherwise be cached and stale), the moment before the
 * request lands, and every failure — endpoint unconfigured, offline, blocked.
 * Callers render nothing at all in that state rather than a zero or a
 * placeholder, because an invented visitor count is worse than no count.
 *
 * WHAT COUNTS AS A VISIT
 * Once per browser session. The flag lives in `sessionStorage`, so it clears
 * when the tab closes and is never sent anywhere; the server receives a single
 * boolean and stores an integer. No cookie, no identifier, nothing that could
 * be traced back to a person — which is why this runs without waiting on the
 * analytics consent banner, and why the privacy page describes it separately
 * from GA4 and Clarity.
 *
 * Where storage is unavailable (private windows, blocked site data) the read
 * throws and we deliberately do NOT count — a browser that can't remember it
 * already visited would otherwise count every single page load.
 */
const SESSION_KEY = "xd-visited";

/**
 * One request per page load, shared by every consumer. The rail and the mobile
 * header both want this number; without the module-level promise they would
 * fire two requests and count the visit twice.
 */
let inflight: Promise<number | null> | null = null;

function isNewSession(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  } catch {
    return false;
  }
}

function fetchVisits(): Promise<number | null> {
  inflight ??= fetch("/api/visits", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ count: isNewSession() }),
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { visits?: number } | null) =>
      typeof data?.visits === "number" && Number.isFinite(data.visits) ? data.visits : null,
    )
    .catch(() => null);
  return inflight;
}

export function useVisitCount(): number | null {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    void fetchVisits().then((n) => {
      if (live) setVisits(n);
    });
    return () => {
      live = false;
    };
  }, []);

  return visits;
}

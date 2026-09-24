// Grounding for the ministry assistant (/api/ministry-assistant).
//
// Reads exactly one page, /ministry, and only the page's own content: the
// story, the talks, the projects and the ways to partner, without the business
// shell (nav, pricing links, consent banner) around it. That content is about
// 17,000 characters of text, so the whole of it fits in context and there is
// nothing to retrieve or rank.
//
// The separation runs both ways. This loader never reads a business page, and
// the business assistant never reads this one (/ministry is not in
// _siteContext's ROUTES), so neither bot can answer from the other's material.
import { htmlToText, isFetchableUrl } from "./_fetchUrl";

const PATH = "/ministry";
/** A little over the page's main text, so an edit that grows it isn't cut. */
const BUDGET = 24_000;

// Static per deployment, so a short in-isolate cache makes a conversation one
// fetch rather than one per turn. A miss costs a fetch, never an error.
const TTL_MS = 15 * 60_000;
let cache: { origin: string; text: string; at: number } | null = null;

/**
 * The page's own content, without the shell around it.
 *
 * The prerender streams each route through a Suspense boundary, so in the
 * static HTML `<main>` holds only a placeholder; the page itself arrives
 * further down as `<div hidden id="S:0">…</div>`, followed by the script that
 * swaps it into place. Falls back to `<main>`, then the whole document, if
 * that ever changes.
 */
function pageContent(html: string): string {
  const start = html.indexOf('<div hidden id="S:0">');
  if (start !== -1) {
    const end = html.indexOf("<script", start);
    return html.slice(start, end === -1 ? undefined : end);
  }
  return /<main[\s\S]*?<\/main>/i.exec(html)?.[0] ?? html;
}

export async function buildMinistryContext(origin: string): Promise<string> {
  if (cache && cache.origin === origin && Date.now() - cache.at < TTL_MS) return cache.text;

  const url = isFetchableUrl(`${origin}${PATH}`);
  if (!url) return "";

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    // Our own page on our own deployment: no redirect is expected, so any
    // redirect is refused rather than followed.
    const res = await fetch(url.toString(), {
      signal: ctrl.signal,
      redirect: "error",
      headers: { "user-agent": "XerxesDuaneMinistryAssistant/1.0" },
    });
    if (!res.ok) return "";
    const text = htmlToText(pageContent(await res.text())).slice(0, BUDGET);
    if (text) cache = { origin, text, at: Date.now() };
    return text;
  } catch {
    // The endpoint answers without the page and says so, rather than failing.
    return "";
  } finally {
    clearTimeout(timer);
  }
}

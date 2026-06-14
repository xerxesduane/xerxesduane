// Shared URL-fetch helpers for the demo endpoints that read a public page
// (grounded Q&A, conversion critique). Extracted verbatim from api/demo/ask.ts
// so the SSRF guards, manual redirect re-validation, timeout and size cap live
// in one place and can't drift between callers.
//
// Safety model for a PUBLIC, unauthenticated demo: https-only, an SSRF blocklist
// (localhost/.local/.internal/private IP ranges), redirects followed manually
// and re-validated each hop, a 7s AbortController timeout, and a ~400KB cap on
// the raw HTML before stripping.

/** Best-effort HTML → text: drop scripts/styles/tags, decode a few entities. */
export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|br|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

/** Reject non-https and obvious internal/private targets (basic SSRF guard). */
export function isFetchableUrl(raw: string): URL | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^(127\.|10\.|192\.168\.|169\.254\.|0\.0\.0\.0$|\[?::1\]?$)/.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  ) {
    return null;
  }
  return u;
}

export async function fetchUrlText(url: URL): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    // Follow redirects MANUALLY, re-validating each hop against the SSRF
    // allowlist — otherwise a public host could 30x-redirect us to an internal
    // IP (169.254.169.254, 127.0.0.1, 10.x…) that the first check never saw.
    let current = url;
    let res: Response | undefined;
    for (let hop = 0; hop < 5; hop++) {
      res = await fetch(current.toString(), {
        signal: ctrl.signal,
        redirect: "manual",
        headers: { "user-agent": "XerxesDuaneDemoBot/1.0 (+https://www.xerxesduane.com/demos)" },
      });
      if (res.status < 300 || res.status >= 400) break;
      const loc = res.headers.get("location");
      if (!loc) break;
      const next = isFetchableUrl(new URL(loc, current).toString());
      if (!next) throw new Error("it redirects somewhere that isn't allowed.");
      current = next;
    }
    if (!res) throw new Error("no response.");
    if (res.status >= 300 && res.status < 400) throw new Error("too many redirects.");
    if (!res.ok) throw new Error(`The page returned ${res.status}.`);
    const buf = await res.arrayBuffer();
    // Cap at ~400KB of raw HTML before stripping.
    const html = new TextDecoder("utf-8").decode(buf.slice(0, 400_000));
    return htmlToText(html);
  } finally {
    clearTimeout(timer);
  }
}

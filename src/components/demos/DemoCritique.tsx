import { useRef, useState } from "react";
import { ArrowRight, ClipboardList, FileText, Link2, Sparkles } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

const EXAMPLE_URL = "https://example.com/your-landing-page";

const EXAMPLE_COPY = `Welcome to CleanPro

We are a cleaning company. We do cleaning for homes and offices in Dubai.
Our team has many years of experience and we use good products.

We offer a range of services at competitive prices. Quality is our priority.

Contact us today to learn more about what we can do for you.

Email: info@cleanpro.example`;

const FIELD =
  "w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

const SERVICE_HREF = "/landing-page-design-dubai";

export default function DemoCritique() {
  const [source, setSource] = useState<"url" | "paste">("url");
  const [url, setUrl] = useState("");
  const [copy, setCopy] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function critique(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    track("demo_run", { demo: "critique" });
    setError("");
    setResult("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo(
        "/api/demo/critique",
        { source, content: source === "url" ? url : copy },
        (full) => setResult(full),
        ctrl.signal,
      );
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const tabCls = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
      active ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
    }`;

  const canSubmit = source === "url" ? url.trim().length > 0 : copy.trim().length >= 40;

  return (
    <form onSubmit={critique} className="flex flex-col gap-3">
      <div className="flex items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
        <button type="button" onClick={() => setSource("url")} className={tabCls(source === "url")}>
          <Link2 size={13} /> From a URL
        </button>
        <button type="button" onClick={() => setSource("paste")} className={tabCls(source === "paste")}>
          <FileText size={13} /> Paste copy
        </button>
      </div>

      {source === "url" ? (
        <div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-landing-page"
            aria-label="Landing page URL"
            inputMode="url"
            className={FIELD}
          />
          <button
            type="button"
            onClick={() => setUrl(EXAMPLE_URL)}
            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
          >
            <Sparkles size={12} /> Load an example
          </button>
        </div>
      ) : (
        <div>
          <textarea
            value={copy}
            onChange={(e) => setCopy(e.target.value)}
            rows={7}
            placeholder="Paste your landing-page copy — headline, subhead, body, CTAs…"
            aria-label="Landing page copy"
            className={`${FIELD} resize-none`}
          />
          <button
            type="button"
            onClick={() => setCopy(EXAMPLE_COPY)}
            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
          >
            <Sparkles size={12} /> Load an example
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !canSubmit}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ClipboardList size={16} />
        {loading ? "Reviewing…" : "Critique my page"}
      </button>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {(result || loading) && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={loading}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm leading-relaxed text-cream-dim"
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">
            Conversion critique
          </p>
          <p className="whitespace-pre-wrap">{result || "…"}</p>
        </div>
      )}

      <a
        href={SERVICE_HREF}
        data-cursor="link"
        className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
      >
        Get a site that converts
        <ArrowRight size={14} />
      </a>
    </form>
  );
}

import { useRef, useState } from "react";
import { ArrowRight, FileText, Link2, Sparkles } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

const EXAMPLE_TEXT = `Greenfield Landscaping — Service Terms (2026)

We serve residential and commercial clients across Dubai and Sharjah. Standard
maintenance visits are weekly or fortnightly. Our weekly garden package starts
at AED 450/month and includes mowing, edging, weeding, and seasonal planting.

Payment is due within 14 days of invoice. We accept bank transfer and card.
Cancellations require 7 days' notice. Emergency call-outs (storm damage,
irrigation failure) are available within 24 hours at AED 200 per visit.

All staff are insured. We guarantee our planting for 30 days.`;

export default function DemoAsk() {
  const [source, setSource] = useState<"text" | "url">("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    track("demo_run", { demo: "ask" });
    setError("");
    setAnswer("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo(
        "/api/demo/ask",
        { source, content: source === "text" ? text : url, question },
        (full) => setAnswer(full),
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

  const field =
    "w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

  return (
    <form onSubmit={ask} className="flex flex-col gap-3">
      <div className="flex items-center gap-1 rounded-full border border-cream/10 bg-ink-deep/40 p-1 self-start">
        <button type="button" onClick={() => setSource("text")} className={tabCls(source === "text")}>
          <FileText size={13} /> Paste text
        </button>
        <button type="button" onClick={() => setSource("url")} className={tabCls(source === "url")}>
          <Link2 size={13} /> From a URL
        </button>
      </div>

      {source === "text" ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Paste any text — a policy, a product page, an FAQ, meeting notes…"
            aria-label="Source text"
            className={`${field} resize-none`}
          />
          <button
            type="button"
            onClick={() => {
              setText(EXAMPLE_TEXT);
              setQuestion("How much is the weekly package and when is payment due?");
            }}
            className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
          >
            <Sparkles size={12} /> Load an example
          </button>
        </div>
      ) : (
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/a-public-page"
          aria-label="Source URL"
          inputMode="url"
          className={field}
        />
      )}

      <div className="flex items-end gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about it…"
          aria-label="Your question"
          className={field}
        />
        <button
          type="submit"
          disabled={loading || !question.trim() || (source === "text" ? !text.trim() : !url.trim())}
          className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Reading…" : "Ask"}
          {!loading && <ArrowRight size={16} strokeWidth={2.3} />}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {(answer || loading) && (
        <div role="status" aria-live="polite" aria-busy={loading} className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-sm leading-relaxed text-cream-dim">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">Answer</p>
          <p className="whitespace-pre-wrap">{answer || "…"}</p>
        </div>
      )}
    </form>
  );
}

import { useRef, useState } from "react";
import { ArrowLeftRight, Languages, Sparkles } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Dir = "auto" | "ar2en" | "en2ar";

const DIRS: { id: Dir; label: string }[] = [
  { id: "auto", label: "Auto-detect" },
  { id: "ar2en", label: "Arabic → English" },
  { id: "en2ar", label: "English → Arabic" },
];

const EXAMPLE = "Could we move tomorrow's meeting to 2pm? I'd like to walk you through the new proposal before we sign off.";

export default function DemoTranslate() {
  const [direction, setDirection] = useState<Dir>("auto");
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function translate(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !text.trim()) return;
    track("demo_run", { demo: "translate" });
    setError("");
    setOut("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo("/api/demo/translate", { text, direction }, (full) => setOut(full), ctrl.signal);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={translate} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
        {DIRS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDirection(d.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              direction === d.id ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
            }`}
          >
            {d.id === "auto" ? <Languages size={13} /> : <ArrowLeftRight size={13} />}
            {d.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        dir="auto"
        placeholder="Type or paste text in Arabic or English…"
        aria-label="Text to translate"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setText(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Translating…" : "Translate"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {(out || loading) && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={loading}
          dir="auto"
          className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-[15px] leading-relaxed text-cream-dim"
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">Translation</p>
          <p className="whitespace-pre-wrap">{out || "…"}</p>
        </div>
      )}
    </form>
  );
}

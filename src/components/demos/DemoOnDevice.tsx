import { useRef, useState } from "react";
import { Cpu, Search, Download, ShieldCheck, ArrowRight } from "lucide-react";
import { track } from "../../lib/analytics";

// Runs a real embedding model FULLY in the browser via transformers.js, loaded
// on click from a CDN (allow-listed in the CSP) so the /ai-lab page stays light
// and prerenders cleanly — the library and model weights are only fetched when
// the visitor opts in. After the one-time download nothing leaves the device.

type Extractor = (
  input: string[],
  opts?: Record<string, unknown>,
) => Promise<{ tolist(): number[][] }>;
type TransformersModule = {
  pipeline: (task: string, model: string, opts?: Record<string, unknown>) => Promise<Extractor>;
};

const CDN = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6";
const MODEL = "Xenova/all-MiniLM-L6-v2";

const FAQS: { q: string; a: string }[] = [
  { q: "How much does a website cost?", a: "Most small-business sites start from AED 6,000. You get one fixed quote after a free audit — no surprises, no lock-in." },
  { q: "Do you work with Odoo or ERP systems?", a: "Yes — Odoo/ERP and CRM setup is a core service: sales, inventory, accounting and more, connected into one system." },
  { q: "Can you build AI automation for my business?", a: "Yes — from WhatsApp automation to AI assistants and agents. The same tools you can try live here in the AI Lab." },
  { q: "Do you work in Arabic?", a: "Bilingual is the default in Dubai — websites, support and AI assistants all work in Arabic and English." },
  { q: "How do we get started?", a: "Book a free 60-minute systems audit. No pressure — you leave with a plan whether or not you hire me." },
  { q: "Where are you based?", a: "Dubai, UAE — serving small businesses across the UAE and the wider GCC." },
  { q: "Do I own what you build?", a: "Yes — you own all the code, accounts and data. No lock-in, ever." },
];

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length && i < b.length; i++) s += a[i] * b[i];
  return s;
}

const field =
  "w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

export default function DemoOnDevice() {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("");
  const [match, setMatch] = useState<{ q: string; a: string; score: number } | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const extractorRef = useRef<Extractor | null>(null);
  const faqVecsRef = useRef<number[][]>([]);

  async function load() {
    if (status === "loading" || status === "ready") return;
    setStatus("loading");
    setError("");
    setProgress(0);
    track("demo_run", { demo: "ondevice", step: "load" });
    try {
      const mod = (await import(/* @vite-ignore */ CDN)) as unknown as TransformersModule;
      const extractor = await mod.pipeline("feature-extraction", MODEL, {
        progress_callback: (p: { status?: string; progress?: number }) => {
          if (typeof p.progress === "number") setProgress(Math.min(100, Math.round(p.progress)));
        },
      });
      const out = await extractor(
        FAQS.map((f) => f.q),
        { pooling: "mean", normalize: true },
      );
      faqVecsRef.current = out.tolist();
      extractorRef.current = extractor;
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("Couldn't load the in-browser model — your network or browser may block it. Everything else in the Lab still works.");
    }
  }

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const extractor = extractorRef.current;
    if (!extractor || searching || query.trim().length < 3) return;
    setSearching(true);
    setError("");
    track("demo_run", { demo: "ondevice", step: "search" });
    try {
      const out = await extractor([query.trim()], { pooling: "mean", normalize: true });
      const qv = out.tolist()[0];
      let best = -Infinity;
      let bi = 0;
      faqVecsRef.current.forEach((v, i) => {
        const d = dot(qv, v);
        if (d > best) {
          best = d;
          bi = i;
        }
      });
      setMatch({ ...FAQS[bi], score: best });
    } catch {
      setError("Search failed — try again.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-start gap-1.5 font-mono text-[10.5px] leading-snug text-muted-dark">
        <ShieldCheck size={12} className="mt-px shrink-0 text-gold/60" />
        Semantic FAQ search that runs entirely in your browser. The model loads once (~30 MB, then cached) and every
        search after that is instant, free, and private — nothing leaves your device.
      </p>

      {status !== "ready" ? (
        <button
          type="button"
          onClick={load}
          disabled={status === "loading"}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? <Cpu size={16} className="motion-safe:animate-pulse" /> : <Download size={16} />}
          {status === "loading" ? `Loading the model… ${progress}%` : "Load the model & run on-device"}
        </button>
      ) : (
        <form onSubmit={search} className="flex items-end gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask in your own words — e.g. 'what'll a site set me back?'"
            aria-label="Ask the FAQ"
            className={field}
          />
          <button
            type="submit"
            disabled={searching || query.trim().length < 3}
            className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Search size={16} />
            {searching ? "…" : "Search"}
          </button>
        </form>
      )}

      {status === "loading" && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
          <div className="h-full rounded-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {match && (
        <div role="status" aria-live="polite" className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Closest match</p>
            <span className="font-mono text-[10px] text-muted-dark">similarity {(match.score * 100).toFixed(0)}%</span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-cream">{match.q}</p>
          <p className="mt-1 text-sm text-cream-dim">{match.a}</p>
        </div>
      )}

      <a
        href="/#contact"
        data-cursor="link"
        className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
      >
        Want private, on-device AI in your product? Let's talk
        <ArrowRight size={14} />
      </a>
    </div>
  );
}

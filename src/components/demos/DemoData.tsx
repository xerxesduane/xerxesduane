import { useState } from "react";
import { BarChart3, Sparkles, Lightbulb, ArrowRight } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Insights = {
  headline: string;
  insights: { title: string; detail: string }[];
  chart: { type: "bar" | "line"; title: string; unit: string; labels: string[]; values: number[] };
  nextAction: string;
};

const EXAMPLE = `month,orders,revenue_aed
Jan,120,42000
Feb,135,47800
Mar,98,35100
Apr,160,58200
May,142,51900
Jun,175,64300`;

const field =
  "w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 font-mono text-[13px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

export default function DemoData() {
  const [csv, setCsv] = useState(EXAMPLE);
  const [result, setResult] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const text = (await file.text()).slice(0, 4000);
    setCsv(text);
    setResult(null);
  }

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading || csv.trim().length < 20) return;
    track("demo_run", { demo: "data" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Insights>("/api/demo/data", { csv }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={run} className="flex flex-col gap-3">
      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        rows={6}
        spellCheck={false}
        placeholder="Paste a small CSV — a header row and a few rows of sales, orders, leads…"
        aria-label="CSV data"
        className={field}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCsv(EXAMPLE)}
            className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
          >
            <Sparkles size={12} /> Load an example
          </button>
          <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold">
            Upload .csv
            <input type="file" accept=".csv,text/csv,text/plain" onChange={onFile} className="sr-only" />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading || csv.trim().length < 20}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BarChart3 size={15} />
          {loading ? "Analysing…" : "Find the insights"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {result && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={loading}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-4"
        >
          <p className="text-sm font-medium text-cream">{result.headline}</p>

          <Chart chart={result.chart} />

          <div className="mt-4 flex flex-col gap-3">
            {result.insights.map((it, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/10 font-mono text-[10px] text-gold ring-1 ring-gold/20">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-cream-dim">{it.title}</p>
                  <p className="text-xs text-muted">{it.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-ink-deep/50 p-3">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Recommended next step</p>
              <p className="mt-0.5 text-sm text-cream-dim">{result.nextAction}</p>
            </div>
          </div>

          <a
            href="/#contact"
            data-cursor="link"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            Wire this into your real dashboard
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </form>
  );
}

/** Tiny dependency-free SVG chart (bar or line), on-brand gold-on-ink. */
function Chart({ chart }: { chart: Insights["chart"] }) {
  const { labels, values, type, unit, title } = chart;
  if (!values.length) return null;
  const W = 480;
  const H = 180;
  const padX = 12;
  const padTop = 14;
  const padBottom = 26;
  const max = Math.max(...values, 1);
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const n = values.length;
  const step = innerW / n;
  const x = (i: number) => padX + step * i + step / 2;
  const y = (v: number) => padTop + innerH - (v / max) * innerH;

  return (
    <figure className="mt-3">
      <figcaption className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-dark">
        {title} {unit ? `· ${unit}` : ""}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${title} chart`}>
        <line x1={padX} y1={padTop + innerH} x2={W - padX} y2={padTop + innerH} stroke="rgba(243,239,230,0.12)" />
        {type === "line" ? (
          <>
            <polyline
              fill="none"
              stroke="#DAA442"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
            />
            {values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={2.5} fill="#DAA442" />
            ))}
          </>
        ) : (
          values.map((v, i) => {
            const bw = Math.min(step * 0.6, 40);
            return (
              <rect
                key={i}
                x={x(i) - bw / 2}
                y={y(v)}
                width={bw}
                height={padTop + innerH - y(v)}
                rx={3}
                fill="#DAA442"
                opacity={0.85}
              />
            );
          })
        )}
        {labels.map((l, i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className="fill-muted-dark" fontSize={10}>
            {l}
          </text>
        ))}
      </svg>
    </figure>
  );
}

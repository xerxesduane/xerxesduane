import { useState } from "react";
import { Search } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";

type Seo = {
  title: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
};

const EXAMPLE = "Boutique dental clinic in Jumeirah offering Invisalign and teeth whitening";

export default function DemoSeo() {
  const [topic, setTopic] = useState(EXAMPLE);
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState<Seo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    if (loading || topic.trim().length < 4) return;
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Seo>("/api/demo/seo", { topic, keywords }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={generate} className="flex flex-col gap-3">
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="What's the page about? (business, service, location…)"
        aria-label="Page topic"
        className="w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Target keywords (optional)"
          aria-label="Target keywords"
          className="min-w-0 flex-1 rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-2.5 text-sm text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
        />
        <button
          type="submit"
          disabled={loading || topic.trim().length < 4}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={15} />
          {loading ? "Generating…" : "Generate SEO metadata"}
        </button>
      </div>

      {error && <p className="text-xs text-gold">{error}</p>}

      {result && (
        <div className="flex flex-col gap-4 rounded-2xl border border-cream/10 bg-cream/5 p-4">
          {/* SERP preview */}
          <div className="rounded-xl bg-ink-deep/50 p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-dark">Google preview</p>
            <p className="text-[13px] text-[#8ab4f8]">{window.location.host}/{result.slug}</p>
            <p className="mt-0.5 text-[17px] leading-tight text-[#c8a2ff]">{result.title}</p>
            <p className="mt-1 text-[13px] leading-snug text-cream-dim">{result.metaDescription}</p>
          </div>

          <CharRow label="Title" value={result.title} max={60} />
          <CharRow label="Meta description" value={result.metaDescription} max={155} />

          {result.keywords?.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Keywords</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.keywords.map((k) => (
                  <span key={k} className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold/90">{k}</span>
                ))}
              </div>
            </div>
          )}

          {result.faqs?.length > 0 && (
            <div className="border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">FAQ schema (answer-engine ready)</p>
              <div className="mt-2 flex flex-col gap-2.5">
                {result.faqs.map((f, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-cream">{f.question}</p>
                    <p className="mt-0.5 text-sm text-cream-dim">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

function CharRow({ label, value, max }: { label: string; value: string; max: number }) {
  const len = value?.length ?? 0;
  const over = len > max;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">{label}</p>
        <span className={`font-mono text-[10px] ${over ? "text-red-400" : "text-[#3FB984]"}`}>{len}/{max}</span>
      </div>
      <p className="mt-0.5 text-sm text-cream-dim">{value}</p>
    </div>
  );
}

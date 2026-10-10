import { createFileRoute } from "../router";
import { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { useCSV, CSV, type ScriptRow } from "../lib/data";
import { whatsappLink, copyText } from "../lib/share";
import { Copy, MessageCircle, Search, Info, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/scripts")({ component: Scripts });

function Scripts() {
  const { data, loading } = useCSV<ScriptRow>(CSV.scripts, "scripts:v2");
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const s of data) {
      const c = (s.category || "").trim();
      if (c && !seen.has(c)) { seen.add(c); out.push(c); }
    }
    return out;
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((s) => {
      if (cat !== "All" && (s.category || "").toLowerCase() !== cat.toLowerCase()) return false;
      if (!q) return true;
      return s.title.toLowerCase().includes(q) || s.script_text.toLowerCase().includes(q);
    });
  }, [data, cat, query]);

  return (
    <AppShell title="Scripts">
      <div className="px-5 pb-2">
        <p className="text-sm text-muted-foreground">Conversation starters — copy, tweak, send</p>
      </div>

      <div className="px-5 mt-3 relative">
        <Search className="h-4 w-4 absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search scripts…"
          className="w-full h-11 rounded-2xl bg-white border border-border pl-10 pr-4 text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto px-5 py-3 no-scrollbar">
        {(["All", ...categories]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 h-9 px-4 rounded-full text-sm font-medium border transition ${
              cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-white text-foreground border-border"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && data.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-muted-foreground">Loading scripts…</div>
      )}

      <div className="px-5 space-y-3 mt-1">
        {filtered.map((s) => <ScriptCard key={s.id} s={s} />)}
        {!loading && filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No scripts match that search</p>
        )}
      </div>
    </AppShell>
  );
}

function ScriptCard({ s }: { s: ScriptRow }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = s.script_text.length > 200;
  const isHospitality = (s.category || "").trim().toLowerCase() === "hospitality-first invites";

  return (
    <article
      className="bg-white border border-border/60 rounded-2xl p-4 shadow-sm"
      style={isHospitality ? { borderLeft: "4px solid #D69E2E" } : undefined}
    >
      <h3 className="text-base font-semibold">{s.title}</h3>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {s.tone && <Chip>{s.tone}</Chip>}
        {s.channel && <Chip>{s.channel}</Chip>}
      </div>
      <p className={`mt-3 text-[15px] leading-relaxed whitespace-pre-wrap text-foreground/90 ${expanded || !isLong ? "" : "line-clamp-4"}`}>
        {s.script_text}
      </p>
      {isLong && (
        <button onClick={() => setExpanded((v) => !v)} className="mt-1 text-xs text-primary font-medium inline-flex items-center gap-1">
          {expanded ? "Show less" : "Show full"}
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      )}
      {s.cultural_notes && s.cultural_notes.trim() && (
        <p className="mt-3 flex gap-1.5 text-xs italic" style={{ color: "#718096" }}>
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>{s.cultural_notes}</span>
        </p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={async () => { if (await copyText(s.script_text)) toast("Copied — now paste in your message"); }}
          className="h-11 rounded-2xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2"
        >
          <Copy className="h-4 w-4" /> Copy <ChevronRight className="h-4 w-4" />
        </button>
        <a
          href={whatsappLink(s.script_text)}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 rounded-2xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] bg-secondary text-muted-foreground rounded-full px-2 py-0.5">{children}</span>;
}

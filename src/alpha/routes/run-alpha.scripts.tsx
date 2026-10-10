import { createFileRoute } from "../router";
import { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { useCSV, CSV, type EmceeRow } from "../lib/data";
import { useSettings, applyPlaceholders } from "../lib/settings";
import { copyText } from "../lib/share";
import { Search, Lightbulb, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/run-alpha/scripts")({ component: EmceeScripts });

type Grouped = { session_no: string; title: string; intro?: EmceeRow; farewell?: EmceeRow };

function EmceeScripts() {
  const { data, loading } = useCSV<EmceeRow>(CSV.emcee, "emcee:v1");
  const [query, setQuery] = useState("");

  const grouped = useMemo<Grouped[]>(() => {
    const map = new Map<string, Grouped>();
    for (const r of data) {
      const key = (r.session_no || r.id || "").trim();
      if (!key) continue;
      let g = map.get(key);
      if (!g) { g = { session_no: key, title: r.title || `Session ${key}` }; map.set(key, g); }
      const seg = (r.segment || "").trim().toLowerCase();
      if (seg === "intro") g.intro = r;
      else if (seg === "farewell") g.farewell = r;
      if (r.title) g.title = r.title;
    }
    return Array.from(map.values()).sort((a, b) => {
      const na = parseFloat(a.session_no); const nb = parseFloat(b.session_no);
      if (isFinite(na) && isFinite(nb)) return na - nb;
      return a.session_no.localeCompare(b.session_no);
    });
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return grouped;
    return grouped.filter((g) =>
      g.title.toLowerCase().includes(q) ||
      g.session_no.toLowerCase().includes(q)
    );
  }, [grouped, query]);

  return (
    <AppShell>
      <RunAlphaHeader title="Emcee Scripts" subtitle="What to say before each session." />

      <div className="px-5 mt-4 relative">
        <Search className="h-4 w-4 absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sessions…"
          className="w-full h-11 rounded-2xl bg-white border border-border pl-10 pr-4 text-sm"
        />
      </div>

      {loading && data.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-muted-foreground">Loading scripts…</div>
      )}

      <div className="px-5 mt-4 space-y-3">
        {filtered.map((g) => <SessionCard key={g.session_no} g={g} />)}
        {!loading && filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No sessions match that search</p>
        )}
      </div>
    </AppShell>
  );
}

function SessionCard({ g }: { g: Grouped }) {
  const s = useSettings();
  const [open, setOpen] = useState(false);
  return (
    <article className="bg-white border border-border/60 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left active:bg-accent"
      >
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">Session {g.session_no}</p>
          <p className="text-sm font-semibold mt-0.5 truncate">{g.title}</p>
        </div>
        {open ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4">
          {g.intro && <SegmentBlock label="Intro" row={g.intro} s={s} />}
          {g.farewell && <SegmentBlock label="Farewell" row={g.farewell} s={s} />}
          {!g.intro && !g.farewell && (
            <p className="text-xs text-muted-foreground">No script content yet for this session.</p>
          )}
        </div>
      )}
    </article>
  );
}

function SegmentBlock({ label, row, s }: { label: string; row: EmceeRow; s: ReturnType<typeof useSettings> }) {
  const resolved = applyPlaceholders(row.script_text || "", s);
  const note = applyPlaceholders(row.host_note || "", s);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <button
          onClick={async () => { if (await copyText(resolved)) toast(`${label} script copied`); }}
          className="h-8 px-3 rounded-full bg-secondary text-foreground text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <Copy className="h-3.5 w-3.5" /> Copy script
        </button>
      </div>
      <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-foreground/90">{resolved}</p>
      {note && note.trim() && (
        <div
          className="mt-3 rounded-xl p-3 flex gap-2 text-[13px] leading-relaxed"
          style={{ background: "rgba(214, 158, 46, 0.12)", borderLeft: "3px solid #D69E2E" }}
        >
          <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#D69E2E" }} />
          <div>
            <p className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "#8B6914" }}>Host tip</p>
            <p className="mt-1 text-foreground/90">{note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
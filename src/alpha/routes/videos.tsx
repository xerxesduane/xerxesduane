import { createFileRoute } from "../router";
import { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { useCSV, CSV, type VideoRow } from "../lib/data";
import { shareText, whatsappLink, copyText } from "../lib/share";
import { Share2, Copy, ExternalLink, ChevronDown, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/videos")({ component: Videos });

function getYouTubeId(url: string): { id: string | null; isShort: boolean } {
  if (!url) return { id: null, isShort: false };
  const shorts = url.match(/\/shorts\/([\w-]{6,})/);
  if (shorts) return { id: shorts[1], isShort: true };
  const m = url.match(/(?:youtu\.be\/|watch\?v=|embed\/)([\w-]{11})/);
  return { id: m ? m[1] : null, isShort: false };
}

const SECTIONS: { key: string; label: string }[] = [
  { key: "what is alpha?", label: "About Alpha" },
  { key: "alpha stories", label: "Stories" },
];

function Videos() {
  const { data, loading } = useCSV<VideoRow>(CSV.videos, "videos:v2");

  // Hide Training from this tab
  const visible = useMemo(
    () => data.filter((v) => v.section?.trim().toLowerCase() !== "training"),
    [data]
  );

  return (
    <AppShell title="Videos">
      <div className="px-5 pb-2">
        <p className="text-sm text-muted-foreground">Short films to share — pick the right one for each person</p>
      </div>

      {loading && data.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-muted-foreground">Loading videos…</div>
      )}

      {SECTIONS.map((section) => {
        const items = visible.filter((v) => v.section?.trim().toLowerCase() === section.key);
        if (items.length === 0) return null;
        return (
          <section key={section.key} className="mt-5">
            <h2 className="px-5 text-base font-semibold mb-3">{section.label}</h2>
            <div className="px-5 space-y-3">
              {items.map((v) => <VideoCard key={v.id} v={v} />)}
            </div>
          </section>
        );
      })}
    </AppShell>
  );
}

function VideoCard({ v }: { v: VideoRow }) {
  const [open, setOpen] = useState(false);
  const { id, isShort } = getYouTubeId(v.youtube_url);
  const thumb = id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
  const caption = v.suggested_caption || v.description || "";

  const doShare = async () => {
    const r = await shareText(`${caption}\n\n${v.youtube_url}`, v.youtube_url, v.title);
    if (r === "copied") toast("Copied — paste anywhere");
  };

  return (
    <article className="bg-white border border-border/60 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="text-left w-full">
        <div className={`bg-muted relative ${isShort ? "aspect-[9/16] max-h-96 mx-auto" : "aspect-video"}`}>
          {thumb && (
            <img
              src={thumb}
              alt={v.title}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          )}
          {isShort && (
            <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-black/70 text-white rounded px-2 py-0.5">Short</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold">{v.title}</h3>
          {v.audience && (
            <span className="inline-block mt-1.5 text-[11px] bg-secondary text-foreground/80 rounded-full px-2 py-0.5">
              {v.audience}
            </span>
          )}
          <p className={`mt-2 text-sm text-muted-foreground ${open ? "" : "line-clamp-2"}`}>{v.description}</p>
          <div className="mt-2 flex items-center text-xs text-primary font-medium">
            {open ? "Show less" : "Show more"} <ChevronDown className={`h-3.5 w-3.5 ml-1 transition ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 -mt-1 space-y-2">
          <button
            onClick={doShare}
            className="w-full h-11 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
          <a
            href={whatsappLink(`${caption}\n\n${v.youtube_url}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-2xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" /> Share to WhatsApp
          </a>
          <a
            href={v.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-2xl bg-secondary text-foreground font-medium flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" /> Watch on YouTube
          </a>
          <button
            onClick={async () => { if (await copyText(caption)) toast("Caption copied"); }}
            className="w-full h-10 text-sm text-muted-foreground font-medium flex items-center justify-center gap-1.5"
          >
            <Copy className="h-4 w-4" /> Copy caption
          </button>
        </div>
      )}
    </article>
  );
}
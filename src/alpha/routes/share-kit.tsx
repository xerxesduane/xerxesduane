import { createFileRoute, useNavigate } from "../router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { AppShell } from "../components/AppShell";
import { useCSV, CSV, type GraphicRow, optimizeCloudinary } from "../lib/data";
import { shareImage, whatsappLink, downloadImage, copyText } from "../lib/share";
import { Share2, Download, Copy, X, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const search = z.object({ open: z.string().optional() });

export const Route = createFileRoute("/share-kit")({
  validateSearch: (s) => search.parse(s),
  component: ShareKit,
});

type Filter = "all" | "stories" | "posts";

function ShareKit() {
  const { data, loading } = useCSV<GraphicRow>(CSV.graphics, "graphics:v2");
  const { open } = Route.useSearch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(open ?? null);

  useEffect(() => { if (open) setOpenId(open); }, [open]);

  const filtered = useMemo(() => {
    return data.filter((g) => {
      if (filter === "stories") return /story/i.test(g.platform);
      if (filter === "posts") return /post/i.test(g.platform);
      return true;
    });
  }, [data, filter]);

  const opened = data.find((g) => g.id === openId) ?? null;

  const closeModal = () => {
    setOpenId(null);
    if (open) navigate({ to: "/share-kit", search: {} });
  };

  return (
    <AppShell title="Share Kit">
      <div className="px-5 pb-2">
        <p className="text-sm text-muted-foreground">Graphics ready to share — tap to preview</p>
      </div>

      <div className="flex gap-2 overflow-x-auto px-5 py-3 no-scrollbar">
        {([
          ["all", "All"], ["stories", "Stories"], ["posts", "Posts"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`shrink-0 h-9 px-4 rounded-full text-sm font-medium border transition ${
              filter === id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-foreground border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && data.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-muted-foreground">Loading graphics…</div>
      )}

      <div className="grid grid-cols-2 gap-3 px-5">
        {filtered.map((g) => {
          const isStory = /story/i.test(g.platform);
          return (
            <button
              key={g.id}
              onClick={() => setOpenId(g.id)}
              className="text-left"
            >
              <div className={`rounded-2xl overflow-hidden bg-muted shadow-sm ${isStory ? "aspect-[9/16]" : "aspect-square"}`}>
                <img
                  src={optimizeCloudinary(g.cloudinary_url, 600)}
                  alt={g.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-xs font-medium text-foreground line-clamp-2">{g.title}</p>
            </button>
          );
        })}
      </div>

      {opened && <GraphicModal g={opened} onClose={closeModal} />}
    </AppShell>
  );
}

function GraphicModal({ g, onClose }: { g: GraphicRow; onClose: () => void }) {
  const tags = g.hashtags
    ? g.hashtags.split(/[\s,]+/).filter((t) => t.trim().length > 0).map((t) => (t.startsWith("#") ? t : `#${t}`))
    : [];
  const fullCaption = `${g.caption}${tags.length ? "\n\n" + tags.join(" ") : ""}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4">
          <img
            src={optimizeCloudinary(g.cloudinary_url, 1200)}
            alt={g.title}
            className="w-full max-h-[55vh] object-contain rounded-xl"
          />
        </div>
        <div className="px-5 pt-4 pb-2 text-white">
          <h3 className="text-base font-semibold">{g.title}</h3>
          <p className="mt-2 text-sm whitespace-pre-wrap text-white/85">{g.caption}</p>
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="text-xs bg-white/10 text-white/90 rounded-full px-2.5 py-1">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="bg-white px-5 pt-4 pb-6 space-y-2 rounded-t-3xl"
        style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 1.5rem)` }}
      >
        <button
          onClick={async () => {
            const r = await shareImage(g.cloudinary_url, fullCaption);
            if (r === "copied") toast("Caption copied — image opened in new tab");
          }}
          className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
        >
          <Share2 className="h-5 w-5" /> Share
        </button>
        <a
          href={whatsappLink(`${fullCaption}\n\n${g.cloudinary_url}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-2xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-5 w-5" /> Share to WhatsApp
        </a>
        <button
          onClick={() => downloadImage(g.cloudinary_url, `${g.title.replace(/\s+/g, "-").toLowerCase()}.jpg`)}
          className="w-full h-12 rounded-2xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" /> Download image
        </button>
        <button
          onClick={async () => { if (await copyText(fullCaption)) toast("Caption copied"); }}
          className="w-full h-10 text-sm text-muted-foreground font-medium flex items-center justify-center gap-1.5"
        >
          <Copy className="h-4 w-4" /> Copy caption
        </button>
      </div>
    </div>
  );
}

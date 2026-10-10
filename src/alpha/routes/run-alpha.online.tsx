import { createFileRoute } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { FileText, FolderOpen, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/run-alpha/online")({ component: OnlinePage });

const TRAININGS = [
  { title: "Introduction to Alpha Online", url: "https://drive.google.com/file/d/1BC-sZT8STsqOd7ge-nQHvRQYpCV-MaSQ/view?usp=sharing" },
  { title: "How to Host a Small Group", url: "https://drive.google.com/file/d/1uGnixFS1W4YGoNJY55vR_NtPEmKljzCw/view?usp=sharing" },
  { title: "Prayer Ministry", url: "https://drive.google.com/file/d/1SMg00H7DExVglTIi4hBM1DsWOCujec7U/view?usp=sharing" },
];
const FOLDER = "https://drive.google.com/drive/folders/1vAO1mWQna6JyF1D-EwaVj1i2XwWRy0a8?usp=drive_link";

function OnlinePage() {
  return (
    <AppShell>
      <RunAlphaHeader title="Alpha Online" subtitle="Run Alpha over a video call." backTo="/run-alpha/choose" backLabel="Choose How to Run It" />

      <section className="px-5 mt-5">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          Run Alpha over a video call. Start with the essentials, then dig into the guides.
        </p>
      </section>

      <section className="px-5 mt-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-2">Alpha Online Essentials</p>
        <div className="rounded-2xl overflow-hidden bg-black shadow-sm">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/00J1lNfRPzY?rel=0&modestbranding=1&playsinline=1"
              title="Alpha Online Essentials"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      </section>

      <section className="px-5 mt-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2.5">Training</p>
        <div className="space-y-2.5">
          {TRAININGS.map((t) => (
            <a key={t.url} href={t.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white border border-border/60 p-4 shadow-sm active:bg-accent min-h-12">
              <div className="h-10 w-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold flex-1 min-w-0 flex items-center gap-1.5">
                {t.title} <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6">
        <a href={FOLDER} target="_blank" rel="noopener noreferrer"
          className="block rounded-2xl bg-primary text-primary-foreground p-4 shadow-sm active:scale-[0.99] transition min-h-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <FolderOpen className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold flex-1 flex items-center gap-1.5">
              Open Alpha Online Resources <ExternalLink className="h-3.5 w-3.5 opacity-90" />
            </p>
          </div>
        </a>
      </section>
      <div className="h-6" />
    </AppShell>
  );
}
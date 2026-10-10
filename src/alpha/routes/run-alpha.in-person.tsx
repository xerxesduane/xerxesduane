import { createFileRoute } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { FileText, FolderOpen, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/run-alpha/in-person")({ component: InPersonPage });

const TRAININGS = [
  { title: "Alpha Film Series Training 1", url: "https://drive.google.com/file/d/16t7IlGd7Jj7hPYWs2kLxBj-mhpVCpJJe/view?usp=sharing" },
  { title: "Alpha Film Series Training 2 (for Holy Spirit Weekend)", url: "https://drive.google.com/file/d/1QOd4ZR4i5PKi2gMa3dzPGVAxJFWAVlik/view?usp=sharing" },
];
const FOLDER = "https://drive.google.com/drive/folders/1t0fbL1MU6-yMtZDxszXi0ssnKwt0kWQ7?usp=sharing";

function InPersonPage() {
  return (
    <AppShell>
      <RunAlphaHeader title="Alpha Film Series (In Person)" subtitle="Train and gather your resources." backTo="/run-alpha/choose" backLabel="Choose How to Run It" />

      <section className="px-5 mt-5">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          Run Alpha in person. Here is your training and your resource folder.
        </p>
      </section>

      <section className="px-5 mt-5">
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
              Open In-Person Resources <ExternalLink className="h-3.5 w-3.5 opacity-90" />
            </p>
          </div>
        </a>
      </section>
      <div className="h-6" />
    </AppShell>
  );
}
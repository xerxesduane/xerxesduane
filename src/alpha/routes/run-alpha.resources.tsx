import { createFileRoute } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { FolderOpen, Film, BookOpen, ExternalLink } from "lucide-react";
import { ContactBlock } from "../components/ContactBlock";

export const Route = createFileRoute("/run-alpha/resources")({ component: ResourcesPage });

const RESOURCE_FOLDER = "https://drive.google.com/drive/folders/1Fxz1fUbksfb8bRi1C-wxElrBMpTxzMQi?usp=sharing";
const ALPHA_DASHBOARD = "https://www.alpha.org/run";
const PLAYBOOK_PDF = "https://drive.google.com/file/d/1rSOPrIEFZ9TQHbcDxRWDEj4CbPEmgn-_/view?usp=sharing";

function ResourcesPage() {
  return (
    <AppShell>
      <RunAlphaHeader title="Get the Resources" subtitle="Films, guides, and everything you need." />

      <section className="px-5 mt-5">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          Here is where to find the films and everything you need to run Alpha well.
        </p>
      </section>

      <section className="px-5 mt-5 space-y-3">
        <ResourceCard
          href={RESOURCE_FOLDER}
          icon={<FolderOpen className="h-5 w-5" />}
          title="Open the Resource Folder"
          caption="Team guides, films, and resources, all in one place."
        />
        <ResourceCard
          href={ALPHA_DASHBOARD}
          icon={<Film className="h-5 w-5" />}
          title="Get the Alpha Film Series (Alpha Dashboard)"
          caption="Create a free account to stream or download the official Film Series."
        />
        <ResourceCard
          href={PLAYBOOK_PDF}
          icon={<BookOpen className="h-5 w-5" />}
          title="Open the Full Coaching Playbook"
          caption="The complete guide in one document."
        />
      </section>

      <section className="px-5 mt-5">
        <p className="text-xs leading-relaxed text-muted-foreground italic">
          Please stream the official Film Series from the Dashboard or our resource folder. Do not re-upload
          the full episodes to public social media.
        </p>
      </section>
      <section className="px-5 mt-5">
        <div className="rounded-2xl bg-white border border-border/60 p-4">
          <ContactBlock />
        </div>
      </section>
      <div className="h-6" />
    </AppShell>
  );
}

function ResourceCard({ href, icon, title, caption }: { href: string; icon: React.ReactNode; title: string; caption: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="block rounded-2xl bg-white border border-border/60 p-4 shadow-sm active:bg-accent min-h-12">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold flex items-center gap-1.5">
            {title} <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{caption}</p>
        </div>
      </div>
    </a>
  );
}
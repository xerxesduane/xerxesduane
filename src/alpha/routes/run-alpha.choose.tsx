import { createFileRoute, Link } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { Users, Video, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/run-alpha/choose")({ component: ChoosePage });

function ChoosePage() {
  return (
    <AppShell>
      <RunAlphaHeader title="Choose How to Run It" subtitle="Two ways. Same content. Pick what fits your group." />

      <section className="px-5 mt-5">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          There are two ways to run Alpha. Pick the one that fits your group. Both cover the same content.
        </p>
      </section>

      <section className="px-5 mt-5 space-y-3">
        <TrackCard
          to="/run-alpha/in-person"
          icon={<Users className="h-6 w-6" />}
          title="Alpha Film Series (In Person)"
          desc="At a venue, home, or workplace. Watch the film together and talk around the table."
        />
        <TrackCard
          to="/run-alpha/online"
          icon={<Video className="h-6 w-6" />}
          title="Alpha Online"
          desc="Over a video call. Food in your own homes, watch together, then talk in breakout groups."
        />
      </section>
      <div className="h-6" />
    </AppShell>
  );
}

function TrackCard({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl bg-white border border-border/60 p-5 shadow-sm active:bg-accent min-h-12">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-primary">{title}</p>
          <p className="mt-1 text-[13px] text-foreground/85 leading-relaxed">{desc}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
      </div>
    </Link>
  );
}
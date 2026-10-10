import { createFileRoute, Link } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import {
  FolderOpen, ClipboardCheck, CalendarDays, Sparkles,
  Clock, Compass, MessageSquareQuote, ChevronRight, ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/run-alpha/")({ component: RunAlphaHub });

const INTEREST_FORM = "https://fellowshipdubai.churchcenter.com/people/forms/1236453";

function RunAlphaHub() {
  return (
    <AppShell>
      <RunAlphaHeader
        title="Run Alpha"
        subtitle="Everything you need to host the Alpha Film Series with your friends."
        backTo="/"
        backLabel="Home"
      />

      {/* Nicky Gumbel vision video */}
      <section className="px-5 mt-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-2">Start with the why</p>
        <div className="rounded-2xl overflow-hidden bg-black shadow-sm">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/q5urLK75Jrk?rel=0&modestbranding=1&playsinline=1"
              title="A message from Nicky Gumbel"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">A message from Nicky Gumbel, the pioneer of Alpha.</p>
      </section>

      {/* Menu */}
      <section className="px-5 mt-6 space-y-5">
        <MenuGroup label="Start Here">
          <HubLink to="/run-alpha/resources" icon={<FolderOpen className="h-5 w-5" />}
            title="Get the Resources" desc="Films, guides, and everything you need." />
          <HubLink to="/run-alpha/choose" icon={<Compass className="h-5 w-5" />}
            title="Choose How to Run It" desc="In person or online. Pick your path." />
        </MenuGroup>

        <MenuGroup label="Get Ready">
          <HubLink to="/run-alpha/checklist" icon={<ClipboardCheck className="h-5 w-5" />}
            title="The Launch Checklist" desc="Seven things to do before you start." />
          <HubLink to="/run-alpha/countdown" icon={<CalendarDays className="h-5 w-5" />}
            title="The 6 Week Countdown" desc="A week by week plan to launch night." />
        </MenuGroup>

        <MenuGroup label="Run Each Session">
          <HubLink to="/run-alpha/evening" icon={<Clock className="h-5 w-5" />}
            title="Anatomy of an Evening" desc="What happens, minute by minute." />
          <HubLink to="/run-alpha/scripts" icon={<MessageSquareQuote className="h-5 w-5" />}
            title="Emcee Scripts" desc="What to say before each session." />
          <HubLink to="/run-alpha/host-tips" icon={<Sparkles className="h-5 w-5" />}
            title="Host Quick Reference" desc="The 3 Ls, the 6 second rule, and the hard moments." />
        </MenuGroup>
      </section>

      {/* Form CTA */}
      <section className="px-5 mt-7">
        <div className="rounded-3xl bg-primary text-primary-foreground p-5 shadow-lg">
          <h2 className="text-xl font-extrabold leading-tight">Ready to run Alpha?</h2>
          <p className="mt-2 text-[14px] leading-relaxed opacity-95">
            Let us know you're interested and someone from our team will reach out personally to walk with
            you and pray with you.
          </p>
          <a
            href={INTEREST_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full h-12 rounded-2xl bg-white text-primary font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition"
          >
            I want to run Alpha <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <div className="h-8" />
    </AppShell>
  );
}

function MenuGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2.5">{label}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function HubLink({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-2xl bg-white border border-border/60 p-4 shadow-sm active:bg-accent min-h-12">
      <div className="h-10 w-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
    </Link>
  );
}
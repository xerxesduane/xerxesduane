import { createFileRoute, Link } from "../router";
import { AppShell } from "../components/AppShell";
import { Images, MessageSquare, Film, GraduationCap, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources | Alpha at Fellowship" },
      { name: "description", content: "Invitation images, what to say, videos and team training for Alpha at Fellowship Dubai." },
      { property: "og:title", content: "Resources | Alpha at Fellowship" },
      { property: "og:description", content: "Invitation images, what to say, videos and team training for Alpha at Fellowship Dubai." },
    ],
  }),
  component: Resources,
});

const items = [
  { to: "/share-kit", icon: Images, title: "Invitation images", sub: "Ready-to-share graphics" },
  { to: "/scripts", icon: MessageSquare, title: "What to say", sub: "Simple ways to start the conversation" },
  { to: "/videos", icon: Film, title: "Videos", sub: "Short clips to send a friend" },
  { to: "/training", icon: GraduationCap, title: "Team training", sub: "Equipping for hosts and helpers" },
] as const;

function Resources() {
  return (
    <AppShell title="Resources">
      <nav className="px-5 mt-2 space-y-2" aria-label="Resources">
        {items.map(({ to, icon: Icon, title, sub }) => (
          <Link key={to} to={to} className="flex items-center gap-3 rounded-2xl bg-white border border-border/60 px-4 py-3.5 shadow-sm min-h-14 active:bg-accent">
            <span className="h-9 w-9 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0"><Icon className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block text-xs text-muted-foreground mt-0.5">{sub}</span>
            </span>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </Link>
        ))}
      </nav>
    </AppShell>
  );
}

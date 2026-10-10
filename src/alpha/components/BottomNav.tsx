import { Link, useLocation } from "../router";
import { Send, Users, BookOpen } from "lucide-react";

const RES = ["/resources", "/share-kit", "/videos", "/scripts", "/training", "/run-alpha"];
const tabs = [
  { to: "/", label: "Invite", icon: Send, match: (p: string) => p === "/" },
  { to: "/invites", label: "My People", icon: Users, match: (p: string) => p.startsWith("/invites") },
  { to: "/resources", label: "Resources", icon: BookOpen, match: (p: string) => RES.some((r) => p.startsWith(r)) },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto max-w-[500px] grid grid-cols-3">
        {tabs.map((t) => {
          const active = t.match(pathname);
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`flex flex-col items-center justify-center gap-1 h-16 text-[11px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-6 w-6 ${active ? "stroke-[2.25]" : "stroke-2"}`} />
                <span>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

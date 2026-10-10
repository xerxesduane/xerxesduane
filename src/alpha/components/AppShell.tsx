import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="mx-auto max-w-[500px] pb-24"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {title ? (
          <header className="px-5 pt-6 pb-2">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          </header>
        ) : null}
        {children}
      </div>
      <BottomNav />
    </div>
  );
}

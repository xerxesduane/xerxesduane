import { useEffect, useState } from "react";

export type InviteStatus = "praying" | "invited" | "coming";
export type Invite = { id: string; name: string; status: InviteStatus; note?: string; createdAt: number };

const KEY = "alpha:invites";

export const STATUS_LABEL: Record<InviteStatus, string> = {
  praying: "🙏 Praying",
  invited: "📨 Invited",
  coming: "✅ Coming",
};

export const STATUS_ORDER: InviteStatus[] = ["praying", "invited", "coming"];

export const STATUS_BORDER: Record<InviteStatus, string> = {
  praying: "border-l-slate-400",
  invited: "border-l-amber-500",
  coming: "border-l-teal-600",
};

/** Older versions stored "confirmed" and "attended"; both now mean "coming". */
function normalizeStatus(s: string): InviteStatus {
  if (s === "invited") return "invited";
  if (s === "coming" || s === "confirmed" || s === "attended") return "coming";
  return "praying";
}

function read(): Invite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.map((i: Invite) => ({ ...i, status: normalizeStatus(String(i.status)) }));
  } catch { return []; }
}
function write(list: Invite[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("alpha:invites-changed"));
}

export function useInvites() {
  const [list, setList] = useState<Invite[]>([]);
  useEffect(() => {
    setList(read());
    const sync = () => setList(read());
    window.addEventListener("alpha:invites-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("alpha:invites-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return {
    list,
    add: (name: string) => {
      const next = [...read(), { id: crypto.randomUUID(), name, status: "praying" as InviteStatus, createdAt: Date.now() }];
      write(next);
    },
    update: (id: string, patch: Partial<Invite>) => {
      write(read().map((i) => (i.id === id ? { ...i, ...patch } : i)));
    },
    remove: (id: string) => {
      write(read().filter((i) => i.id !== id));
    },
    cycle: (id: string) => {
      write(read().map((i) => {
        if (i.id !== id) return i;
        const idx = STATUS_ORDER.indexOf(i.status);
        return { ...i, status: STATUS_ORDER[(idx + 1) % STATUS_ORDER.length] };
      }));
    },
  };
}

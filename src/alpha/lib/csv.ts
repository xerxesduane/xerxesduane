// Tiny RFC-4180-ish CSV parser (handles quoted fields, escaped quotes, newlines in quotes).
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ""; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
    field += c; i++;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim().length > 0));
}

export function csvToObjects<T = Record<string, string>>(text: string): T[] {
  const rows = parseCSV(text);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const o: Record<string, string> = {};
    headers.forEach((h, i) => { o[h] = (r[i] ?? "").trim(); });
    return o as T;
  });
}

const CACHE_PREFIX = "alpha:csv:";

export async function fetchCSVCached<T = Record<string, string>>(url: string, key: string): Promise<T[]> {
  // Hydrate from localStorage immediately if present (caller can use this for instant render)
  // but always refresh in background.
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    const text = await res.text();
    const data = csvToObjects<T>(text);
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ at: Date.now(), data }));
    }
    return data;
  } catch (err) {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      if (raw) {
        try { return (JSON.parse(raw).data as T[]); } catch { /* ignore */ }
      }
    }
    throw err;
  }
}

export function getCachedCSV<T = Record<string, string>>(key: string): T[] | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CACHE_PREFIX + key);
  if (!raw) return null;
  try { return JSON.parse(raw).data as T[]; } catch { return null; }
}

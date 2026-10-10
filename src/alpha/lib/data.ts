import { fetchCSVCached, getCachedCSV } from "./csv";
import { useEffect, useState } from "react";

const BASE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbg_3MOKKEOZW1Ggjl0L70hiwwtwRcNYFWY07pq1rgFjiORMmholkYfUp6BQHU2Z8F3qBj-4K0bclw";

export const CSV = {
  scripts: `${BASE}/pub?gid=1610637767&single=true&output=csv`,
  graphics: `${BASE}/pub?gid=1961163947&single=true&output=csv`,
  videos: `${BASE}/pub?gid=2084601019&single=true&output=csv`,
  prayers: `${BASE}/pub?gid=2076577201&single=true&output=csv`,
  emcee: `${BASE}/pub?gid=809618547&single=true&output=csv`,
};

export type ScriptRow = { id: string; category: string; title: string; script_text: string; tone: string; channel: string; cultural_notes?: string };
export type GraphicRow = { id: string; title: string; platform: string; cloudinary_url: string; caption: string; hashtags: string };
export type VideoRow = { id: string; title: string; youtube_url: string; audience: string; section: string; description: string; suggested_caption: string };
export type PrayerRow = { id: string; day: string; prompt: string };
export type EmceeRow = { id: string; session_no: string; title: string; segment: string; script_text: string; host_note?: string };

export function useCSV<T = Record<string, string>>(url: string, key: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    // Hydrate from cache on client to avoid SSR/CSR mismatch
    const cached = getCachedCSV<T>(key);
    if (cached && alive) { setData(cached); setLoading(false); }
    fetchCSVCached<T>(url, key)
      .then((d) => { if (alive) { setData(d); setError(null); } })
      .catch((e) => { if (alive) setError(String(e)); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [url, key]);
  return { data: data ?? [], loading, error };
}

// Cloudinary optimization helper
export function optimizeCloudinary(url: string, width = 800): string {
  if (!url || !url.includes("/upload/")) return url;
  // Avoid double-applying
  if (/\/upload\/[^/]*f_auto/.test(url)) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

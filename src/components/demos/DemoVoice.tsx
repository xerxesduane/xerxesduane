import { useEffect, useRef, useState } from "react";
import { Mic, Square, Send, Volume2, ShieldCheck } from "lucide-react";
import { jsonDemo, streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Lang = "en" | "ar";

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error ?? new Error("Could not read the recording."));
    r.readAsDataURL(blob);
  });
}

export default function DemoVoice() {
  const [lang, setLang] = useState<Lang>("en");
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [typed, setTyped] = useState("");
  const [error, setError] = useState("");

  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const canRecord =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof window.MediaRecorder !== "undefined";

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      try {
        recRef.current?.stream?.getTracks().forEach((t) => t.stop());
      } catch {
        /* ignore */
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "ar" ? "ar-SA" : "en-US";
      window.speechSynthesis.speak(u);
    } catch {
      /* TTS unavailable — the reply is still shown as text */
    }
  }

  /** Send a user turn (typed or transcribed) to the receptionist and speak the reply. */
  async function converse(userText: string) {
    setReply("");
    let full = "";
    await streamDemo(
      "/api/demo/chat",
      { demo: "receptionist", messages: [{ role: "user", content: userText }] },
      (f) => {
        full = f;
        setReply(f);
      },
    );
    speak(full);
  }

  async function handleClip() {
    const blob = new Blob(chunksRef.current, { type: recRef.current?.mimeType || "audio/webm" });
    if (!blob.size) {
      setBusy(false);
      return;
    }
    try {
      const dataUrl = await blobToDataUrl(blob);
      const { text } = await jsonDemo<{ text: string }>("/api/demo/transcribe", {
        audio: dataUrl,
        mime: blob.type,
        language: lang,
      });
      setTranscript(text);
      await converse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — try the text box below.");
    } finally {
      setBusy(false);
    }
  }

  async function startRecording() {
    if (recording || busy) return;
    setError("");
    setTranscript("");
    setReply("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setBusy(true);
        void handleClip();
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      track("demo_run", { demo: "voice" });
      timerRef.current = window.setTimeout(() => stopRecording(), 15000);
    } catch {
      setError("I couldn't access the mic — allow microphone access, or just type your message below.");
    }
  }

  function stopRecording() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (recRef.current && recRef.current.state !== "inactive") recRef.current.stop();
    setRecording(false);
  }

  async function submitTyped(e: React.FormEvent) {
    e.preventDefault();
    if (busy || recording || typed.trim().length < 2) return;
    track("demo_run", { demo: "voice", mode: "text" });
    setError("");
    setTranscript(typed.trim());
    setBusy(true);
    try {
      await converse(typed.trim());
      setTyped("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
          {(["en", "ar"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                lang === l ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
              }`}
            >
              {l === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
        {reply && (
          <button
            type="button"
            onClick={() => speak(reply)}
            className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
          >
            <Volume2 size={13} /> Replay
          </button>
        )}
      </div>

      {canRecord ? (
        <button
          type="button"
          onClick={recording ? stopRecording : startRecording}
          disabled={busy}
          aria-pressed={recording}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
            recording
              ? "bg-gold/15 text-gold ring-1 ring-gold/40"
              : "bg-gold text-ink-deep hover:bg-gold-soft"
          }`}
        >
          {recording ? (
            <>
              <Square size={15} className="motion-safe:animate-pulse" /> Stop &amp; send
            </>
          ) : (
            <>
              <Mic size={16} /> {busy ? "Thinking…" : "Hold a conversation — tap to speak"}
            </>
          )}
        </button>
      ) : (
        <p className="text-xs text-muted-dark">Your browser doesn't support recording — type your message below instead.</p>
      )}

      <p className="flex items-start gap-1.5 font-mono text-[10.5px] leading-snug text-muted-dark">
        <ShieldCheck size={12} className="mt-px shrink-0 text-gold/60" />
        Mic audio is sent once to transcribe this clip, then discarded — nothing is stored. Speak in English or Arabic.
      </p>

      {/* Always-available text fallback */}
      <form onSubmit={submitTyped} className="flex items-end gap-2">
        <input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="…or type instead — English or بالعربية"
          aria-label="Type a message to the receptionist"
          className="w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
        />
        <button
          type="submit"
          disabled={busy || recording || typed.trim().length < 2}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send"
        >
          <Send size={17} />
        </button>
      </form>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {(transcript || reply || busy) && (
        <div role="status" aria-live="polite" aria-busy={busy} className="flex flex-col gap-2">
          {transcript && (
            <div className="self-end rounded-2xl rounded-br-sm bg-gold/10 px-4 py-2.5 text-sm text-cream-dim">
              {transcript}
            </div>
          )}
          {(reply || busy) && (
            <div className="self-start rounded-2xl rounded-bl-sm border border-cream/10 bg-cream/5 px-4 py-2.5 text-sm text-cream-dim">
              {reply || "…"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

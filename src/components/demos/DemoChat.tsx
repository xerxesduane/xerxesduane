import { useEffect, useRef, useState } from "react";
import { Send, RotateCcw, Sparkles } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Msg = { role: "user" | "assistant"; content: string };

interface DemoChatProps {
  demo: "assistant" | "lead" | "receptionist";
  greeting: string;
  placeholder: string;
  suggestions: string[];
}

export default function DemoChat({ demo, greeting, placeholder, suggestions }: DemoChatProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;
    if (messages.length === 0) track("demo_run", { demo });
    setError("");
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo(
        "/api/demo/chat",
        { demo, messages: next },
        (full) =>
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: full };
            return copy;
          }),
        ctrl.signal,
      );
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setMessages(next);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setStreaming(false);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setError("");
    setStreaming(false);
  }

  const started = messages.length > 0;

  return (
    <div className="flex flex-col">
      <div
        ref={scrollRef}
        className="flex max-h-[22rem] min-h-[12rem] flex-col gap-3 overflow-y-auto rounded-2xl border border-cream/10 bg-ink-deep/40 p-4"
      >
        <Bubble role="assistant">{greeting}</Bubble>
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.content || (streaming && i === messages.length - 1 ? <Dots /> : "")}
          </Bubble>
        ))}
      </div>

      {!started && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 px-3 py-1.5 text-xs text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
            >
              <Sparkles size={12} className="text-gold/70" />
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex items-end gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Your message"
          className="w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
        />
        {started && (
          <button
            type="button"
            onClick={reset}
            aria-label="Reset conversation"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cream/10 text-cream-dim transition-colors hover:border-gold/40 hover:text-gold"
          >
            <RotateCcw size={17} />
          </button>
        )}
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          aria-label="Send message"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={17} strokeWidth={2.3} />
        </button>
      </form>

      {error && <p className="mt-2 text-xs text-gold">{error}</p>}
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser ? "bg-gold/15 text-cream" : "bg-cream/5 text-cream-dim"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

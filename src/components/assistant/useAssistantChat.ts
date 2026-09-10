import { useCallback, useRef, useState } from "react";
import { streamDemo } from "../../lib/demoClient";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/**
 * The assistant's conversation state.
 *
 * Kept out of the panel so the UI file is layout and the transport is here.
 * Three things it takes care of that a naive `fetch` in a component doesn't:
 *
 * - The reply is appended as an empty assistant turn *before* the stream
 *   starts, then filled in place. That is what makes tokens appear inside a
 *   bubble that is already on screen instead of one that pops in late.
 * - A send while a reply is streaming aborts the old one first, so an
 *   impatient visitor gets the answer to their newest question, not two
 *   interleaved streams.
 * - A failed turn removes its own empty bubble and surfaces the endpoint's
 *   message. `/api/assistant` returns real copy for its 429 and 503 cases, so
 *   "you're going too fast" and "the assistant is offline" reach the visitor
 *   rather than a generic failure.
 *
 * Nothing is persisted: no localStorage, no server log. The widget tells
 * visitors chats aren't stored, so it must not quietly keep them.
 */
export function useAssistantChat(locale: "en" | "ar", fallbackError: string) {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question) return;

      abort.current?.abort();
      const controller = new AbortController();
      abort.current = controller;

      setError(null);
      setPending(true);

      // Snapshot the history the endpoint should see, then show both the
      // question and the empty reply it is about to fill.
      let history: ChatTurn[] = [];
      setTurns((prev) => {
        history = [...prev, { role: "user" as const, content: question }];
        return [...history, { role: "assistant", content: "" }];
      });

      try {
        await streamDemo(
          "/api/assistant",
          { messages: history, locale },
          (full) => {
            setTurns((prev) => {
              const next = [...prev];
              const i = next.length - 1;
              if (i >= 0 && next[i].role === "assistant") next[i] = { role: "assistant", content: full };
              return next;
            });
          },
          controller.signal,
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : fallbackError);
        // Drop the bubble that never got filled.
        setTurns((prev) =>
          prev.length && prev[prev.length - 1].role === "assistant" && !prev[prev.length - 1].content
            ? prev.slice(0, -1)
            : prev,
        );
      } finally {
        if (!controller.signal.aborted) setPending(false);
      }
    },
    [locale, fallbackError],
  );

  const reset = useCallback(() => {
    abort.current?.abort();
    abort.current = null;
    setTurns([]);
    setError(null);
    setPending(false);
  }, []);

  /** The visitor's most recent question — carried into the WhatsApp handoff. */
  const lastQuestion = [...turns].reverse().find((t) => t.role === "user")?.content;

  return { turns, pending, error, send, reset, lastQuestion };
}

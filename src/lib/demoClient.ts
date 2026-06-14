// Tiny client for the /api/demo/* endpoints. No AI-SDK React hooks — these read
// the raw token stream directly so the demo UI can match the site's design.

/** Pull a friendly error message out of a non-OK response. */
async function readError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (data && typeof data.error === "string") return data.error;
  } catch {
    /* not JSON */
  }
  return `Something went wrong (${res.status}).`;
}

/**
 * POST `body` to a streaming endpoint and invoke `onToken` with each text delta
 * as it arrives. Resolves with the full text. Pass an AbortSignal to cancel.
 */
export async function streamDemo(
  path: string,
  body: unknown,
  onToken: (full: string, delta: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(await readError(res));

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const delta = decoder.decode(value, { stream: true });
    if (delta) {
      full += delta;
      onToken(full, delta);
    }
  }
  // Flush any bytes left in the decoder — without this, a stream that ends
  // mid-way through a multi-byte UTF-8 sequence (common with Arabic + emoji in
  // the translate/receptionist/WhatsApp demos) drops its final glyph.
  const tail = decoder.decode();
  if (tail) {
    full += tail;
    onToken(full, tail);
  }
  // The endpoint commits a 200 before the model runs, so a mid-stream provider
  // failure (Groq 429/500) closes the stream with no body and no error. Surface
  // it instead of silently showing nothing — the page's whole pitch is "real AI".
  if (!full) throw new Error("The AI didn't respond — please try again in a moment.");
  return full;
}

/** POST `body` to a JSON endpoint and return the parsed result. */
export async function jsonDemo<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as T;
}

/**
 * POST `body` to an NDJSON streaming endpoint and invoke `onEvent` for each
 * complete JSON line as it arrives. Used by the visible agentic-workflow demo,
 * where each line is one step (enrich → qualify → draft → book → sync) so the
 * agent's reasoning appears on screen as it happens. Pass an AbortSignal to cancel.
 */
export async function streamNdjson<T>(
  path: string,
  body: unknown,
  onEvent: (event: T) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(await readError(res));

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line) {
        try {
          onEvent(JSON.parse(line) as T);
        } catch {
          /* ignore a partial/non-JSON line */
        }
      }
    }
  }
  const tail = buf.trim();
  if (tail) {
    try {
      onEvent(JSON.parse(tail) as T);
    } catch {
      /* ignore */
    }
  }
}

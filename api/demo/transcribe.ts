// Speech-to-text for the voice-receptionist demo. Audio is captured in the
// browser (MediaRecorder), sent here as base64, and transcribed by Groq's
// hosted Whisper. The spoken *reply* is produced by the existing
// /api/demo/chat receptionist persona, so this endpoint only does STT —
// nothing is stored; the bytes live in memory for the length of the request.
import {
  preflight,
  errorResponse,
  json,
  clamp,
  base64ToBytes,
  groqTranscribe,
  logAiError,
} from "../_shared";

export const config = { runtime: "edge" };

// ~1.8MB of base64 ≈ ~1.3MB of audio — plenty for a ~15s clip, and a hard cap
// against payload abuse on a public endpoint.
const MAX_B64 = 1_800_000;

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { audio?: string; mime?: string; language?: string };
  try {
    body = (await req.json()) as { audio?: string; mime?: string; language?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const audio = typeof body.audio === "string" ? body.audio : "";
  if (!audio) return errorResponse("Record a short message first.");
  if (audio.length > MAX_B64) {
    return errorResponse("That clip is a little long for the demo — keep it under ~15 seconds.");
  }
  const mime = clamp(body.mime, 60) || "audio/webm";
  const language = body.language === "ar" ? "ar" : body.language === "en" ? "en" : undefined;

  try {
    const text = await groqTranscribe(base64ToBytes(audio), mime, language);
    if (!text) {
      return errorResponse("I couldn't make out any speech — try again, a little closer to the mic.", 422);
    }
    return json({ text });
  } catch (e) {
    logAiError("transcribe", e);
    return errorResponse("The transcriber couldn't process that clip — please try again.", 502);
  }
}

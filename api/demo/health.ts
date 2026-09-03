// Diagnostic endpoint for the AI Lab: /api/demo/health
//
// It exists because of how this outage presented. Every demo streams tokens,
// and a streaming response commits its 200 before the model produces anything —
// so when the provider retired the model the demos ran on, the browser saw a
// successful but completely empty response and could only say "the AI didn't
// respond". Nothing in the UI could tell a missing API key from a retired model
// from a rate limit.
//
// A plain GET returns a coarse, safe summary (is a key configured, does the AI
// answer at all) with no infrastructure detail. Set DEMO_HEALTH_TOKEN and pass
// ?token=... to also get the per-model verdict, including the provider's own
// error text for each failure.
import {
  MODELS_FAST,
  MODELS_SMART,
  MODELS_STRUCTURED,
  MODELS_VISION,
  clientIp,
  errorResponse,
  hasKey,
  json,
  probeModel,
  rateLimit,
} from "../_shared";

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") return errorResponse("Method not allowed.", 405);

  const { ok, retryAfter } = await rateLimit(clientIp(req));
  if (!ok) {
    return errorResponse(`Too many checks — try again in ${retryAfter}s.`, 429, {
      "retry-after": String(retryAfter),
    });
  }

  if (!hasKey()) return json({ configured: false, ok: false }, 503);

  // Probe every distinct model across all four chains, once each.
  const models = [
    ...new Set([...MODELS_FAST, ...MODELS_SMART, ...MODELS_STRUCTURED, ...MODELS_VISION]),
  ];
  const results = await Promise.all(models.map((m) => probeModel(m)));
  const healthy = results.filter((r) => r.ok).length;

  // Each chain only needs its own first working model to keep its demos alive.
  const chainOk = (chain: readonly string[]) =>
    chain.some((m) => results.find((r) => r.model === m)?.ok);
  const chains = {
    fast: chainOk(MODELS_FAST),
    smart: chainOk(MODELS_SMART),
    structured: chainOk(MODELS_STRUCTURED),
    vision: chainOk(MODELS_VISION),
  };
  const allChainsOk = Object.values(chains).every(Boolean);

  const token = process.env.DEMO_HEALTH_TOKEN;
  const detailed = Boolean(token) && new URL(req.url).searchParams.get("token") === token;

  return json(
    detailed
      ? { configured: true, ok: allChainsOk, chains, models: results }
      : { configured: true, ok: allChainsOk, healthy, total: results.length },
    allChainsOk ? 200 : 503,
  );
}

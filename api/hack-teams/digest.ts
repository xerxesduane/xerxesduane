// The Vercel cron for the Champions' Thursday summary (see _digest.ts).
// Runs every Thursday at 10am Dubai; sends only on check-in dates, once each.
import { handle, json, safeEqual } from "../work/_lib";
import { sendDigest } from "./_digest";

export const config = { runtime: "edge" };

export default handle(async (req) => {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || !(await safeEqual(auth, `Bearer ${secret}`))) return json({ error: "Unauthorized." }, 401);
  return json(await sendDigest(false), 200, { "cache-control": "no-store" });
});

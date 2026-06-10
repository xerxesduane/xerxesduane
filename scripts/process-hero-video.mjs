import { execFileSync } from "node:child_process";
import { statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

// Compresses the raw hero footage (public/hero/raw.mp4, gitignored) into the
// shipped background video + poster. Run: node scripts/process-hero-video.mjs
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "hero");
const RAW = join(dir, "raw.mp4");

if (!existsSync(RAW)) {
  console.error("public/hero/raw.mp4 not found — drop the footage there first.");
  process.exit(1);
}

const kb = (p) => `${Math.round(statSync(p).length ?? statSync(p).size, 0)}`;
const sizeKB = (p) => `${(statSync(p).size / 1024).toFixed(0)} KB`;

// Background video: 1080p, 30fps (down from 60 — invisible for ambience,
// halves the bitrate), no audio, CRF 28, faststart for progressive playback.
const MP4 = join(dir, "hero-1080.mp4");
execFileSync(ffmpeg, [
  "-y",
  "-i", RAW,
  "-an",
  "-vf", "fps=30,scale=1920:-2",
  "-c:v", "libx264",
  "-profile:v", "high",
  "-crf", "28",
  "-preset", "slow",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  MP4,
], { stdio: ["ignore", "ignore", "inherit"] });
console.log(`  hero-1080.mp4  ${sizeKB(MP4)}`);

// Poster: a representative frame, webp, prerendered as the LCP-safe fallback.
const FRAME = join(dir, "_frame.png");
execFileSync(ffmpeg, ["-y", "-ss", "1.2", "-i", RAW, "-frames:v", "1", FRAME], {
  stdio: ["ignore", "ignore", "inherit"],
});
await sharp(FRAME)
  .resize({ width: 1600 })
  .webp({ quality: 62 })
  .toFile(join(dir, "poster.webp"));
const { unlinkSync } = await import("node:fs");
unlinkSync(FRAME);
console.log(`  poster.webp    ${sizeKB(join(dir, "poster.webp"))}`);
console.log("Hero media processed.");

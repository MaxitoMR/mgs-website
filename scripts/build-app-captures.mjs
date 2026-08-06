#!/usr/bin/env node
/**
 * Derives the web assets for the MGS Management App captures.
 *
 * The originals are 1206x2622 iPhone screen recordings and screenshots living
 * in Dropbox — they are NOT committed (roughly 36 MB, and they are source
 * material, not deliverables). This script produces the committed derivatives
 * under `public/images/app-screenshots/` and `public/videos/`.
 *
 *   node scripts/build-app-captures.mjs
 *
 * Re-runnable and idempotent. A missing source is skipped with a warning
 * rather than failing the run, so the captures that don't exist yet (the
 * client-role screens, the desktop schedule) can be dropped in later and the
 * script re-run without edits.
 *
 * REQUIRES FFMPEG: `brew install ffmpeg`.
 *
 * The first version of this script used macOS's built-in `avconvert`, to avoid
 * a dependency. Do not go back to it. The captures are screen recordings, which
 * are variable-frame-rate, and avconvert carries that VFR timing straight into
 * the output — producing duplicate, non-monotonic decode timestamps:
 *
 *     Application provided invalid, non monotonically increasing dts
 *     ... r_frame_rate=60/1 but nb_frames=113 across 8.2s
 *
 * Those files look completely fine by every cheap check. H.264 High 4.0,
 * yuv420p, `moov` before `mdat`, correct content-type, HTTP 206 on range
 * requests. They also never play in Chrome: an isolated `<video preload=auto>`
 * sits at readyState 0 / networkState 2 until it times out, because the
 * demuxer will not accept the timestamp table. Safari plays them, which is
 * exactly how they got shipped in the first place.
 *
 * `-vsync cfr` with an explicit `-r` rebuilds the timestamps monotonically,
 * which is the whole fix. Verify with `ffmpeg -v error -i out.mp4 -f null -`;
 * silence there means the file actually decodes.
 *
 * Privacy: `-map_metadata -1` drops all source metadata (capture device,
 * location) rather than copying it into a public file.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, rm, stat, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import sharp from "sharp";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Override with CAPTURE_SOURCE=... if the originals move. */
const SOURCE_ROOT =
  process.env.CAPTURE_SOURCE ??
  path.join(
    os.homedir(),
    "Library/CloudStorage/Dropbox/ROLE IMAGE:VIDEO"
  );

const SUPERVISOR = "supervisor role image:video";
const EMPLOYEE = "employee role image:video";
const ADMIN = "admin role image:video";

const IMAGE_OUT = path.join(ROOT, "public/images/app-screenshots");
const VIDEO_OUT = path.join(ROOT, "public/videos");

/**
 * Stills. Named for what the screen shows, matching the repo's existing
 * convention (`app-inspection-walk.jpg`), with the capture ID retained so the
 * shot list stays traceable.
 *
 * WebP q85 rather than the repo's usual JPEG q82-84: these are UI, not
 * photographs. JPEG rings around small text; WebP holds it and still takes
 * B-01 from 527 KB to 77 KB.
 */
const STILLS = [
  { id: "B-01", from: [SUPERVISOR, "B-01.png"], to: "inspection-failed-item.webp" },
  { id: "B-02", from: [SUPERVISOR, "B-02.png"], to: "inspection-submit-blocked.webp" },
  { id: "B-05", from: [SUPERVISOR, "B-05.png"], to: "inspection-medical-sections.webp" },
  { id: "B-06", from: [SUPERVISOR, "B-06.png"], to: "inspection-summary-signed.webp" },
  { id: "B-07", from: [SUPERVISOR, "B-07.png"], to: "locations-health-en.webp" },
  { id: "B-08", from: [SUPERVISOR, "B-08.png"], to: "locations-health-es.webp" },
  { id: "B-09", from: [EMPLOYEE, "B-09.png"], to: "employee-home-dark.webp" },
  { id: "B-10", from: [ADMIN, "B-10.png"], to: "shift-timeline-geofence.webp" },
  { id: "B-11", from: [SUPERVISOR, "B-11.png"], to: "rework-queue.webp" },
  { id: "B-12", from: [SUPERVISOR, "B-12.png"], to: "export-formats.webp" },
  { id: "B-14", from: [ADMIN, "B-14.png"], to: "active-shifts-live.webp" },
];

/**
 * Clips. Preset1920x1080 fits the portrait source to 884x1920 — roughly 3.2x
 * the largest CSS width any of these render at, so they stay crisp on a 3x
 * display without carrying a 1206px-wide encode.
 *
 * C-01 is the only trim. Its first ~15 seconds are navigation: the dashboard,
 * the inspection setup, then three sections of passing items. The beat — score
 * sitting at 80, item marked Fail, 80 dropping to 78, photo attached, note
 * typed — starts around 15s. Opening at 14s means the clip begins on an intact
 * 80, so the drop is legible rather than assumed.
 */
const CLIPS = [
  {
    id: "C-01",
    from: [SUPERVISOR, "C-01.mov"],
    to: "inspection-score-drop.mp4",
    start: 14,
    duration: 18.8,
  },
  { id: "C-02B", from: [EMPLOYEE, "C-02B.mov"], to: "clockin-refused-distance.mp4" },
  { id: "C-02A", from: [EMPLOYEE, "C-02A.mov"], to: "clockin-refused-early.mp4" },
  { id: "C-04", from: [SUPERVISOR, "C-04.mov"], to: "export-deficiency.mp4" },
  { id: "C-05", from: [SUPERVISOR, "C-05.mov"], to: "submit-blocked.mp4" },
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function buildStills() {
  const skipped = [];
  for (const s of STILLS) {
    const src = path.join(SOURCE_ROOT, ...s.from);
    if (!(await exists(src))) {
      skipped.push(s.id);
      continue;
    }
    const dest = path.join(IMAGE_OUT, s.to);
    await sharp(src).webp({ quality: 85 }).toFile(dest);
    const { size: before } = await stat(src);
    const { size: after } = await stat(dest);
    console.log(`  ${s.id}  ${s.to.padEnd(36)} ${kb(before)} → ${kb(after)}`);
  }
  return skipped;
}

/**
 * Pulls a frame out of the CONVERTED clip, so the poster matches the trim
 * exactly — a poster taken from the original would show a frame the visitor
 * never sees.
 *
 * Takes the frame at `at` seconds into the finished file, which for every clip
 * here is 0. That matters for C-01: its poster has to be the intact score of
 * 80, because the drop to 78 is the thing the clip exists to reveal. Anything
 * later gives away the ending on the play button.
 */
async function buildPoster(mp4Path, posterPath, tmpDir, at = 0) {
  const frame = path.join(tmpDir, "frame.png");
  await run("ffmpeg", [
    "-v", "error",
    "-ss", String(at),
    "-i", mp4Path,
    "-frames:v", "1",
    "-y", frame,
  ]);
  await sharp(frame).webp({ quality: 82 }).toFile(posterPath);
  await rm(frame, { force: true });
}

/** Silence from a null-muxer decode is the only proof the file actually plays. */
async function verifyDecodes(mp4Path) {
  const { stderr } = await run("ffmpeg", [
    "-v", "error",
    "-i", mp4Path,
    "-f", "null",
    "-",
  ]);
  if (stderr.trim()) {
    throw new Error(
      `${path.basename(mp4Path)} does not decode cleanly:\n${stderr.trim()}`
    );
  }
}

async function buildClips() {
  const skipped = [];
  const tmpDir = path.join(os.tmpdir(), "mgs-capture-posters");
  await mkdir(tmpDir, { recursive: true });

  for (const c of CLIPS) {
    const src = path.join(SOURCE_ROOT, ...c.from);
    if (!(await exists(src))) {
      skipped.push(c.id);
      continue;
    }
    const dest = path.join(VIDEO_OUT, c.to);
    const args = ["-v", "error"];
    // -ss before -i seeks by keyframe before decoding: fast, and accurate
    // enough here because every clip starts on a settled screen.
    if (c.start != null) args.push("-ss", String(c.start));
    args.push("-i", src);
    if (c.duration != null) args.push("-t", String(c.duration));
    args.push(
      // 884px wide matches the old output; -2 keeps the height even, which
      // H.264 requires.
      "-vf", "scale=884:-2",
      // The fix. Screen recordings are VFR; forcing CFR at 30 rebuilds the
      // timestamps so Chrome's demuxer will accept the file.
      "-r", "30",
      "-vsync", "cfr",
      "-c:v", "libx264",
      "-profile:v", "high",
      "-pix_fmt", "yuv420p",
      "-crf", "24",
      "-preset", "slow",
      "-an",                      // no audio track — these are silent
      "-map_metadata", "-1",      // drop capture device / location metadata
      "-movflags", "+faststart",  // moov ahead of mdat, so it streams
      "-y", dest
    );

    await run("ffmpeg", args);
    await verifyDecodes(dest);

    const poster = dest.replace(/\.mp4$/, "-poster.webp");
    await buildPoster(dest, poster, tmpDir, c.posterAt ?? 0);

    const { size: before } = await stat(src);
    const { size: after } = await stat(dest);
    const { size: posterSize } = await stat(poster);
    const trim = c.start != null ? `  (trimmed ${c.start}s +${c.duration}s)` : "";
    console.log(
      `  ${c.id}  ${c.to.padEnd(36)} ${kb(before)} → ${kb(after)} + ${kb(posterSize)} poster${trim}`
    );
  }

  await rm(tmpDir, { recursive: true, force: true });
  return skipped;
}

async function main() {
  if (!(await exists(SOURCE_ROOT))) {
    console.error(`Source folder not found: ${SOURCE_ROOT}`);
    console.error("Set CAPTURE_SOURCE to point at the originals.");
    process.exit(1);
  }

  await mkdir(IMAGE_OUT, { recursive: true });
  await mkdir(VIDEO_OUT, { recursive: true });

  console.log("\nStills → public/images/app-screenshots/");
  const skippedStills = await buildStills();

  console.log("\nClips → public/videos/");
  const skippedClips = await buildClips();

  const skipped = [...skippedStills, ...skippedClips];
  if (skipped.length) {
    console.log(`\nNot yet captured, skipped: ${skipped.join(", ")}`);
  }
  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

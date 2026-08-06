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
 * WHY THESE TOOLS: `sharp` is already a dependency. For video we use macOS's
 * built-in `avconvert` and `qlmanage` rather than ffmpeg, which is not
 * installed here — avconvert handles the H.264 re-encode AND the trim
 * (`--start` / `--duration`), and qlmanage pulls the poster frame. That keeps
 * the pipeline to tools that ship with the OS.
 *
 * Note on privacy: avconvert strips privacy-sensitive source metadata by
 * default (we deliberately do NOT pass --disableMetadataFilter), so capture
 * device and location data do not survive into the committed files.
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
 * Pulls the OPENING frame of the CONVERTED clip, so the poster matches the
 * trim exactly — a poster taken from the original would show a frame the
 * visitor never sees.
 *
 * The two-step dance is load-bearing. Running `qlmanage -t` straight at a
 * video returns QuickLook's *representative* frame, which it picks from
 * somewhere in the middle — for C-01 that was the failed end-state, i.e. a
 * poster that gave away the score drop the clip exists to show. Cutting a
 * 0.2s stub at the target timestamp first and thumbnailing THAT pins the frame
 * to where we actually want it.
 */
async function buildPoster(mp4Path, posterPath, tmpDir, at = 0) {
  const stub = path.join(tmpDir, "stub.mp4");
  await run("avconvert", [
    "--source", mp4Path,
    "--preset", "Preset1920x1080",
    "--start", String(at),
    "--duration", "0.2",
    "--output", stub,
    "--replace",
  ]);
  await run("qlmanage", ["-t", "-s", "1080", "-o", tmpDir, stub]);
  const produced = (await readdir(tmpDir)).find((f) => f.endsWith(".png"));
  if (!produced) throw new Error(`qlmanage produced no frame for ${mp4Path}`);
  await sharp(path.join(tmpDir, produced))
    .webp({ quality: 82 })
    .toFile(posterPath);
  await rm(path.join(tmpDir, produced), { force: true });
  await rm(stub, { force: true });
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
    const args = [
      "--source", src,
      "--preset", "Preset1920x1080",
      "--output", dest,
      "--replace",
    ];
    if (c.start != null) args.push("--start", String(c.start));
    if (c.duration != null) args.push("--duration", String(c.duration));

    await run("avconvert", args);

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

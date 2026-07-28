# Team portrait alignment

Turns raw shoot files into the aligned 4:5 portraits used by the team grid on
`/about`. Every output shares a common **eye line** and a normalised **head
size**, so the row reads as one lineup instead of six unrelated photos.

## Why this exists

The masters are 2:3 frames shot at different distances. Each subject's eyes
land somewhere different in frame (measured: 30%–42% of frame height) and head
sizes vary by a third (14%–19%). A single CSS `object-position` can only slide
the frame — it cannot make a small head and a large head match. So the
alignment is baked into the images instead.

## Running it

```bash
node scripts/portraits/measure-grid.cjs    # 1. contact sheet with 5% gridlines
node scripts/portraits/align.cjs           # 2. crop + resize from the masters
node scripts/portraits/check-alignment.cjs # 3. contact sheet with the eye line drawn
```

Paths at the top of each file point at the masters; update them for a new
shoot. `align.cjs` always crops from the **full-resolution masters**, never
from an already-processed file, so re-running never compounds quality loss.

## Adding or re-shooting someone

1. Run `measure-grid.cjs` and open `grid-sheet.jpg`.
2. Read three numbers off the gridlines, as fractions of image height/width:
   - `eyeY`  — the eye line
   - `headH` — crown to chin
   - `faceX` — horizontal centre of the face
3. Add a row to `PEOPLE` in `align.cjs` and run it.
4. Run `check-alignment.cjs` and confirm the red line crosses every subject's
   eyes. Nudge `eyeY` and re-run if someone sits high or low.

## The two tuning knobs

- `EYE_TARGET` (0.31) — where the eye line sits in the output.
- `HEAD_TARGET` (0.24) — head height as a fraction of the output.

`HEAD_TARGET` is the one that matters most. 0.30 was tried first: alignment was
perfect but it produced tight headshots that cropped away the desks and the
branded polo. That environmental context is what makes these read as real
people at work rather than stock portraits, so it was widened to 0.24 — still
normalised, still aligned, context intact.

If a requested crop is wider than the master, the script clamps to the master
width and accepts a slightly smaller head rather than upscaling. That happened
to `team-06` at 0.24 and the ~3% deviation is imperceptible.

## Output contract

`1000×1250` (4:5), mozjpeg q84, ~90–225 KB. The card in `about/page.tsx` is
also `aspect-[4/5]`, so the image fills it exactly and needs **no**
`object-position`. If you change the output ratio, change the card to match.

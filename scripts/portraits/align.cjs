/*
 * Normalise the team portraits into one cohesive lineup.
 *
 * The masters are 2:3 frames shot at different distances, so each subject's
 * eye line and head size land somewhere different. Cropping them all with a
 * single CSS object-position can only ever slide the frame — it cannot fix
 * the fact that one head is 14% of frame height and another is 19%.
 *
 * So we crop from the MASTERS with two constraints:
 *   1. every head occupies the same fraction of the output  -> HEAD_TARGET
 *   2. every eye line sits at the same height in the output -> EYE_TARGET
 * The result is a set of 4:5 images that need no per-image CSS at all.
 *
 * Measurements below are read off a calibrated 5%-gridline contact sheet
 * (grid.cjs), expressed as fractions of master height / width.
 */
const sharp = require('C:/Users/sag19/mgs-website/node_modules/sharp');
const fs = require('fs');
const path = require('path');

const SHOOT = __dirname;
const OUT = 'C:/Users/sag19/mgs-website/public/images';

const OUT_W = 1000;
const OUT_H = 1250;          // 4:5, matches the card aspect exactly
const EYE_TARGET = 0.31;     // eye line, as a fraction of output height
/* Head height as a fraction of output. 0.30 produced tight headshots that
   aligned perfectly but cropped away the desks and the branded polo — the
   environmental context is what makes these read as real people at work
   rather than stock portraits. 0.24 keeps that context and still normalises
   head scale across the six. */
const HEAD_TARGET = 0.24;

const PEOPLE = [
  { out: 'team-01.jpg', src: '1-_DSC0294.jpg', eyeY: 0.305, headH: 0.140, faceX: 0.38 },
  { out: 'team-02.jpg', src: '2-_DSC0296.jpg', eyeY: 0.420, headH: 0.180, faceX: 0.47 },
  { out: 'team-03.jpg', src: '3-_DSC0297.jpg', eyeY: 0.335, headH: 0.170, faceX: 0.52 },
  { out: 'team-04.jpg', src: '4-_DSC0301.jpg', eyeY: 0.375, headH: 0.170, faceX: 0.48 },
  { out: 'team-05.jpg', src: '5-_DSC0302.jpg', eyeY: 0.340, headH: 0.180, faceX: 0.55 },
  { out: 'team-06.jpg', src: 'C:/Users/sag19/Downloads/_DSC0311.jpg', eyeY: 0.300, headH: 0.190, faceX: 0.47 },
];

(async () => {
  for (const p of PEOPLE) {
    const srcPath = p.src.includes(':') ? p.src : path.join(SHOOT, p.src);
    const m = await sharp(srcPath).metadata();

    // Crop height so the head fills HEAD_TARGET of it.
    let cropH = Math.round((p.headH * m.height) / HEAD_TARGET);
    let cropW = Math.round(cropH * (OUT_W / OUT_H));

    // Never ask for more pixels than exist.
    if (cropW > m.width) {
      cropW = m.width;
      cropH = Math.round(cropW * (OUT_H / OUT_W));
    }

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
    const top = clamp(Math.round(p.eyeY * m.height - EYE_TARGET * cropH), 0, m.height - cropH);
    const left = clamp(Math.round(p.faceX * m.width - cropW / 2), 0, m.width - cropW);

    await sharp(srcPath)
      .extract({ left, top, width: cropW, height: cropH })
      .resize(OUT_W, OUT_H)
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(OUT, p.out));

    const kb = (fs.statSync(path.join(OUT, p.out)).size / 1024).toFixed(0);
    console.log(
      `${p.out}  crop ${cropW}x${cropH} @ (${left},${top})  ->  ${OUT_W}x${OUT_H}  ${kb} KB`,
    );
  }
})();

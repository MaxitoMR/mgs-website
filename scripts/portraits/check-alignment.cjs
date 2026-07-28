/* Contact sheet of the ALIGNED outputs with the target eye line drawn on,
   so alignment can be judged rather than assumed. */
const sharp = require('C:/Users/sag19/mgs-website/node_modules/sharp');
const path = require('path');

const DIR = 'C:/Users/sag19/mgs-website/public/images';
const FILES = ['team-01.jpg', 'team-02.jpg', 'team-03.jpg', 'team-04.jpg', 'team-06.jpg', 'team-05.jpg'];
const W = 330;
const H = Math.round(W * 1.25); // outputs are 4:5
const EYE = 0.31;
const HEAD_TOP = 0.31 - 0.24 * 0.42; // approx crown for a 24%-tall head

function overlay() {
  const eyeY = EYE * H;
  const topY = HEAD_TOP * H;
  return Buffer.from(`<svg width="${W}" height="${H}">
    <line x1="0" y1="${eyeY}" x2="${W}" y2="${eyeY}" stroke="#ff0044" stroke-width="2"/>
    <line x1="0" y1="${topY}" x2="${W}" y2="${topY}" stroke="#00e5ff" stroke-width="1.4" stroke-dasharray="6 5"/>
  </svg>`);
}

(async () => {
  const tiles = [];
  for (const f of FILES) {
    const buf = await sharp(path.join(DIR, f))
      .resize(W, H, { fit: 'cover' })
      .composite([{ input: overlay(), top: 0, left: 0 }])
      .toBuffer();
    tiles.push({ input: buf, top: 0, left: tiles.length * W });
  }
  await sharp({ create: { width: W * FILES.length, height: H, channels: 3, background: '#111' } })
    .composite(tiles)
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, 'aligned-sheet.jpg'));
  console.log('red = target eye line, cyan dashed = expected crown');
  console.log('saved aligned-sheet.jpg');
})();

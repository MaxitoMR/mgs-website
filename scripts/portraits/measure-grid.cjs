const sharp = require('C:/Users/sag19/mgs-website/node_modules/sharp');
const path = require('path');

const DIR = 'C:/Users/sag19/mgs-website/public/images';
const OUT = __dirname;
const FILES = ['team-01.jpg', 'team-02.jpg', 'team-03.jpg', 'team-04.jpg', 'team-06.jpg', 'team-05.jpg'];

const W = 380;          // preview width
const H = Math.round(W * 1.5); // sources are 2:3

// Horizontal rules every 5% of image height, labelled with the fraction.
function overlay() {
  let lines = '';
  for (let p = 5; p < 100; p += 5) {
    const y = (p / 100) * H;
    const major = p % 10 === 0;
    lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${major ? '#ff0044' : '#00e5ff'}" stroke-width="${major ? 1.6 : 0.8}" opacity="0.9"/>`;
    lines += `<text x="4" y="${y - 3}" font-family="monospace" font-size="13" fill="${major ? '#ff0044' : '#00e5ff'}">${p}</text>`;
  }
  return Buffer.from(`<svg width="${W}" height="${H}">${lines}</svg>`);
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
  await sharp({
    create: { width: W * FILES.length, height: H, channels: 3, background: '#000' },
  })
    .composite(tiles)
    .jpeg({ quality: 88 })
    .toFile(path.join(OUT, 'grid-sheet.jpg'));
  console.log('order: ' + FILES.join('  '));
  console.log('saved grid-sheet.jpg');
})();

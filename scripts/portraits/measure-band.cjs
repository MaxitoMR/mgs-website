/* Magnified eye-band comparison. Crops the 18%-46% slice of each 4:5 output,
   scales it up, and draws the target eye line through all six at the same
   place â€” so vertical error is read directly instead of estimated. */
const sharp = require('C:/Users/sag19/mgs-website/node_modules/sharp');
const path = require('path');

const DIR = 'C:/Users/sag19/mgs-website/public/images';
const FILES = ['team-01.jpg', 'team-02.jpg', 'team-03.jpg', 'team-04.jpg', 'team-06.jpg', 'team-05.jpg'];
const NAMES = ['Barbara', 'Rhonda', 'Edgar', 'Saul', 'Maximiliano', 'Gisella'];

const BAND_TOP = 0.18;
const BAND_BOT = 0.46;
const TARGET = 0.30;
const TILE_W = 620;

(async () => {
  const tiles = [];
  let y = 0;
  let tileH = 0;
  for (let i = 0; i < FILES.length; i++) {
    const src = path.join(DIR, FILES[i]);
    const m = await sharp(src).metadata();
    const top = Math.round(BAND_TOP * m.height);
    const h = Math.round((BAND_BOT - BAND_TOP) * m.height);
    const buf = await sharp(src)
      .extract({ left: 0, top, width: m.width, height: h })
      .resize(TILE_W)
      .toBuffer();
    const bm = await sharp(buf).metadata();
    tileH = bm.height;
    // target line, mapped into the band
    const ty = ((TARGET - BAND_TOP) / (BAND_BOT - BAND_TOP)) * bm.height;
    const svg = Buffer.from(`<svg width="${TILE_W}" height="${bm.height}">
      <line x1="0" y1="${ty}" x2="${TILE_W}" y2="${ty}" stroke="#ff0044" stroke-width="2.5"/>
      <rect x="0" y="0" width="150" height="20" fill="#000" opacity="0.7"/>
      <text x="5" y="15" font-family="monospace" font-size="14" fill="#fff">${NAMES[i]}</text>
    </svg>`);
    const composed = await sharp(buf).composite([{ input: svg, top: 0, left: 0 }]).toBuffer();
    tiles.push({ input: composed, top: y, left: 0 });
    y += bm.height;
  }
  await sharp({ create: { width: TILE_W, height: tileH * FILES.length, channels: 3, background: '#111' } })
    .composite(tiles)
    .jpeg({ quality: 92 })
    .toFile(path.join(__dirname, 'band.jpg'));
  console.log(`saved band.jpg  (tile height ${tileH}px, target line at ${TARGET})`);
})();

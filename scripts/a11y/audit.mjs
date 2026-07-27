import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';
import fs from 'node:fs';

const CHROME = 'C:\\Users\\sag19\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL || 'https://mgs-website-nu.vercel.app';

const PATHS = (process.env.PATHS || [
  '/',
  '/services',
  '/services/hospital-cleaning',
  '/about',
  '/leadership',
  '/faq',
  '/gallery',
  '/quote',
  '/careers',
  '/employee-application',
  '/walkthrough',
  '/newsletter',
].join(',')).split(',');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const results = [];

for (const vp of VIEWPORTS) {
  for (const path of PATHS) {
    const url = BASE + path;
    const page = await browser.newPage();
    await page.setViewport(vp);
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      if (!resp || resp.status() >= 400) {
        console.error(`SKIP ${vp.name} ${path} -> ${resp ? resp.status() : 'no response'}`);
        await page.close();
        continue;
      }
      // let animations/GSAP settle
      await new Promise((r) => setTimeout(r, 2500));

      const axeResults = await new AxePuppeteer(page)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

      for (const v of axeResults.violations) {
        results.push({
          viewport: vp.name,
          path,
          id: v.id,
          impact: v.impact,
          help: v.help,
          helpUrl: v.helpUrl,
          tags: v.tags.filter((t) => t.startsWith('wcag') || t === 'best-practice'),
          count: v.nodes.length,
          nodes: v.nodes.slice(0, 6).map((n) => ({
            target: n.target.join(' '),
            html: n.html.slice(0, 260),
            summary: (n.failureSummary || '').replace(/\s+/g, ' ').slice(0, 400),
          })),
        });
      }
      console.error(`OK   ${vp.name} ${path} -> ${axeResults.violations.length} violation types`);
    } catch (e) {
      console.error(`FAIL ${vp.name} ${path}: ${e.message}`);
    }
    await page.close();
  }
}

await browser.close();
fs.writeFileSync('results.json', JSON.stringify(results, null, 2));

// Aggregate summary
const byRule = {};
for (const r of results) {
  const k = r.id;
  byRule[k] ??= { id: k, impact: r.impact, help: r.help, tags: r.tags, total: 0, pages: new Set(), sample: r.nodes[0] };
  byRule[k].total += r.count;
  byRule[k].pages.add(`${r.viewport}:${r.path}`);
}
const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const summary = Object.values(byRule)
  .sort((a, b) => (order[a.impact] ?? 9) - (order[b.impact] ?? 9) || b.total - a.total)
  .map((r) => ({ ...r, pages: [...r.pages] }));

fs.writeFileSync('summary.json', JSON.stringify(summary, null, 2));

console.log('\n================ AXE SUMMARY ================');
for (const r of summary) {
  console.log(`\n[${(r.impact || '?').toUpperCase()}] ${r.id} — ${r.help}`);
  console.log(`  tags: ${r.tags.join(', ')}`);
  console.log(`  ${r.total} nodes across ${r.pages.length} page/viewport combos`);
  console.log(`  pages: ${r.pages.slice(0, 8).join(', ')}${r.pages.length > 8 ? ' …' : ''}`);
  if (r.sample) {
    console.log(`  sample: ${r.sample.target}`);
    console.log(`     html: ${r.sample.html}`);
    console.log(`     why : ${r.sample.summary}`);
  }
}
console.log(`\nTotal violation types: ${summary.length}`);

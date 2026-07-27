import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';

const CHROME = 'C:\\Users\\sag19\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL || 'http://localhost:3111';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const fail = [];
const ok = (m) => console.log(`  PASS  ${m}`);
const bad = (m) => { console.log(`  FAIL  ${m}`); fail.push(m); };

// ── 1. Form ERROR states (axe never saw these — errors only render after submit)
console.log('\n=== 1. Validation error states ===');
for (const [path, btn] of [
  ['/quote', 'Submit Quote Request'],
  ['/walkthrough', 'Schedule Walkthrough'],
  ['/employee-application', 'Submit Application'],
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + path, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // Submit empty to trigger zod validation errors
  const clicked = await page.evaluate((label) => {
    const b = [...document.querySelectorAll('button[type=submit]')]
      .find((x) => x.textContent.includes(label));
    if (!b) return false;
    b.click();
    return true;
  }, btn);
  if (!clicked) { bad(`${path}: could not find submit button "${btn}"`); await page.close(); continue; }
  await new Promise((r) => setTimeout(r, 1200));

  const errCount = await page.evaluate(() => document.querySelectorAll('[role=alert]').length);
  if (errCount === 0) { bad(`${path}: no [role=alert] errors rendered after empty submit`); }
  else ok(`${path}: ${errCount} error(s) announced via role="alert"`);

  // Are errors wired to their inputs?
  const unwired = await page.evaluate(() =>
    [...document.querySelectorAll('[aria-invalid="true"]')]
      .filter((el) => {
        const id = el.getAttribute('aria-describedby');
        return !id || !document.getElementById(id);
      })
      .map((el) => el.name || el.id || el.tagName)
  );
  if (unwired.length) bad(`${path}: aria-describedby missing/broken on ${unwired.join(', ')}`);
  else ok(`${path}: every invalid field points at a real error element`);

  const res = await new AxePuppeteer(page)
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();
  if (res.violations.length) {
    for (const v of res.violations) bad(`${path} (error state): ${v.id} — ${v.help} [${v.nodes.length}]`);
  } else ok(`${path}: axe clean WITH validation errors visible`);
  await page.close();
}

// ── 2. prefers-reduced-motion: nothing may stay invisible
console.log('\n=== 2. prefers-reduced-motion ===');
for (const path of ['/', '/services', '/gallery']) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(BASE + path, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));
  // Staged scroll, NOT an instant jump to the bottom: jumping skips
  // IntersectionObserver for the sections passed over, so whileInView
  // reveals never fire and every mid-page element reads as "stranded"
  // — in normal motion too. That's a harness artifact, not a defect.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Any element with real text that renders at opacity 0 is stranded content.
  const invisible = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('h1,h2,h3,p,a,span,li,button')) {
      const t = (el.textContent || '').trim();
      if (t.length < 4) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (parseFloat(cs.opacity) < 0.1) out.push(`${el.tagName}.${el.className.toString().slice(0, 40)} "${t.slice(0, 40)}"`);
    }
    return out.slice(0, 10);
  });
  if (invisible.length) { bad(`${path}: ${invisible.length} element(s) stuck invisible under reduced motion`); invisible.forEach((i) => console.log(`        ${i}`)); }
  else ok(`${path}: no content stranded at opacity 0 under reduced motion`);
  await page.close();
}

// ── 3. Skip link + keyboard reachability of the mega menu
console.log('\n=== 3. Keyboard ===');
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1500));

  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => {
    const a = document.activeElement;
    return { text: (a.textContent || '').trim(), href: a.getAttribute('href'), visible: a.getBoundingClientRect().top >= 0 };
  });
  if (/skip to main/i.test(first.text) && first.href === '#main-content') ok(`skip link is the first tab stop and reveals on focus (top=${first.visible})`);
  else bad(`first tab stop is not the skip link (got "${first.text}")`);

  const target = await page.evaluate(() => !!document.getElementById('main-content'));
  target ? ok('#main-content target exists') : bad('#main-content target missing');

  // Mega menu must be operable by keyboard, not hover-only.
  // Read aria-expanded AFTER React commits — a synchronous read right after
  // .click() returns the pre-render value and always looks like a failure.
  const sel = 'nav[aria-label="Primary"] button[aria-haspopup]';
  await page.focus(sel);
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 600));
  const expanded = await page.$eval(sel, (b) => b.getAttribute('aria-expanded'));
  if (expanded === 'true') ok('Enter opens the mega menu (aria-expanded=true)');
  else bad(`mega-menu did not open on Enter (got ${expanded})`);

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));
  const closed = await page.$eval(sel, (b) => b.getAttribute('aria-expanded'));
  if (closed === 'false') ok('Escape closes the mega menu');
  else bad(`Escape left the mega menu ${closed}`);
  await page.close();
}

await browser.close();
console.log(`\n${'='.repeat(46)}`);
console.log(fail.length ? `${fail.length} CHECK(S) FAILED` : 'ALL CHECKS PASSED');
process.exit(fail.length ? 1 : 0);

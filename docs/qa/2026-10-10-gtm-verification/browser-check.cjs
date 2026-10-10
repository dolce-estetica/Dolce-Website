const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://localhost:3107';
const out = process.env.QA_OUT || '/tmp/dolce-gtm-browser-checks.json';
(async () => {
  const browser = await chromium.launch();
  const results = []; const errors = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push({ route: page.url(), message: e.message }));
    const gtmResponses = [];
    page.on('response', r => { if (r.url().includes('googletagmanager.com/gtm.js?')) gtmResponses.push(r.status()); });
    // Allow the real container to initialize, but don't send QA analytics/ad hits.
    await page.route(/https:\/\/[^/]*(?:google-analytics\.com|doubleclick\.net|googleadservices\.com)\//, r => r.abort());
    await page.route(/https:\/\/[^/]*google\.[^/]+\/(?:pagead|ccm)\//, r => r.abort());
    await page.route('**/api/lead-intake', r => r.abort());
    for (const route of ['/', '/hydrafacial', '/glutathione-treatment', '/vaser-liposuction', '/contact', '/booking']) {
      const startRequests = gtmResponses.length;
      const response = await page.goto(base + route, { waitUntil: 'load' });
      assert.equal(response.status(), 200);
      await page.waitForFunction(() => window.google_tag_manager?.['GTM-WSLPLPK8']);
      await page.evaluate(() => document.fonts.ready);
      const facts = await page.evaluate(() => ({
        firstBodyElement: document.body.firstElementChild.tagName,
        loaderCount: document.querySelectorAll('script#dolce-gtm').length,
        startEvents: window.dataLayer.filter(e => e.event === 'gtm.js').length,
        title: document.title,
        canonical: document.querySelector('head link[rel=canonical]')?.href,
        description: document.querySelector('head meta[name=description]')?.content,
        h1: document.querySelector('h1')?.textContent,
        overflow: document.documentElement.scrollWidth > innerWidth,
      }));
      assert.equal(facts.firstBodyElement, 'NOSCRIPT'); assert.equal(facts.loaderCount, 1); assert.equal(facts.startEvents, 1);
      assert.ok(facts.title && facts.canonical && facts.description && facts.h1); assert.equal(facts.overflow, false, JSON.stringify({route,width,facts}));
      assert.deepEqual(gtmResponses.slice(startRequests), [200]);
      if (route === '/hydrafacial') {
        const chip = page.locator('button[aria-pressed]').nth(1);
        const concern = await chip.innerText(); await chip.click();
        await page.waitForFunction(v => document.querySelector('#lp-concern').value === v, concern);
      }
      results.push({ route, width, ...facts, gtmStatus: 200 });
    }
    await page.goto(base + '/', { waitUntil: 'load' });
    await page.waitForFunction(() => window.google_tag_manager?.['GTM-WSLPLPK8']);
    await page.evaluate(() => { window.__qaInitialDocument = true; });
    const requestsBefore = gtmResponses.length;
    if (width < 1024) await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.locator('a[href="/about"]:visible').first().click();
    await page.waitForURL('**/about'); await page.waitForFunction(() => document.title.includes('About'));
    assert.equal(await page.evaluate(() => window.__qaInitialDocument), true);
    assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e.event === 'gtm.js').length), 1);
    assert.equal(gtmResponses.length, requestsBefore);
    results.push({ route: '/ → /about', width, clientNavigation: true, noDuplicateGtm: true, metadataUpdated: true });
    await context.close();
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const page = await noJs.newPage();
  await page.route('**/googletagmanager.com/ns.html?**', r => r.abort());
  await page.goto(base + '/', { waitUntil: 'load' });
  assert.equal(await page.locator('body').evaluate(b => b.firstElementChild.tagName), 'NOSCRIPT');
  assert.equal(await page.locator('body > noscript > iframe').getAttribute('src'), 'https://www.googletagmanager.com/ns.html?id=GTM-WSLPLPK8');
  assert.ok(await page.locator('h1').isVisible());
  results.push({ route: '/', javaScript: false, noscriptFirst: true, fallbackIframePresent: true, pageVisible: true });
  assert.deepEqual(errors, []);
  fs.writeFileSync(out, JSON.stringify({ base, results, errors }, null, 2));
  console.log(JSON.stringify({ browserChecks: results.length, errors }));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

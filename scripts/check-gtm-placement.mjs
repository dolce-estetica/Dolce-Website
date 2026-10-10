import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Check the HTML Google downloads, before JavaScript can move any elements.
// Only whitespace/comments may precede GTM's noscript inside <body>.
export function checkGtmPlacement(html, label) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1];
  assert.ok(head && body, `${label}: missing document head/body`);
  const loaders = [...head.matchAll(/<script\b[^>]*id="dolce-gtm"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(loaders.length, 1, `${label}: expected one GTM loader in head`);
  const container = loaders[0][1].match(/['"](GTM-[A-Z0-9]+)['"]/)?.[1];
  assert.ok(container, `${label}: missing container ID`);
  const firstElement = body.replace(/^(?:\s|<!--[\s\S]*?-->)+/, '');
  const noscript = firstElement.match(/^<noscript>([\s\S]*?)<\/noscript>/)?.[1];
  assert.ok(noscript, `${label}: GTM noscript must be the first body element`);
  assert.ok(noscript.includes(`src="https://www.googletagmanager.com/ns.html?id=${container}"`), `${label}: noscript container mismatch`);
  assert.equal([...html.matchAll(/src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=/g)].length, 1, `${label}: duplicate GTM iframe`);
  assert.ok(head.includes('<title>'), `${label}: title missing from head`);
  return { page: label, container, firstBodyElement: 'noscript', headLoaderCount: 1 };
}

async function htmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(file));
    // Next's last-resort global error document deliberately replaces the root layout.
    else if (entry.name.endsWith('.html') && entry.name !== '_global-error.html') files.push(file);
  }
  return files;
}

const base = process.argv[2];
const checks = [];
if (base) {
  for (const route of ['/', '/hydrafacial', '/glutathione-treatment', '/vaser-liposuction', '/contact', '/booking']) {
    for (const userAgent of ['Mozilla/5.0', 'Google-Site-Verification/1.0', 'Googlebot/2.1 (+http://www.google.com/bot.html)']) {
      const response = await fetch(new URL(route, base), { headers: { 'user-agent': userAgent } });
      assert.equal(response.status, 200, `${route}: HTTP ${response.status}`);
      checks.push({ ...checkGtmPlacement(await response.text(), route), userAgent });
    }
  }
} else {
  const files = await htmlFiles('.next/server/app');
  assert.ok(files.length > 0, 'No built HTML found. Run next build first.');
  for (const file of files) checks.push(checkGtmPlacement(await readFile(file, 'utf8'), file));
}
console.log(JSON.stringify({ base: base ?? 'production build', passed: checks.length, checks }, null, 2));

/**
 * One-off / repeatable asset pass: re-encodes everything in `public/` to WebP at a
 * sensible pixel size for how it is actually displayed.
 *
 * The originals that shipped with the design were straight exports — 8000x4500 PNGs for
 * the hero, 1080x1080 PNGs for cards that render at 340px. Bytes were only half the
 * problem: decoding a 36-megapixel PNG stalls the main thread on a phone for seconds.
 *
 * Quality is deliberately high (WebP q90-100, and the caps below are all >= 2x the
 * largest size the layout ever asks for), so this is a visually lossless pass, not a
 * "shrink it until it looks bad" pass. `next/image` then re-encodes to AVIF/WebP per
 * device on top of these.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # dry run — prints what it would do
 *   node scripts/optimize-images.mjs --write    # write .webp alongside the originals
 *   node scripts/optimize-images.mjs --write --replace   # ...and delete the originals
 *
 * Originals stay recoverable from git history either way.
 */
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, existsSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";

const WRITE = process.argv.includes("--write");
const REPLACE = process.argv.includes("--replace");

/**
 * Longest-edge cap per folder, chosen as ~2x the biggest CSS size in the layout:
 *   bgs        full-viewport hero art        -> 2560 covers 2x on a 1280px viewport
 *   treatments cards render at max 340px     -> 1080 is already ~3x; keep as-is
 *   team       portraits at max ~25vw        -> 900
 *   gallery    grid tiles at max ~50vw       -> 1024 (already)
 *   assets     mixed: banners, map, logo     -> 1600
 */
const CAPS = { bgs: 2560, treatments: 1080, team: 900, gallery: 1024, assets: 1600 };

/** Favicons / app icons: tiny already, and their format is load-bearing. */
const SKIP = new Set(["apple-icon.png", "icon-light-32x32.png", "icon-dark-32x32.png", "favicon.ico"]);

/** The logo is line art over transparency — encode it lossless so edges stay crisp. */
const LOSSLESS = new Set(["logo.png"]);

const files = [];
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(png|jpe?g)$/i.test(e.name) && !SKIP.has(e.name)) files.push(p);
  }
}
walk("public");
files.sort();

let before = 0;
let after = 0;
const rows = [];

for (const src of files) {
  const folder = src.split(/[\\/]/)[1];
  const cap = CAPS[folder] ?? 1600;
  const name = basename(src);
  const out = src.slice(0, -extname(src).length) + ".webp";

  const img = sharp(src);
  const meta = await img.metadata();

  // PNG exports carry an alpha channel even when nothing is transparent. Dropping a
  // fully-opaque alpha channel is free compression with zero visual change.
  const stats = await img.stats();
  const keepAlpha = meta.hasAlpha && !stats.isOpaque;

  const longest = Math.max(meta.width, meta.height);
  const resize = longest > cap ? { width: meta.width >= meta.height ? cap : null, height: meta.height > meta.width ? cap : null } : null;

  let pipe = sharp(src, { limitInputPixels: false });
  if (resize) pipe = pipe.resize({ ...resize, withoutEnlargement: true, kernel: "lanczos3" });
  if (!keepAlpha) pipe = pipe.flatten({ background: "#ffffff" });

  pipe = LOSSLESS.has(name)
    ? pipe.webp({ lossless: true, effort: 6 })
    : pipe.webp({ quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true });

  const buf = await pipe.toBuffer();
  const oldSize = statSync(src).size;

  // A already-well-compressed JPEG can come out of WebP *larger*. Leave those alone —
  // next/image re-encodes them to AVIF per request anyway, so there is nothing to win.
  if (buf.length >= oldSize) {
    console.log(`skip  ${(oldSize / 1024).toFixed(0)}KB ${meta.width}x${meta.height} — WebP is not smaller: ${src.split("\\").join("/")}`);
    before += oldSize;
    after += oldSize;
    continue;
  }

  before += oldSize;
  after += buf.length;
  rows.push({
    file: src.split("\\").join("/"),
    from: `${(oldSize / 1024).toFixed(0)}KB ${meta.width}x${meta.height}`,
    to: `${(buf.length / 1024).toFixed(0)}KB ${resize ? (resize.width ?? Math.round((meta.width / meta.height) * cap)) + "x" + (resize.height ?? Math.round((meta.height / meta.width) * cap)) : `${meta.width}x${meta.height}`}`,
    saved: `${(100 - (buf.length / oldSize) * 100).toFixed(0)}%`,
  });

  if (WRITE) {
    // Write the encoded bytes as-is. Passing `buf` back through sharp would re-encode an
    // already-lossy WebP at sharp's default quality — a second generation loss for nothing.
    writeFileSync(out, buf);
    if (REPLACE && existsSync(out) && out !== src) unlinkSync(src);
  }
}

for (const r of rows) {
  console.log(`${r.saved.padStart(4)}  ${r.from.padEnd(22)} -> ${r.to.padEnd(20)} ${r.file}`);
}
console.log(
  `\n${rows.length} images  ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB  ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller)${WRITE ? "" : "   [dry run — pass --write]"}`,
);

/**
 * Builds the site icons from the brand logo.
 *
 * Two things make this less trivial than resizing the logo:
 *  1. `assets/logo.webp` is a 400x148 lockup — the wordmark is illegible at 32px, so we
 *     use only the emblem on the left, found by trimming the transparent margin.
 *  2. The emblem is cream on transparent, which disappears against a light tab strip.
 *     So it is composited onto the brand green (the same colour as `themeColor` and the
 *     navbar), which reads in both light and dark browser chrome.
 *
 * Writes app/icon.png, app/apple-icon.png and app/favicon.ico — all three are App Router
 * file conventions, so Next emits the <link rel> tags automatically.
 *
 * Usage: bun scripts/make-favicon.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "public/assets/logo.webp";
const GREEN = "#1c3816";
/**
 * Breathing room around the mark, as a fraction of the canvas. The mark is intricate, so
 * the small tiles give up their padding to keep as much detail as possible; only the
 * larger ones, where legibility is not at risk, get the full margin.
 */
const padFor = (size) => (size <= 16 ? 0.02 : size <= 32 ? 0.06 : 0.1);

/**
 * Find where the emblem ends and the wordmark begins, rather than hard-coding a column:
 * walk the alpha channel and take the first run of inked columns. A fixed crop silently
 * clipped a sliver of the "D" into the icon as two stray specks.
 */
async function emblemWidth() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const inked = (x) => {
    for (let y = 0; y < height; y++) if (data[(y * width + x) * channels + 3] > 2) return true;
    return false;
  };
  let x = 0;
  while (x < width && !inked(x)) x++; // leading transparent margin
  while (x < width && inked(x)) x++; // the emblem itself
  return x; // first transparent column after the emblem
}

const cut = await emblemWidth();
console.log(`emblem occupies the first ${cut}px of the lockup`);

// Two passes on purpose: sharp applies `trim` before `extract` within one pipeline, so
// trimming the lockup first would shrink the canvas and make the crop region overflow.
const meta = await sharp(SRC).metadata();
const cropped = await sharp(SRC).extract({ left: 0, top: 0, width: cut, height: meta.height }).toBuffer();
// Trim the transparent margin so the mark fills the tile as much as possible.
const emblem = await sharp(cropped).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });

console.log(`emblem cropped to ${emblem.info.width}x${emblem.info.height}`);

async function tile(size) {
  const inner = Math.round(size * (1 - padFor(size) * 2));
  const mark = await sharp(emblem.data)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: "lanczos3" })
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: GREEN } })
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Standalone icons. Next serves these directly at /icon.png and /apple-icon.png.
writeFileSync("app/icon.png", await tile(256));
writeFileSync("app/apple-icon.png", await tile(180));
console.log("wrote app/icon.png (256) and app/apple-icon.png (180)");

/**
 * favicon.ico, built by hand because sharp cannot write ICO. An ICO is a small directory
 * followed by image payloads, and modern browsers accept PNG payloads inside it, so each
 * entry is just one of the PNGs above.
 */
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(tile));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size === 256 ? 0 : size, 0); // width
  e.writeUInt8(size === 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette size — 0 for truecolour
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});

writeFileSync("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
console.log(`wrote app/favicon.ico (${sizes.join(", ")}px)`);

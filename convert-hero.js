/**
 * Convert the site hero image to web-optimized WebP + AVIF.
 *
 * Usage: node convert-hero.js [input.jpg]
 *
 * Outputs next to the input (default: navy-reef-trincomalee.jpg):
 *   - navy-reef-trincomalee.webp
 *   - navy-reef-trincomalee.avif
 *
 * Hero is shown at ~60vh cover — 2400px wide is enough for retina desktops
 * without shipping the full 5k source.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const INPUT = path.resolve(
  __dirname,
  process.argv[2] || 'navy-reef-trincomalee.jpg'
);
const BASE = INPUT.replace(/\.[^.]+$/, '');
// 1920px is enough for a 60vh cover hero on retina; coral detail stays sharp.
const MAX_WIDTH = 1920;

// Tuned for this busy reef photo: high-freq coral + fish. Overlay darkens
// the hero further, so we can lean a bit more aggressive on size.
const WEBP = { quality: 72, effort: 6, smartSubsample: true };
const AVIF = { quality: 48, effort: 6, chromaSubsampling: '4:2:0' };

function formatBytes(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

async function convert() {
  if (!fs.existsSync(INPUT)) {
    throw new Error(`Input not found: ${INPUT}`);
  }

  const meta = await sharp(INPUT).metadata();
  const inputSize = fs.statSync(INPUT).size;
  console.log(
    `Source: ${path.basename(INPUT)} — ${meta.width}x${meta.height}, ${formatBytes(inputSize)}`
  );

  const pipeline = () =>
    sharp(INPUT)
      .rotate() // honour EXIF orientation
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      });

  const webpPath = `${BASE}.webp`;
  const avifPath = `${BASE}.avif`;

  await pipeline().webp(WEBP).toFile(webpPath);
  await pipeline().avif(AVIF).toFile(avifPath);

  const webpSize = fs.statSync(webpPath).size;
  const avifSize = fs.statSync(avifPath).size;
  const webpMeta = await sharp(webpPath).metadata();
  const avifMeta = await sharp(avifPath).metadata();

  console.log(
    `WebP:   ${path.basename(webpPath)} — ${webpMeta.width}x${webpMeta.height}, ${formatBytes(webpSize)} (${((webpSize / inputSize) * 100).toFixed(0)}% of source)`
  );
  console.log(
    `AVIF:   ${path.basename(avifPath)} — ${avifMeta.width}x${avifMeta.height}, ${formatBytes(avifSize)} (${((avifSize / inputSize) * 100).toFixed(0)}% of source)`
  );
  console.log('\nUpload the .webp (and optionally .avif) to muhudu-images, then point CSS at them.');
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});

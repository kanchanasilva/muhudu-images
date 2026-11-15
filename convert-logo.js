/**
 * Convert the Muhudu wordmark to web-optimized WebP + AVIF.
 *
 * Usage: node convert-logo.js [input.png]
 *
 * Outputs next to the input (default: smallFullLogo.png):
 *   - smallFullLogo.webp
 *   - smallFullLogo.avif
 *
 * Largest CSS use is ~150–160px tall; 520px wide covers 2x retina.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const INPUT = path.resolve(__dirname, process.argv[2] || 'smallFullLogo.png');
const BASE = INPUT.replace(/\.[^.]+$/, '');
const MAX_WIDTH = 520;

const WEBP = { quality: 90, effort: 6, alphaQuality: 100 };
const AVIF = { quality: 60, effort: 6 };

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
    sharp(INPUT).resize({
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
  console.log('\nUpload the .webp and .avif to muhudu-images, then point CSS at them.');
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});

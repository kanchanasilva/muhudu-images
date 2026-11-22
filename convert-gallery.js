/**
 * Convert gallery site images (gallery.media_path) to WebP, then delete the source.
 *
 * Usage:
 *   node convert-gallery.js                  # all paths in gallery-convert-list.json
 *   node convert-gallery.js path/to/img.JPG  # one or more specific relative paths
 *   node convert-gallery.js --list gallery-variants-convert-list.json
 *   node convert-gallery.js --report out.json
 *   node convert-gallery.js --dry-run
 *   node convert-gallery.js --keep           # write .webp but keep originals
 *
 * Outputs next to each source, e.g.:
 *   navy-museum/00000-navy-museum-01.JPG  →  navy-museum/00000-navy-museum-01.webp
 *
 * Gallery full images are ~1000px; icons ~100px; thumbnails ~500px.
 * We honour EXIF and do not enlarge.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = __dirname;
const DEFAULT_LIST = path.join(ROOT, 'gallery-convert-list.json');
const DEFAULT_REPORT = path.join(ROOT, 'gallery-webp-conversion-report.json');

const MAX_WIDTH = 1600;
const WEBP = { quality: 80, effort: 6, smartSubsample: true, alphaQuality: 100 };

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const keepOriginals = args.includes('--keep');

function takeOption(flag) {
  const i = args.indexOf(flag);
  if (i === -1) return null;
  const value = args[i + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`${flag} requires a path argument`);
  }
  return value;
}

const listOpt = takeOption('--list');
const reportOpt = takeOption('--report');
const LIST_PATH = listOpt ? path.resolve(ROOT, listOpt) : DEFAULT_LIST;
const REPORT_JSON = reportOpt ? path.resolve(ROOT, reportOpt) : DEFAULT_REPORT;
const pathArgs = args.filter((a, i) => {
  if (a.startsWith('--')) return false;
  const prev = args[i - 1];
  if (prev === '--list' || prev === '--report') return false;
  return true;
});

function formatBytes(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

function loadList() {
  if (pathArgs.length) return pathArgs;
  if (!fs.existsSync(LIST_PATH)) {
    throw new Error(
      `No paths given and list not found: ${LIST_PATH}\n` +
        'Pass relative media_path args, or create a convert list JSON'
    );
  }
  const list = JSON.parse(fs.readFileSync(LIST_PATH, 'utf8'));
  if (!Array.isArray(list) || !list.length) {
    throw new Error(`Empty list in ${LIST_PATH}`);
  }
  return list.map((item) => (typeof item === 'string' ? item : item.media_path));
}

/** Resolve path on disk; gallery paths may use .JPG while disk matches case-insensitively. */
function resolveSource(relPath) {
  const exact = path.join(ROOT, relPath);
  if (fs.existsSync(exact)) return exact;

  const dir = path.join(ROOT, path.dirname(relPath));
  const want = path.basename(relPath).toLowerCase();
  if (!fs.existsSync(dir)) return null;
  const match = fs.readdirSync(dir).find((f) => f.toLowerCase() === want);
  return match ? path.join(dir, match) : null;
}

function toWebpRel(mediaPath) {
  return mediaPath.replace(/\.[^.]+$/, '.webp');
}

async function convertOne(mediaPath) {
  const source = resolveSource(mediaPath);
  if (!source) {
    return { media_path: mediaPath, status: 'missing', error: 'file not found under ./images' };
  }

  const base = source.replace(/\.[^.]+$/, '');
  const webpPath = `${base}.webp`;
  const webpRel = toWebpRel(mediaPath);
  const inputSize = fs.statSync(source).size;
  const meta = await sharp(source).metadata();

  if (dryRun) {
    return {
      media_path: mediaPath,
      source: path.relative(ROOT, source),
      webp_path: webpRel,
      status: 'dry-run',
      width: meta.width,
      height: meta.height,
      input_bytes: inputSize,
    };
  }

  await sharp(source)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp(WEBP)
    .toFile(webpPath);

  const outSize = fs.statSync(webpPath).size;
  const outMeta = await sharp(webpPath).metadata();

  if (!keepOriginals) {
    fs.unlinkSync(source);
  }

  return {
    media_path: mediaPath,
    source: path.relative(ROOT, source),
    webp_path: webpRel,
    status: keepOriginals ? 'converted-kept' : 'converted-deleted',
    width: meta.width,
    height: meta.height,
    out_width: outMeta.width,
    out_height: outMeta.height,
    input_bytes: inputSize,
    output_bytes: outSize,
    ratio: outSize / inputSize,
  };
}

async function main() {
  const list = loadList();
  console.log(
    `Converting ${list.length} gallery image(s)` +
      (dryRun ? ' [dry-run]' : '') +
      (keepOriginals ? ' [keep originals]' : '') +
      '…\n'
  );

  const results = [];
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < list.length; i++) {
    const mediaPath = list[i];
    const n = `[${i + 1}/${list.length}]`;
    try {
      const result = await convertOne(mediaPath);
      results.push(result);
      if (result.status === 'missing') {
        fail++;
        console.error(`${n} MISSING  ${mediaPath}`);
      } else if (result.status === 'dry-run') {
        ok++;
        console.log(
          `${n} would convert  ${result.source}  (${result.width}x${result.height}, ${formatBytes(result.input_bytes)}) → ${result.webp_path}`
        );
      } else {
        ok++;
        console.log(
          `${n} ${result.webp_path}  ${result.width}x${result.height}  ` +
            `${formatBytes(result.input_bytes)} → ${formatBytes(result.output_bytes)}  ` +
            `(${(result.ratio * 100).toFixed(0)}%)${keepOriginals ? '' : '  deleted source'}`
        );
      }
    } catch (err) {
      fail++;
      results.push({ media_path: mediaPath, status: 'error', error: String(err.message || err) });
      console.error(`${n} ERROR  ${mediaPath}: ${err.message || err}`);
    }
  }

  const report = {
    generated_at: new Date().toISOString(),
    dry_run: dryRun,
    keep_originals: keepOriginals,
    total: list.length,
    ok,
    fail,
    max_width: MAX_WIDTH,
    webp: WEBP,
    results,
  };
  fs.writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2));
  console.log(`\nDone: ${ok} ok, ${fail} failed. Report: ${path.basename(REPORT_JSON)}`);
  if (fail) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

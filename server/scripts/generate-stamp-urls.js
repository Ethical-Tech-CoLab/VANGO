#!/usr/bin/env node
/*
 * Regenerate signed stamp deep links (the URLs that go inside printed QR codes).
 *
 * Usage, from the server/ directory:
 *
 *   node scripts/generate-stamp-urls.js                    # all catalog codes, no expiry
 *   node scripts/generate-stamp-urls.js DAVID01 BURA01     # only these codes
 *   node scripts/generate-stamp-urls.js --days 180         # tokens expire in 180 days
 *   node scripts/generate-stamp-urls.js --base https://example.org/VANGO/
 *   node scripts/generate-stamp-urls.js --format markdown  # table for docs/stamp-urls.md
 *
 * Requires STAMP_SIGNING_SECRET (>= 32 chars) in server/.env or the environment.
 * Generate one with:  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 *
 * The QR *images* still have to be re-rendered from the printed URLs with any
 * QR generator, e.g.:  npx qrcode-terminal "<url>"   or   qrencode -o DAVID01.png "<url>"
 * Printing new QR codes is required before ALLOW_LEGACY_STAMP_CODES can be set
 * to false — old QR codes encode bare, unsigned codes.
 */

try {
  require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
} catch {
  // dotenv is optional here — the secret can also come from the environment
}
const { CODES, CATALOG, normalizeCode } = require('../catalog');
const { signStampToken } = require('../stampToken');

const argv = process.argv.slice(2);
let base = 'https://ethical-tech-colab.github.io/VANGO/';
let days = 0;
let format = 'plain';
const codes = [];

for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg === '--base') base = argv[++i];
  else if (arg === '--days') days = Number(argv[++i]);
  else if (arg === '--format') format = argv[++i];
  else if (arg.startsWith('--')) {
    console.error(`Unknown option: ${arg}`);
    process.exit(1);
  } else codes.push(normalizeCode(arg));
}

const selected = codes.length ? codes : CODES;
const unknown = selected.filter((c) => !CATALOG[c]);
if (unknown.length) {
  console.error(`Not in the catalog: ${unknown.join(', ')}`);
  process.exit(1);
}

const exp = days > 0 ? Math.floor(Date.now() / 1000) + days * 86400 : 0;

const rows = selected.map((code) => {
  const token = signStampToken(code, { exp });
  return { code, token, url: `${base}?stamp=${encodeURIComponent(token)}` };
});

if (format === 'markdown') {
  console.log('| Code | Title | Signed deep link |');
  console.log('|---|---|---|');
  for (const { code, url } of rows) {
    console.log(`| \`${code}\` | ${CATALOG[code].title} | ${url} |`);
  }
} else {
  for (const { code, url } of rows) console.log(`${code}\t${url}`);
}

console.error(
  exp
    ? `\nSigned ${rows.length} stamp URL(s); tokens expire ${new Date(exp * 1000).toISOString()}.`
    : `\nSigned ${rows.length} stamp URL(s) with no expiry.`
);
console.error(
  'Re-render the QR images from these URLs and reprint the signage before setting ALLOW_LEGACY_STAMP_CODES=false.'
);

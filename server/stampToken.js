/*
 * Signed stamp tokens.
 *
 * A bare stamp code (`DAVID01`) is public — it is printed in docs/stamp-urls.md
 * and on every stamp page — so accepting one as proof of attendance lets anyone
 * forge a stamp from anywhere. A stamp token is an HMAC-SHA256 signature over
 * `code | nonce | exp` produced with a server-held secret, so only the operator
 * can mint redeemable links.
 *
 * Wire format (URL/QR safe, no padding):
 *
 *   v1.<CODE>.<NONCE>.<EXP>.<SIG>
 *
 *   CODE  normalized catalog code, e.g. DAVID01
 *   NONCE base64url random, makes each minted token distinct + revocable
 *   EXP   unix seconds, or 0 for "no expiry" (printed signage that stays up)
 *   SIG   base64url HMAC-SHA256(secret, "v1.CODE.NONCE.EXP")
 *
 * Only Node's built-in `crypto` is used.
 */

const crypto = require('crypto');
const { normalizeCode } = require('./catalog');

const TOKEN_VERSION = 'v1';
const MIN_SECRET_LENGTH = 32;

function b64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

/** The signing secret, or null when it is unset / too short to be useful. */
function getSecret() {
  const secret = process.env.STAMP_SIGNING_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) return null;
  return secret;
}

/**
 * Whether unsigned, legacy stamp codes are still redeemable.
 * Defaults to TRUE so that already-printed QR codes keep working; set
 * ALLOW_LEGACY_STAMP_CODES=false to enforce signed tokens (requires reprinting).
 */
function legacyCodesAllowed() {
  const raw = process.env.ALLOW_LEGACY_STAMP_CODES;
  if (raw === undefined || raw === '') return true;
  return !['false', '0', 'no', 'off'].includes(String(raw).trim().toLowerCase());
}

function signedPayload(code, nonce, exp) {
  return `${TOKEN_VERSION}.${code}.${nonce}.${exp}`;
}

function hmac(secret, payload) {
  return b64url(crypto.createHmac('sha256', secret).update(payload).digest());
}

/**
 * Mint a signed stamp token.
 * @param {string} code catalog code
 * @param {{nonce?: string, exp?: number, secret?: string}} [opts] exp is unix seconds; 0 = never expires
 */
function signStampToken(code, opts = {}) {
  const secret = opts.secret || getSecret();
  if (!secret) {
    throw new Error(
      `STAMP_SIGNING_SECRET is not set (or is shorter than ${MIN_SECRET_LENGTH} chars); cannot sign stamp tokens`
    );
  }
  const normalized = normalizeCode(code);
  const nonce = opts.nonce || b64url(crypto.randomBytes(9));
  const exp = Number(opts.exp) || 0;
  const payload = signedPayload(normalized, nonce, exp);
  return `${payload}.${hmac(secret, payload)}`;
}

/**
 * Verify a signed stamp token.
 * @returns {{ok: true, code: string, nonce: string, exp: number} | {ok: false, reason: string}}
 */
function verifyStampToken(token, opts = {}) {
  const secret = opts.secret || getSecret();
  if (!secret) return { ok: false, reason: 'no_secret' };
  if (typeof token !== 'string' || !token) return { ok: false, reason: 'malformed' };

  const parts = token.trim().split('.');
  if (parts.length !== 5) return { ok: false, reason: 'malformed' };

  const [version, rawCode, nonce, rawExp, sig] = parts;
  if (version !== TOKEN_VERSION) return { ok: false, reason: 'bad_version' };
  if (!rawCode || !nonce || !sig) return { ok: false, reason: 'malformed' };
  if (!/^\d+$/.test(rawExp)) return { ok: false, reason: 'malformed' };

  const code = normalizeCode(rawCode);
  const exp = Number(rawExp);
  const expected = hmac(secret, signedPayload(code, nonce, exp));

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: 'bad_signature' };
  }

  const nowSeconds = Math.floor((opts.now || Date.now()) / 1000);
  if (exp !== 0 && nowSeconds > exp) return { ok: false, reason: 'expired' };

  return { ok: true, code, nonce, exp };
}

/**
 * Fail fast at boot when the configuration cannot possibly be secure.
 * Called from server/index.js.
 */
function assertStampConfig() {
  const secret = getSecret();
  if (!secret && !legacyCodesAllowed()) {
    throw new Error(
      'ALLOW_LEGACY_STAMP_CODES=false requires STAMP_SIGNING_SECRET ' +
        `(at least ${MIN_SECRET_LENGTH} characters). Refusing to start: no stamp could be redeemed.`
    );
  }
  if (!secret) {
    console.warn(
      '[stamps] STAMP_SIGNING_SECRET is unset or too short — signed stamp tokens are disabled ' +
        'and only legacy unsigned codes will be accepted. Stamps are forgeable in this configuration.'
    );
  } else if (legacyCodesAllowed()) {
    console.warn(
      '[stamps] ALLOW_LEGACY_STAMP_CODES is enabled — unsigned stamp codes are still redeemable ' +
        'so that already-printed QR codes keep working. Reprint signed QR codes, then set ' +
        'ALLOW_LEGACY_STAMP_CODES=false.'
    );
  }
}

module.exports = {
  TOKEN_VERSION,
  MIN_SECRET_LENGTH,
  getSecret,
  legacyCodesAllowed,
  signStampToken,
  verifyStampToken,
  assertStampConfig,
};

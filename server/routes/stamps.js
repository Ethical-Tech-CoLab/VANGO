const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/auth');
const { normalizeCode, isValidCode } = require('../catalog');
const { verifyStampToken, legacyCodesAllowed, getSecret } = require('../stampToken');

const router = express.Router();
router.use(requireAuth);

// GET /stamps  — return all stamps for the current user
router.get('/', (req, res) => {
  const stamps = db.prepare(
    'SELECT code, date_collected FROM stamps WHERE user_id = ? ORDER BY created_at DESC'
  ).all(req.user.sub);
  res.json(stamps);
});

/*
 * Resolve which stamp a request is asking for.
 *
 * Preferred: `token` — an HMAC-signed stamp token minted by the operator, which
 * actually proves the scanned signage came from us.
 * Legacy: `code` — a bare, publicly-known code. Forgeable by anyone who reads
 * docs/stamp-urls.md, so it is only accepted while ALLOW_LEGACY_STAMP_CODES is
 * on (the default, so already-printed QR codes keep working).
 */
function resolveStampRequest(body, userId) {
  const { token, code } = body || {};

  if (token) {
    const result = verifyStampToken(token);
    if (!result.ok) {
      return {
        error: result.reason === 'expired' ? 'Stamp token has expired' : 'Invalid stamp token',
        status: 400,
      };
    }
    return { code: result.code, nonce: result.nonce };
  }

  if (code) {
    if (!legacyCodesAllowed()) {
      return { error: 'A signed stamp token is required', status: 400 };
    }
    const normalized = normalizeCode(code);
    console.warn(
      `[stamps] legacy unsigned stamp code accepted (user=${userId}, code=${normalized})` +
        (getSecret()
          ? ' — reprint signed QR codes, then set ALLOW_LEGACY_STAMP_CODES=false'
          : ' — STAMP_SIGNING_SECRET is not configured')
    );
    return { code: normalized, nonce: null };
  }

  return { error: 'token or code required', status: 400 };
}

// POST /stamps  — add a stamp (idempotent: same code → 409)
router.post('/', (req, res) => {
  const resolved = resolveStampRequest(req.body, req.user.sub);
  if (resolved.error) return res.status(resolved.status).json({ error: resolved.error });

  const { code, nonce } = resolved;

  // The catalog is the allowlist: never mint a stamp for an artwork that does
  // not exist, even for an authenticated user.
  if (!isValidCode(code)) return res.status(400).json({ error: 'Unknown stamp code' });

  // Burn the nonce per user so a signed token cannot be replayed by the same
  // account (e.g. after deleting the stamp). Shared printed signage still works:
  // every visitor is a different user_id.
  if (nonce) {
    const used = db.prepare(
      'SELECT 1 FROM stamp_token_uses WHERE user_id = ? AND nonce = ?'
    ).get(req.user.sub, nonce);
    if (used) return res.status(409).json({ error: 'Stamp token already used' });
  }

  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  try {
    db.prepare(
      'INSERT INTO stamps (user_id, code, date_collected, created_at) VALUES (?, ?, ?, ?)'
    ).run(req.user.sub, code, today, now);
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Stamp already collected' });
    }
    throw err;
  }

  if (nonce) {
    try {
      db.prepare(
        'INSERT INTO stamp_token_uses (user_id, nonce, used_at) VALUES (?, ?, ?)'
      ).run(req.user.sub, nonce, now);
    } catch (err) {
      if (!err.message.includes('UNIQUE')) throw err;
    }
  }

  res.status(201).json({ code, date_collected: today });
});

// DELETE /stamps/:code
router.delete('/:code', (req, res) => {
  const normalized = normalizeCode(req.params.code);
  const result = db.prepare(
    'DELETE FROM stamps WHERE user_id = ? AND code = ?'
  ).run(req.user.sub, normalized);
  if (result.changes === 0) return res.status(404).json({ error: 'Stamp not found' });
  res.status(204).end();
});

module.exports = router;

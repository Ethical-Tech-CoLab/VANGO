const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const MAX_NAME_LENGTH = 80;

// ~512 KB of image data once base64 is decoded. The client downscales avatars
// before upload, so this is generous for a profile photo and still bounds how
// much a single account can store.
const MAX_AVATAR_BYTES = 512 * 1024;
const MAX_AVATAR_CHARS = Math.ceil(MAX_AVATAR_BYTES / 3) * 4 + 64; // + data URL prefix

const AVATAR_DATA_URL = /^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/]+={0,2})$/;

/** Decoded byte length of a base64 payload, without allocating a Buffer. */
function base64Bytes(b64) {
  const padding = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0;
  return (b64.length / 4) * 3 - padding;
}

/**
 * `avatar_data` is rendered as an <img src>, so it must be a real image data
 * URL and not an arbitrary (or unbounded) string.
 * @returns {{ok: true, value: string|null} | {ok: false, error: string}}
 */
function validateAvatar(raw) {
  if (raw === null || raw === '') return { ok: true, value: null };
  if (typeof raw !== 'string') return { ok: false, error: 'avatar_data must be a string or null' };
  if (raw.length > MAX_AVATAR_CHARS) {
    return { ok: false, error: `Avatar image must be under ${Math.floor(MAX_AVATAR_BYTES / 1024)} KB` };
  }

  const match = AVATAR_DATA_URL.exec(raw);
  if (!match) {
    return { ok: false, error: 'avatar_data must be a base64 PNG, JPEG or WebP data URL' };
  }
  if (match[2].length % 4 !== 0) return { ok: false, error: 'avatar_data is not valid base64' };
  if (base64Bytes(match[2]) > MAX_AVATAR_BYTES) {
    return { ok: false, error: `Avatar image must be under ${Math.floor(MAX_AVATAR_BYTES / 1024)} KB` };
  }
  return { ok: true, value: raw };
}

/** @returns {{ok: true, value: string} | {ok: false, error: string}} */
function validateName(raw) {
  if (typeof raw !== 'string') return { ok: false, error: 'name must be a string' };
  const value = raw.trim();
  if (value.length > MAX_NAME_LENGTH) {
    return { ok: false, error: `name must be ${MAX_NAME_LENGTH} characters or fewer` };
  }
  return { ok: true, value };
}

// GET /me
router.get('/', (req, res) => {
  const user = db.prepare(
    'SELECT id, email, name, avatar_data, member_since, passport_number FROM users WHERE id = ?'
  ).get(req.user.sub);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// PUT /me
router.put('/', (req, res) => {
  const { name, avatar_data } = req.body || {};
  const fields = [];
  const values = [];

  if (name !== undefined) {
    const checked = validateName(name);
    if (!checked.ok) return res.status(400).json({ error: checked.error });
    fields.push('name = ?');
    values.push(checked.value);
  }
  if (avatar_data !== undefined) {
    const checked = validateAvatar(avatar_data);
    if (!checked.ok) return res.status(400).json({ error: checked.error });
    fields.push('avatar_data = ?');
    values.push(checked.value);
  }
  if (!fields.length) return res.status(400).json({ error: 'Nothing to update' });

  values.push(req.user.sub);
  db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);

  const user = db.prepare(
    'SELECT id, email, name, avatar_data, member_since, passport_number FROM users WHERE id = ?'
  ).get(req.user.sub);
  res.json(user);
});

module.exports = router;
// Exposed for tests; the app itself only mounts the router.
module.exports.validateAvatar = validateAvatar;
module.exports.validateName = validateName;

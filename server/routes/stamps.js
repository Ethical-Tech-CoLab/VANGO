const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

// GET /stamps  — return all stamps for the current user
router.get('/', (req, res) => {
  const stamps = db.prepare(
    'SELECT code, date_collected FROM stamps WHERE user_id = ? ORDER BY created_at DESC'
  ).all(req.user.sub);
  res.json(stamps);
});

// POST /stamps  — add a stamp (idempotent: same code → 409)
router.post('/', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'code required' });

  const normalized = code.toUpperCase().replace(/[\s-]/g, '');
  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  try {
    db.prepare(
      'INSERT INTO stamps (user_id, code, date_collected, created_at) VALUES (?, ?, ?, ?)'
    ).run(req.user.sub, normalized, today, now);
    res.status(201).json({ code: normalized, date_collected: today });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Stamp already collected' });
    }
    throw err;
  }
});

// DELETE /stamps/:code
router.delete('/:code', (req, res) => {
  const normalized = req.params.code.toUpperCase().replace(/[\s-]/g, '');
  const result = db.prepare(
    'DELETE FROM stamps WHERE user_id = ? AND code = ?'
  ).run(req.user.sub, normalized);
  if (result.changes === 0) return res.status(404).json({ error: 'Stamp not found' });
  res.status(204).end();
});

module.exports = router;

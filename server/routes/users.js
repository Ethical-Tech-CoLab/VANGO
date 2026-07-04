const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

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
  const { name, avatar_data } = req.body;
  const fields = [];
  const values = [];

  if (name !== undefined) { fields.push('name = ?'); values.push(name); }
  if (avatar_data !== undefined) { fields.push('avatar_data = ?'); values.push(avatar_data); }
  if (!fields.length) return res.status(400).json({ error: 'Nothing to update' });

  values.push(req.user.sub);
  db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);

  const user = db.prepare(
    'SELECT id, email, name, avatar_data, member_since, passport_number FROM users WHERE id = ?'
  ).get(req.user.sub);
  res.json(user);
});

module.exports = router;

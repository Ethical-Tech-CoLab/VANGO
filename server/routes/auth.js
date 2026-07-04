const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

function makePassportNumber() {
  const alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const prefix = Array.from({ length: 3 }, () => alpha[Math.floor(Math.random() * alpha.length)]).join('');
  const digits = String(Math.floor(100000 + Math.random() * 900000));
  return `${prefix}${digits}`;
}

function issueToken(userId) {
  return jwt.sign({ sub: Number(userId) }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase().trim());
  if (existing) return res.status(409).json({ error: 'An account with that email already exists' });

  const hash = await bcrypt.hash(password, 12);
  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  const result = db.prepare(`
    INSERT INTO users (email, password_hash, name, member_since, passport_number, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(email.toLowerCase().trim(), hash, name || '', today, makePassportNumber(), now);

  const user = db.prepare(
    'SELECT id, email, name, member_since, passport_number FROM users WHERE id = ?'
  ).get(Number(result.lastInsertRowid));

  res.status(201).json({ token: issueToken(user.id), user });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid email or password' });

  const { password_hash, ...safeUser } = user;
  res.json({ token: issueToken(user.id), user: safeUser });
});

module.exports = router;

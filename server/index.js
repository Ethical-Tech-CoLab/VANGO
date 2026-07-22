require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { assertStampConfig } = require('./stampToken');
const { assertJwtConfig } = require('./jwt');
const rateLimit = require('./middleware/rateLimit');
const securityHeaders = require('./middleware/securityHeaders');

assertJwtConfig();
assertStampConfig();

const app = express();
app.disable('x-powered-by');

app.use(securityHeaders);
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));

// 1mb comfortably fits the avatar data URL cap enforced in routes/users.js
// (MAX_AVATAR_CHARS, ~700kb) plus the rest of the body. The previous 5mb limit
// let any authenticated client push multi-megabyte blobs into the database.
app.use(express.json({ limit: '1mb' }));

// Brute-force / spam protection on the credential endpoints.
app.use(
  '/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: Number(process.env.AUTH_RATE_LIMIT_MAX) || 20,
    message: 'Too many authentication attempts, please try again later',
  })
);

app.use('/auth', require('./routes/auth'));
app.use('/me', require('./routes/users'));
app.use('/stamps', require('./routes/stamps'));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err && (err.type === 'entity.too.large' || err.status === 413)) {
    return res.status(413).json({ error: 'Request body too large' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`VANGO API running on http://localhost:${PORT}`));

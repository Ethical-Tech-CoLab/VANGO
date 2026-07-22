require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { assertStampConfig } = require('./stampToken');

assertStampConfig();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '5mb' })); // 5mb allows avatar base64 uploads

app.use('/auth', require('./routes/auth'));
app.use('/me', require('./routes/users'));
app.use('/stamps', require('./routes/stamps'));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`VANGO API running on http://localhost:${PORT}`));

const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'vango.db'));

db.exec(`PRAGMA journal_mode = WAL`);
db.exec(`PRAGMA foreign_keys = ON`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    email           TEXT    UNIQUE NOT NULL,
    password_hash   TEXT    NOT NULL,
    name            TEXT    NOT NULL DEFAULT '',
    avatar_data     TEXT    DEFAULT NULL,
    member_since    TEXT    NOT NULL,
    passport_number TEXT    NOT NULL,
    created_at      TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS stamps (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code           TEXT    NOT NULL,
    date_collected TEXT    NOT NULL,
    created_at     TEXT    NOT NULL,
    UNIQUE(user_id, code)
  );

  -- Burned nonces from redeemed signed stamp tokens, so a token cannot be
  -- replayed by the same account. Shared printed signage is unaffected:
  -- each visitor redeems under their own user_id.
  CREATE TABLE IF NOT EXISTS stamp_token_uses (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    nonce   TEXT    NOT NULL,
    used_at TEXT    NOT NULL,
    PRIMARY KEY (user_id, nonce)
  );
`);

module.exports = db;

/*
 * Minimal in-process rate limiter (fixed window per client).
 *
 * `/auth/login` and `/auth/register` previously accepted unlimited attempts,
 * which allows password brute-forcing and registration spam. This is a
 * dependency-free stand-in for `express-rate-limit`: state lives in memory, so
 * it protects a single process only. Put a shared limiter in front (or swap in
 * a store-backed limiter) if the API is ever run multi-process.
 */

/**
 * @param {{windowMs: number, max: number, message?: string}} options
 * @returns {import('express').RequestHandler}
 */
function rateLimit({ windowMs, max, message = 'Too many requests, please try again later' }) {
  /** @type {Map<string, {count: number, reset: number}>} */
  const hits = new Map();
  let lastSweep = 0;

  function sweep(now) {
    if (now - lastSweep < windowMs) return;
    lastSweep = now;
    for (const [key, entry] of hits) {
      if (now >= entry.reset) hits.delete(key);
    }
  }

  return function rateLimiter(req, res, next) {
    const now = Date.now();
    sweep(now);

    // req.ip honours the app's `trust proxy` setting; behind a reverse proxy set
    // it (app.set('trust proxy', 1)) or every client collapses into one bucket.
    const key = req.ip || req.socket?.remoteAddress || 'unknown';

    let entry = hits.get(key);
    if (!entry || now >= entry.reset) {
      entry = { count: 0, reset: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;

    const resetSeconds = Math.max(0, Math.ceil((entry.reset - now) / 1000));
    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(Math.max(0, max - entry.count)));
    res.setHeader('RateLimit-Reset', String(resetSeconds));

    if (entry.count > max) {
      res.setHeader('Retry-After', String(resetSeconds));
      return res.status(429).json({ error: message });
    }
    next();
  };
}

module.exports = rateLimit;

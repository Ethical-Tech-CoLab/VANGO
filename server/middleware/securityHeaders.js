/*
 * Baseline security response headers (the subset of `helmet` that applies to a
 * JSON-only API), implemented without adding a dependency.
 *
 * The API never serves HTML, so a `default-src 'none'` policy plus a framing
 * ban costs nothing and neutralises content-sniffing / clickjacking tricks on
 * any response an attacker manages to get rendered.
 */

module.exports = function securityHeaders(req, res, next) {
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Origin-Agent-Cluster', '?1');
  res.setHeader('X-DNS-Prefetch-Control', 'off');

  // Only meaningful (and only honoured) over HTTPS; skip it on local http.
  const proto = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
  if (String(proto).split(',')[0].trim() === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  }

  next();
};

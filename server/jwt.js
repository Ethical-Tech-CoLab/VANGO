/*
 * JWT signing configuration.
 *
 * Both the signer (routes/auth.js) and the verifier (middleware/auth.js) used to
 * read `process.env.JWT_SECRET` directly with no presence or strength check. If
 * it was unset, `jwt.sign` threw at request time and `jwt.verify` rejected every
 * token — a silent, hard-to-diagnose failure — and a short or placeholder secret
 * would let anyone forge a session token. Resolve and validate it once, at boot.
 */

const MIN_SECRET_LENGTH = 32;

// Shipped in .env.example; if it reaches a running server the secret is public.
const PLACEHOLDER_SECRETS = new Set(['change_this_to_a_long_random_string']);

const GENERATE_HINT =
  'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"';

/** @returns {string} the validated secret; throws if it is unusable. */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(`JWT_SECRET is not set. ${GENERATE_HINT}`);
  }
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters (got ${secret.length}). ${GENERATE_HINT}`
    );
  }
  if (PLACEHOLDER_SECRETS.has(secret)) {
    throw new Error(`JWT_SECRET is still the example placeholder value. ${GENERATE_HINT}`);
  }
  return secret;
}

/** Fail fast at boot rather than issuing or accepting tokens signed with a bad key. */
function assertJwtConfig() {
  getJwtSecret();
}

module.exports = { MIN_SECRET_LENGTH, getJwtSecret, assertJwtConfig };

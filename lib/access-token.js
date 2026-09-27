const crypto = require('crypto');

// A token is "<productId>.<expiresAtMs>.<signature>". The signature is an
// HMAC over productId+expiry using your Paystack secret key, so a token
// can't be forged or edited without knowing that key.
function createAccessToken(productId, expiresAtMs, secret) {
  const sig = crypto.createHmac('sha256', secret).update(`${productId}.${expiresAtMs}`).digest('hex');
  return `${productId}.${expiresAtMs}.${sig}`;
}

// Returns null for a malformed/forged token, or { productId, expired } for
// a well-signed one (expired: true if the expiry has passed).
function parseAccessToken(token, secret) {
  const parts = (token || '').split('.');
  if (parts.length !== 3) return null;
  const [productId, expStr, sig] = parts;

  const expected = crypto.createHmac('sha256', secret).update(`${productId}.${expStr}`).digest('hex');
  if (sig !== expected) return null;

  return { productId, expired: Date.now() > Number(expStr) };
}

module.exports = { createAccessToken, parseAccessToken };

const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-secret-change-in-production';

/**
 * Generate HMAC-SHA256 signature using Web Crypto API (Edge Runtime compatible).
 */
async function hmacSign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Sign cookie data with HMAC-SHA256 to prevent tampering.
 * Format: base64(JSON) + "." + hmac(base64JSON, secret)
 */
export async function signCookie(data: object, secret: string = AUTH_SECRET): Promise<string> {
  const payload = btoa(JSON.stringify(data));
  const signature = await hmacSign(payload, secret);
  return `${payload}.${signature}`;
}

/**
 * Verify and parse a signed cookie value.
 * Returns the parsed object if the signature is valid, null otherwise.
 */
export async function verifyCookie(cookieValue: string, secret: string = AUTH_SECRET): Promise<object | null> {
  if (!cookieValue) return null;

  const dotIndex = cookieValue.lastIndexOf('.');
  if (dotIndex === -1) return null;

  const payload = cookieValue.slice(0, dotIndex);
  const signature = cookieValue.slice(dotIndex + 1);

  const expectedSignature = await hmacSign(payload, secret);

  // Constant-time comparison
  if (signature.length !== expectedSignature.length) return null;

  let mismatch = 0;
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }
  if (mismatch !== 0) return null;

  try {
    const json = atob(payload);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

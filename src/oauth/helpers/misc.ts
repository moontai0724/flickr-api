import { createHmac, randomBytes } from "node:crypto";

/**
 * Returns the HMAC-SHA1 digest of `text` and `key` in base64 encoding.
 * @see https://oauth.net/core/1.0a/#rfc.section.9.2
 */
export function hmac(text: string, key: string) {
  return createHmac("sha1", key).update(text).digest("base64");
}

/**
 * Returns epoch timestamp string in seconds.
 * @see https://oauth.net/core/1.0a/#nonce
 */
export function epochTimestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

/**
 * Generates a random string for validating requests.
 * @see https://oauth.net/core/1.0a/#nonce
 */
export function nonce() {
  return randomBytes(32).toString("base64");
}

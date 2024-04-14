/**
 * Encode a string in the RFC 3986 format.
 *
 * @param from The string to encode.
 */
// from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#encoding_for_rfc3986
export function encodeRFC3986URIComponent(from: string) {
  return encodeURIComponent(from).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/**
 * Encodes each element of `arr` and joins them with an '&'.
 * @see https://oauth.net/core/1.0a/#rfc.section.9.1.3
 * @see https://oauth.net/core/1.0a/#encoding_parameters
 */
export function joinEncodedRFC3986URIComponent(arr: string[]) {
  return arr.map(encodeRFC3986URIComponent).sort().join("&");
}

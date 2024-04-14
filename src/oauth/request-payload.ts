import {
  type OAuthConsumerCredential,
  type OAuthUserCredential,
} from "./credential";
import {
  encodeRFC3986URIComponent,
  epochTimestamp,
  hmac,
  nonce,
} from "./helpers";

export interface OAuthCredentials
  extends OAuthConsumerCredential,
    Partial<OAuthUserCredential> {}

/**
 * The signature method is always HMAC-SHA1.
 * @see https://oauth.net/core/1.0a/#rfc.section.9.2
 */
const signatureMethod = "HMAC-SHA1";

/**
 * The version is always 1.0.
 */
const version = "1.0";

export class RequestPayload extends URLSearchParams {
  private setBasicPayload() {
    this.set("oauth_nonce", nonce());
    this.set("oauth_timestamp", epochTimestamp());
    this.set("oauth_signature_method", signatureMethod);
    this.set("oauth_version", version);
  }

  private getBaseString(method: string, baseUrl: string) {
    this.setBasicPayload();

    return [method.toUpperCase(), baseUrl, this.toString()]
      .map(encodeRFC3986URIComponent)
      .join("&");
  }

  // eslint-disable-next-line class-methods-use-this
  private getSingingKey(consumerSecret: string, tokenSecret: string = "") {
    return [consumerSecret, tokenSecret]
      .map(encodeRFC3986URIComponent)
      .join("&");
  }

  private calculateSignature(
    method: string,
    baseUrl: string,
    tokens: OAuthCredentials,
  ) {
    const baseString = this.getBaseString(method, baseUrl);
    const key = this.getSingingKey(
      tokens.consumerSecret,
      tokens.oauthTokenSecret,
    );

    return hmac(baseString, key);
  }

  /**
   * @see https://www.flickr.com/services/api/auth.oauth.html#signing
   */
  sign(method: string, baseUrl: string, tokens: OAuthCredentials): void {
    this.delete("oauth_signature"); // remove any existing signature
    this.setBasicPayload();
    if (tokens.oauthToken) {
      this.set("oauth_token", tokens.oauthToken);
    }

    const signature = this.calculateSignature(method, baseUrl, tokens);

    this.append("oauth_signature", signature);
  }

  toString(): string {
    return Array.from(this.entries())
      .map(([key, value]) => `${key}=${value}`)
      .map(encodeRFC3986URIComponent)
      .sort()
      .join("&");
  }

  toFormData(): FormData {
    const formData = new FormData();

    Object.entries(this).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }
}

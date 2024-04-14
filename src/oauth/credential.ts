/**
 * Consumer (a.k.a. your app) Credential.
 * @see https://www.flickr.com/services/apps/by/me
 */
export interface OAuthConsumerCredential {
  consumerKey: string;
  consumerSecret: string;
}

/**
 * OAuth (of a user, a.k.a. the user who uses your app) Credential.
 *
 * This token is obtained when they authorize your app to access their account.
 *
 * @see https://www.flickr.com/services/api/auth.oauth.html#access_token
 */
export interface OAuthUserCredential {
  oauthToken: string;
  oauthTokenSecret: string;
}

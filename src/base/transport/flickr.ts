import {
  type OAuthConsumerCredential,
  type OAuthCredentials,
  type OAuthUserCredential,
  RequestPayload,
} from "oauth";

import type { Transport, TransportRequestOptions } from "./types";

export interface FlickrAPIResponse {
  stat: "ok" | "fail";
}

export interface FailedResponse extends FlickrAPIResponse {
  code: number;
  message: string;
  stat: "fail";
}

export interface FlickrTransportOptions
  extends Partial<OAuthConsumerCredential>,
    Partial<OAuthUserCredential> {
  /**
   * Your Flickr API key, a.k.a. consumer key.
   */
  consumerKey: string;
}

async function fetchJson<R>(...args: Parameters<typeof fetch>): Promise<R> {
  const response = await fetch(...args);
  const data = await response.json();

  if (data.stat !== "ok") {
    throw new Error(data.message);
  }

  return data;
}

export class FlickrTransport implements Transport {
  public readonly endpoint = "https://api.flickr.com/services/rest";

  constructor(protected options: FlickrTransportOptions) {}

  private constructPayload(method: string, options: TransportRequestOptions) {
    const { payload: fromPayload = {} } = options;
    const payload = new RequestPayload(fromPayload);

    payload.append("format", "json");

    if (!options.oauth) {
      payload.append("api_key", this.options.consumerKey);

      return payload;
    }

    if (!this.options.consumerSecret) {
      throw new Error("consumerSecret is required to use OAuth");
    }

    payload.sign(method, this.endpoint, this.options as OAuthCredentials);

    return payload;
  }

  async get<R>(
    options: TransportRequestOptions,
  ): Promise<R extends FlickrAPIResponse ? R : never> {
    const url = new URL(this.endpoint);
    const payload = this.constructPayload("GET", options);

    url.search = payload.toString();

    return fetchJson(url);
  }

  async post<R>(
    options: TransportRequestOptions,
  ): Promise<R extends FlickrAPIResponse ? R : never> {
    const url = new URL(this.endpoint);
    const payload = this.constructPayload("POST", options);

    const body = payload.toFormData();

    return fetchJson(url, {
      body,
    });
  }
}

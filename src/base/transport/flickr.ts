import type { GetOptions, PostOptions, Transport } from "./types";

export interface FlickrAPIResponse {
  stat: "ok" | "fail";
}

export interface FailedResponse extends FlickrAPIResponse {
  code: number;
  message: string;
  stat: "fail";
}

export interface FlickrTransportOptions {
  apiKey: string;
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

  private constructRequest(options: GetOptions | PostOptions) {
    const url = new URL(this.endpoint);
    const { payload: fromPayload = {} } = options;
    const payload =
      fromPayload instanceof FormData ? new FormData() : new URLSearchParams();

    Object.entries(fromPayload).forEach(([key, value]) => {
      payload.append(key, value);
    });

    payload.append("format", "json");
    payload.append("api_key", this.options.apiKey);

    return {
      url,
      payload,
    };
  }

  async get<R>(
    options: GetOptions,
  ): Promise<R extends FlickrAPIResponse ? R : never> {
    const { url, payload } = this.constructRequest(options);

    url.search = payload.toString();

    return fetchJson(url);
  }

  async post<R>(
    options: PostOptions,
  ): Promise<R extends FlickrAPIResponse ? R : never> {
    const { url, payload } = this.constructRequest(options);

    return fetchJson(url, {
      body: payload,
    });
  }
}

import type { Transport } from "./types";

export interface FlickrAPIResponse {
  stat: "ok" | "fail";
}

export interface FailedResponse extends FlickrAPIResponse {
  code: number;
  message: string;
  stat: "fail";
}

interface BaseOptions {
  oauth?: boolean;
  payload?: URLSearchParams | FormData;
}

export interface GetOptions extends BaseOptions {
  payload?: URLSearchParams;
}

export interface PostOptions extends BaseOptions {
  payload?: FormData;
}

export interface FlickrTransportOptions {
  apiKey: string;
}

export class FlickrTransport implements Transport {
  public readonly endpoint = new URL("https://api.flickr.com/services/rest");

  constructor(protected options: FlickrTransportOptions) {}

  async get<T>(
    options: GetOptions,
  ): Promise<T extends FlickrAPIResponse ? T : never> {
    const { payload } = options;

    const url = new URL(this.endpoint);
    const params = new URLSearchParams(payload);

    params.append("format", "json");
    params.append("api_key", this.options.apiKey);

    url.search = params.toString();

    const response = await fetch(url.toString());
    const data = await response.json();

    console.log(data);

    if (data.stat !== "ok") {
      throw new Error(data.message);
    }

    return data;
  }

  async post<T>(
    options: PostOptions,
  ): Promise<T extends FlickrAPIResponse ? T : never> {
    const { payload } = options;

    const url = new URL(this.endpoint);
    const body = new FormData();

    payload?.forEach((value, key) => {
      body.append(key, value);
    });

    body.append("format", "json");
    body.append("api_key", this.options.apiKey);

    const response = await fetch(url.toString(), {
      body,
    });
    const data = await response.json();

    console.log(data);

    if (data.stat !== "ok") {
      throw new Error(data.message);
    }

    return data;
  }
}

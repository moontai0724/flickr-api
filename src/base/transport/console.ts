/* eslint-disable class-methods-use-this */
import type { Transport, TransportRequestOptions } from "./types";

export class ConsoleTransport implements Transport {
  async get<T>(options: TransportRequestOptions): Promise<T> {
    console.debug("GET", options);

    return Promise.resolve(options as T);
  }

  async post<T>(options: TransportRequestOptions): Promise<T> {
    console.debug("POST", options);

    return Promise.resolve(options as T);
  }
}

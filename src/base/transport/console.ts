/* eslint-disable class-methods-use-this */
import type { Options, Transport } from "./types";

export class ConsoleTransport implements Transport {
  async get<T>(options: Options): Promise<T> {
    console.debug("GET", options);

    return Promise.resolve(options as T);
  }

  async post<T>(options: Options): Promise<T> {
    console.debug("POST", options);

    return Promise.resolve(options as T);
  }
}

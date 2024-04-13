/* eslint-disable class-methods-use-this */
import type { BaseOptions, Transport } from "./types";

export class ConsoleTransport implements Transport {
  async get<T>(options: BaseOptions): Promise<T> {
    console.debug("GET", options);

    return Promise.resolve(options as T);
  }

  async post<T>(options: BaseOptions): Promise<T> {
    console.debug("POST", options);

    return Promise.resolve(options as T);
  }
}

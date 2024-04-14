import type { RequestPayload } from "oauth";

export interface TransportRequestOptions {
  oauth?: boolean;
  payload?: RequestPayload;
}

export interface Transport {
  get<R>(options: TransportRequestOptions): Promise<R>;
  post<R>(options: TransportRequestOptions): Promise<R>;
}

export interface BaseOptions {
  payload?: BodyInit | Record<string, string>;
}

export interface GetOptions extends BaseOptions {
  payload?: URLSearchParams | Record<string, string>;
}

export interface PostOptions extends BaseOptions {
  payload?: FormData | Record<string, string>;
}

export interface Transport {
  get<R>(options: GetOptions): Promise<R>;
  post<R>(options: PostOptions): Promise<R>;
}

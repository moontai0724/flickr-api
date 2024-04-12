export interface Options {
  payload?: BodyInit;
}

export interface Transport {
  get<R>(options: Options): Promise<R>;
  post<R>(options: Options): Promise<R>;
}

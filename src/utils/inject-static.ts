import type { Repository } from "../base/repository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClass = new (..._: any[]) => object;

export function injectStatic<T extends AnyClass>(
  BaseClass: T,
  repository: Repository,
): T {
  return class extends BaseClass {
    static readonly repository: Repository = repository;
  };
}

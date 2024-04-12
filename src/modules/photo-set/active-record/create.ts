import { type PhotoSetRepository } from "../repository";
import type { PhotoSetActiveRecord } from ".";

export async function create(
  this: typeof PhotoSetActiveRecord,
  ...args: Parameters<PhotoSetRepository["create"]>
) {
  return this.repository.create(...args);
}

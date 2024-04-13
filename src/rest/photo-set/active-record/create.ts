import { type PhotoSetRepository } from "../repository";
import type { PhotoSetActiveRecord } from ".";

export async function create(
  this: typeof PhotoSetActiveRecord,
  ...args: Parameters<PhotoSetRepository["create"]>
) {
  const photoSet = await this.repository.create(...args);

  return new this(photoSet, this.repository);
}

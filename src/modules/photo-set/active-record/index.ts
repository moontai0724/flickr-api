import { type ActiveRecord } from "base";

import type { PhotoSetRepository } from "../repository";
import { create } from "./create";

export class PhotoSetActiveRecord implements ActiveRecord {
  static readonly repository: PhotoSetRepository;

  constructor(public readonly repository: PhotoSetRepository) {}

  static async create(...args: Parameters<typeof create>) {
    return create.apply(this, args);
  }
}

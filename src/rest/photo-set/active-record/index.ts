import { type ActiveRecord } from "base";

import { PhotoSetModel } from "../model";
import type { PhotoSetRepository } from "../repository";
import { create } from "./create";

export class PhotoSetActiveRecord
  extends PhotoSetModel
  implements ActiveRecord
{
  static readonly repository: PhotoSetRepository;

  constructor(
    photoSet: PhotoSetModel,
    public readonly repository: PhotoSetRepository,
  ) {
    super(photoSet);
  }

  static async create(...args: Parameters<typeof create>) {
    return create.apply(this, args);
  }
}

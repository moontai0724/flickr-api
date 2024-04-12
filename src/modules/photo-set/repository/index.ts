import { Repository } from "base";

import { create } from "./create";

export class PhotoSetRepository extends Repository {
  async create(...args: Parameters<typeof create>) {
    return create.apply(this, args);
  }
}

import { type Repository, type Transport } from "base";

import { PhotoSetRepository } from "./photo-set";
import { type Modules } from "./types";

const repositoryPrototypes = {
  PhotoSet: PhotoSetRepository,
} satisfies Record<Modules, typeof Repository>;

export type RepositoryPrototypes = typeof repositoryPrototypes;
export type RepositoryKeys = keyof RepositoryPrototypes;

export class RepositoryFactory {
  constructor(protected transport: Transport) {}

  protected instantiated = new Map<
    RepositoryKeys,
    InstanceType<RepositoryPrototypes[RepositoryKeys]>
  >();

  getRepository<
    Key extends RepositoryKeys,
    Instance extends InstanceType<RepositoryPrototypes[Key]>,
  >(key: Key): Instance {
    if (!this.instantiated.has(key)) {
      this.instantiated.set(key, new repositoryPrototypes[key](this.transport));
    }

    return this.instantiated.get(key) as Instance;
  }
}

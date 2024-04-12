import { type ActiveRecord } from "base";
import { injectStatic } from "utils/inject-static";

import { PhotoSetActiveRecord } from "./photo-set";
import { type RepositoryFactory } from "./repository.factory";
import { type Modules } from "./types";

const activeRecordPrototypes = {
  PhotoSet: PhotoSetActiveRecord,
} satisfies Record<Modules, ActiveRecord>;

export type ActiveRecordPrototypes = typeof activeRecordPrototypes;
export type ActiveRecordKeys = keyof ActiveRecordPrototypes;

export class ActiveRecordFactory {
  constructor(protected repositoryFactory: RepositoryFactory) {}

  protected injected = new Map<
    ActiveRecordKeys,
    ActiveRecordPrototypes[ActiveRecordKeys]
  >();

  getActiveRecord<
    Key extends ActiveRecordKeys,
    Proto extends ActiveRecordPrototypes[Key],
  >(key: Key): Proto {
    if (!this.injected.has(key)) {
      const repository = this.repositoryFactory.getRepository(key);
      const injectedClass = injectStatic(
        activeRecordPrototypes[key],
        repository,
      );

      this.injected.set(key, injectedClass);
    }

    return this.injected.get(key) as Proto;
  }
}

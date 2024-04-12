import type { Repository } from "../repository";

export interface ActiveRecord {
  // should also have a static repository property, but TypeScript can't check that
  readonly repository: Repository;
}

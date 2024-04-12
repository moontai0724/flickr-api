import type { Transport } from "../transport";

export class Repository {
  constructor(protected transport: Transport) {}
}

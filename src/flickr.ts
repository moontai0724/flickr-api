/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { FlickrTransport, type Transport } from "./base";
import {
  ActiveRecordFactory,
  type ActiveRecordPrototypes,
} from "./rest/active-record.factory";
import { RepositoryFactory } from "./rest/repository.factory";

export interface FlickrOptions {
  apiKey: string;
  transport?: Transport;
}

export interface Flickr extends ActiveRecordPrototypes {}
export class Flickr {
  protected readonly transport: Transport;

  public readonly repositoryFactory: RepositoryFactory;

  public readonly activeRecordFactory: ActiveRecordFactory;

  constructor(protected readonly options: FlickrOptions) {
    this.transport = options.transport || new FlickrTransport(options);

    this.repositoryFactory = new RepositoryFactory(this.transport);
    this.activeRecordFactory = new ActiveRecordFactory(this.repositoryFactory);

    const activeRecords = this.activeRecordFactory.getActiveRecords();

    Object.assign(this, activeRecords);
  }
}

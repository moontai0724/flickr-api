/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import {
  FlickrTransport,
  type FlickrTransportOptions,
  type Transport,
} from "./base";
import {
  ActiveRecordFactory,
  type ActiveRecordPrototypes,
} from "./rest/active-record.factory";
import { RepositoryFactory } from "./rest/repository.factory";

interface WithCredential {
  credentials: FlickrTransportOptions;
}
interface WithTransport {
  transport: Transport;
}

export type FlickrOptions = WithCredential | WithTransport;

export interface Flickr extends ActiveRecordPrototypes {}
export class Flickr {
  protected readonly transport: Transport;

  public readonly repositoryFactory: RepositoryFactory;

  public readonly activeRecordFactory: ActiveRecordFactory;

  constructor(protected readonly options: FlickrOptions) {
    this.transport =
      "transport" in options
        ? options.transport
        : new FlickrTransport(options.credentials);

    this.repositoryFactory = new RepositoryFactory(this.transport);
    this.activeRecordFactory = new ActiveRecordFactory(this.repositoryFactory);

    const activeRecords = this.activeRecordFactory.getActiveRecords();

    Object.assign(this, activeRecords);
  }
}

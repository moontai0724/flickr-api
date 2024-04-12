import { FlickrTransport, type Transport } from "./base";
import { type PhotoSetActiveRecord } from "./modules";
import { ActiveRecordFactory } from "./modules/active-record.factory";
import { RepositoryFactory } from "./modules/repository.factory";

export interface FlickrOptions {
  apiKey: string;
  transport?: Transport;
}

export class Flickr {
  protected readonly transport: Transport;

  public readonly repositoryFactory: RepositoryFactory;

  public readonly activeRecordFactory: ActiveRecordFactory;

  public readonly PhotoSet: typeof PhotoSetActiveRecord;

  constructor(protected readonly options: FlickrOptions) {
    this.transport = options.transport || new FlickrTransport(options);

    this.repositoryFactory = new RepositoryFactory(this.transport);
    this.activeRecordFactory = new ActiveRecordFactory(this.repositoryFactory);

    this.PhotoSet = this.activeRecordFactory.getActiveRecord("PhotoSet");
  }
}

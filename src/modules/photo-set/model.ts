interface PhotoSetModelInterface {
  description?: string;
  id: string;
  title?: string;
  url?: string;
}

export class PhotoSetModel implements PhotoSetModelInterface {
  public id: string;

  public title?: string;

  public description?: string;

  public url?: string;

  constructor({ id, title, description, url }: PhotoSetModelInterface) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.url = url;
  }
}

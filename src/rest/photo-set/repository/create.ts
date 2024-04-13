import type { PhotoSetRepository } from ".";

export interface PhotoSetCreateOptions {
  /**
   * A description of the photoset. May contain limited html.
   */
  description?: string;
  /**
   * The id of the photo to represent this set. The photo must belong to the calling user.
   */
  primaryPhoto: {
    id: string;
  };
  /**
   * A title for the photoset.
   */
  title: string;
}

export interface PhotoSetCreateResponse {
  photoset: {
    /**
     * The ID of the photoset.
     * @example 72177720316146451
     */
    id: string;
    /**
     * The URL to the photoset.
     * @example https://www.flickr.com/photos/moontai0724/sets/72177720316146451
     */
    url: string;
  };
  stat: "ok";
}

/**
 * Create a new photoset for the calling user.
 * @see https://www.flickr.com/services/api/flickr.photosets.create.html
 */
export async function create(
  this: PhotoSetRepository,
  options: PhotoSetCreateOptions,
) {
  const payload = new FormData();

  payload.append("action", "flickr.photosets.create");

  payload.append("primary_photo_id", options.primaryPhoto.id);
  payload.append("title", options.title);
  if (options.description) {
    payload.append("description", options.description);
  }

  const response = await this.transport.post<PhotoSetCreateResponse>({
    payload,
  });

  return response.photoset;
}

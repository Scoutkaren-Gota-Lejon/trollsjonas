/**
 * Gallery URL slugs deliberately differ from their image folder names and from
 * their index thumbnails — three naming schemes inherited from the Gatsby site.
 * All existing URLs must be preserved, so the mapping is explicit.
 */
export interface Gallery {
  /** URL segment: /bilder/<slug>/ */
  slug: string;
  /** Folder under src/images/stugor/ holding the full-size photos. */
  folder: string;
  /** Heading and link label. */
  name: string;
}

export const GALLERIES: Gallery[] = [
  { slug: "storstugan", folder: "storstugan", name: "Storstugan" },
  {
    slug: "patrullstugorna",
    folder: "patrullstugorna",
    name: "Patrullstugorna",
  },
  { slug: "timmerstugorna", folder: "timmerhusen", name: "Timmerhusen" },
  {
    slug: "hygienanlaggningen",
    folder: "hygienanlaggning",
    name: "Hygienanläggningen",
  },
  { slug: "omradet", folder: "omradet", name: "Området" },
];

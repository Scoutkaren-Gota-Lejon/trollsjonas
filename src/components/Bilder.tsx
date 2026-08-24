import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

/**
 * Gallery island. Image optimization and caption lookup now happen at build
 * time in bilder/[gallery].astro — this component only owns lightbox state,
 * which is the sole reason it stays React.
 */
const Bilder = ({ photos }: { photos: GalleryPhoto[] }) => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        spacing={5}
        // Without this the album measures its container on the client and
        // server-renders nothing, so gallery images would need JS to appear.
        // 650px is the .main-container max-width; the client re-measures.
        defaultContainerWidth={650}
        onClick={({ index }) => setIndex(index)}
        render={{
          extras: (_, { photo }) =>
            photo.alt ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "4px 8px",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {photo.alt}
              </div>
            ) : null,
        }}
      />
      <Lightbox
        slides={photos.map((photo) => ({
          src: photo.src,
          alt: photo.alt,
          title: photo.alt,
        }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
};

export default Bilder;

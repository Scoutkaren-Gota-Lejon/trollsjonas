import React, { useState } from "react"
import Layout from "./layout"
import { graphql, Link } from "gatsby"
import { RowsPhotoAlbum } from "react-photo-album"
import "react-photo-album/rows.css"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "./bilder.css"

interface BilderProps {
  name: string
  ingress?: string
  bilder: Array<{
    node: {
      id: string
      childImageSharp: {
        gatsbyImageData: {
          images: {
            fallback: { src: string; width: number; height: number }
          }
        }
      }
    }
  }>
  caption: Array<{
    node: {
      fileName: { id: string }
      caption: string
    }
  }>
}

const Bilder = ({ name, ingress, bilder, caption }: BilderProps) => {
  const [index, setIndex] = useState(-1);
  const captions = caption.reduce((obj: Record<string, string>, item) => {
    obj[item.node.fileName.id] = item.node.caption
    return obj
  }, {})

  const images = bilder.map(bild => {
    const image = bild.node.childImageSharp.gatsbyImageData.images.fallback

    const caption = Object.prototype.hasOwnProperty.call(captions, bild.node.id)
      ? captions[bild.node.id]
      : undefined

    return {
      src: image.src,
      width: image.width,
      height: image.height,
      alt: caption,
    }
  })

  return (
    <Layout>
      <h1>
        <Link to="/bilder/">Bilder</Link> / {name}
      </h1>

      {ingress && <p>{ingress}</p>}

      <RowsPhotoAlbum
        photos={images}
        spacing={5}
        onClick={({ index }) => setIndex(index)}
        render={{
          extras: (_, { photo }) =>
            photo.alt ? (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "4px 8px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                fontSize: "13px",
                textAlign: "center",
              }}>
                {photo.alt}
              </div>
            ) : null,
        }}
      />
      <Lightbox
        slides={images.map(img => ({ src: img.src, alt: img.alt, title: img.alt }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </Layout>
  )
}

export default Bilder

export const galleryImage = graphql`fragment galleryImage on FileConnection {
  edges {
    node {
      id
      childImageSharp {
        gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
      }
    }
  }
}
`

export const galleryCaption = graphql`
  fragment galleryCaption on CaptionJsonConnection {
    edges {
      node {
        fileName {
          id
        }
        caption
      }
    }
  }
`

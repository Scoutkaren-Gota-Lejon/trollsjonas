import PropTypes from "prop-types"
import React, { useState } from "react"
import Layout from "./layout"
import { graphql, Link } from "gatsby"
import { Gallery } from "react-grid-gallery"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "./bilder.css"

const Bilder = ({ name, ingress, bilder, caption }) => {
  const [index, setIndex] = useState(-1);
  const captions = caption.reduce((obj, item) => {
    obj[item.node.fileName.id] = item.node.caption
    return obj
  }, {})

  const images = bilder.map(bild => {
    const image = bild.node.childImageSharp.gatsbyImageData.images.fallback

    const caption = captions.hasOwnProperty(bild.node.id)
      ? captions[bild.node.id]
      : undefined

    return {
      src: image.src,
      nano: image.base64,
      width: image.width,
      height: image.height,
      caption: caption,
      thumbnailCaption: caption,
      alt: caption,
    }
  })

  return (
    <Layout>
      <h1>
        <Link to="/bilder/">Bilder</Link> / {name}
      </h1>

      {ingress && <p>{ingress}</p>}

      <Gallery
        images={images}
        margin={5}
        enableImageSelection={false}
        onClick={(index) => setIndex(index)}
      />
      <Lightbox
        slides={images.map(img => ({ src: img.src, alt: img.alt, title: img.caption }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </Layout>
  )
}

Bilder.propTypes = {
  name: PropTypes.string.isRequired,
  ingress: PropTypes.string,
  bilder: PropTypes.array,
  caption: PropTypes.array,
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

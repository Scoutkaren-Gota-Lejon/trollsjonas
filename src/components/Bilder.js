import PropTypes from "prop-types"
import React from "react"
import Layout from "./layout"
import Seo from "./seo"
import { graphql, Link } from "gatsby"
import Gallery from "react-grid-gallery"
import "./bilder.css"

const Bilder = ({ name, ingress, bilder, caption }) => {
  const title = `Bilder - ${name}`
  const keywords = ["stugor", "bilder", "hyra scoutstuga"]

  const captions = caption.reduce((obj, item) => {
    obj[item.node.fileName.id] = item.node.caption
    return obj
  }, {})

  const images = bilder.map(bild => {
    const thumbnail = bild.node.childImageSharp.fixed
    const image = bild.node.childImageSharp.fluid

    const caption = captions.hasOwnProperty(bild.node.id)
      ? captions[bild.node.id]
      : undefined

    return {
      src: image.src,
      srcSet: image.srcSet,
      nano: thumbnail.base64,
      thumbnail: thumbnail.src,
      thumbnailWidth: thumbnail.width,
      thumbnailHeight: thumbnail.height,
      caption: caption,
      thumbnailCaption: caption,
      alt: caption,
    }
  })

  return (
    <Layout>
      <Seo title={title} keywords={keywords} />

      <h1>
        <Link to="/bilder/">Bilder</Link> / {name}
      </h1>

      {ingress && <p>{ingress}</p>}

      <Gallery
        images={images}
        margin={5}
        enableImageSelection={false}
        backdropClosesModal={true}
        imageCountSeparator=" av "
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

export const galleryImage = graphql`
  fragment galleryImage on FileConnection {
    edges {
      node {
        id
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid_noBase64
          }
          fixed(height: 180, width: 190) {
            ...GatsbyImageSharpFixed
          }
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

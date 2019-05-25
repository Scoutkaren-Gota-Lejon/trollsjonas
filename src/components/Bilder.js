import PropTypes from "prop-types"
import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import { Link } from "gatsby"
import Img from "gatsby-image"
import './bilder.css'

const Bilder = ({name, bilder}) => {
  const title = `Bilder - ${name}`
  const keywords = [];

  return (
    <Layout>
      <SEO title={title} keywords={keywords} />

      <h1><Link to="/bilder/">Bilder</Link> / {name}</h1>

      {bilder && bilder.map(bild => {
        const node = bild.node;

        return (
          <div key={node.id} className="gallery-image-container">
            <Img className="gallery-image" fluid={node.childImageSharp.fluid} />
          </div>
        );
      })}
    </Layout>
  )
}

Bilder.propTypes = {
  name: PropTypes.string
}

export default Bilder



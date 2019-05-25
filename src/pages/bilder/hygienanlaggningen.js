import React from "react"
import '../../components/stugor.css'
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <Bilder name="Hygienanläggningen" bilder={data.bilder.edges} />
  )
}

export const query = graphql`
  query {
    bilder: allFile(filter: {relativePath: {glob:"stugor/hygienanlaggning/*" }}) {
      edges {
        node {
          ...galleryImage
        }
      }
    }
  }
`

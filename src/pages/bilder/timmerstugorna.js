import React from "react"
import '../../components/stugor.css'
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

export default ({ data }) => {
  return (<Bilder name="Timmerhusen" bilder={data.bilder.edges} />);
}

export const query = graphql`
  query {
    bilder: allFile(filter: {relativePath: {glob:"stugor/timmerhusen/*" }}) {
      edges {
        node {
          ...galleryImage
        }
      }
    }
  }
`

import React from "react"
import '../../components/stugor.css'
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <Bilder
      name="Timmerhusen"
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export const query = graphql`
  query {
    bilder: allFile(filter: {
      relativePath: {glob: "stugor/timmerhusen/*" },
      extension: {eq:"jpg"}
    }) {
      ...galleryImage
    },
    caption: allCaptionJson(filter:{fileName: {relativePath: {glob: "stugor/timmerhusen/*" }}}) {
      ...galleryCaption
    }
  }
`

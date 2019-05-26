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
  query($galleryPath: String = "stugor/timmerhusen/*") {
    bilder: allFile(filter: {
      relativePath: {glob: $galleryPath },
      extension: {eq:"jpg"}
    }) {
      ...galleryImage
    },
    caption: allCaptionJson(filter:{fileName: {relativePath: {glob: $galleryPath }}}) {
      ...galleryCaption
    }
  }
`
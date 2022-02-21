import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

const Timmerstugor = ({ data }) => {
  return (
    <Bilder
      name="Timmerhusen"
      ingress="Stugorna har 8 sovplatser vardera"
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export default Timmerstugor;

export const query = graphql`
  query($galleryPath: String = "stugor/timmerhusen/*") {
    bilder: allFile(sort: {fields: name}, filter: {
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

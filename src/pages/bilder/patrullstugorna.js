import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

const Patrullstugorna = ({ data }) => {
  return (
    <Bilder
      name="Patrullstugorna"
      ingress="Stugorna har 4 sovplatser vardera"
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export default Patrullstugorna;

export const query = graphql`
  query($galleryPath: String = "stugor/patrullstugorna/*") {
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

import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

const Omradet = ({ data }) => {
  return (
    <Bilder
      name="Området"
      ingress="Bilder från området "
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export default Omradet;

export const query = graphql`
  query($galleryPath: String = "stugor/omradet/*") {
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

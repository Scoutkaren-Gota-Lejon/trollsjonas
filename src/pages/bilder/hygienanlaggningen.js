import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

const Hygienanlaggning = ({ data }) => {
  return (
    <Bilder
      name="Hygienanläggningen"
      ingress="Bilder utanför och innuti hygienanläggningen. I huset finns det 4 st toaletter."
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export default Hygienanlaggning;

export const query = graphql`
  query($galleryPath: String = "stugor/hygienanlaggning/*") {
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

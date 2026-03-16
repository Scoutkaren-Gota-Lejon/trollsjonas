import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"

const Storstugan = ({ data }) => {
  return (
    <Bilder
      name="Storstugan"
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export default Storstugan;

export const query = graphql`
  query($galleryPath: String = "stugor/storstugan/*") {
    bilder: allFile(sort: {name: ASC}, filter: {
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

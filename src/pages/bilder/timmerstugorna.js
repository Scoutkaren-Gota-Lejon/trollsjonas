import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"
import { SeoHead } from "../../components/seo"

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

export function Head() {
  return <SeoHead title="Bilder - Timmerhusen" keywords={["stugor", "bilder", "hyra scoutstuga"]} />
}

export const query = graphql`
  query($galleryPath: String = "stugor/timmerhusen/*") {
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

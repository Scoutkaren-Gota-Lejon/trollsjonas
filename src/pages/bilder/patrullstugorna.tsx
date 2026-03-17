import React from "react"
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby"
import { SeoHead } from "../../components/seo"

const Patrullstugorna = ({ data }: { data: Record<string, any> }) => {
  return (
    <Bilder
      name="Patrullstugorna"
      ingress="Stugorna har 4 sovplatser vardera"
      bilder={data.bilder.edges}
      caption={data.caption.edges} />
  );
}

export default Patrullstugorna;

export function Head() {
  return <SeoHead title="Bilder - Patrullstugorna" keywords={["stugor", "bilder", "hyra scoutstuga"]} />
}

export const query = graphql`
  query($galleryPath: String = "stugor/patrullstugorna/*") {
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

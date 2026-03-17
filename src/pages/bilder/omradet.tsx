import React from "react";
import Bilder from "../../components/Bilder";
import { graphql } from "gatsby";
import { SeoHead } from "../../components/seo";

const Omradet = ({ data }: { data: Record<string, any> }) => {
  return (
    <Bilder
      name="Området"
      ingress="Bilder från området "
      bilder={data.bilder.edges}
      caption={data.caption.edges}
    />
  );
};

export default Omradet;

export function Head() {
  return (
    <SeoHead
      title="Bilder - Området"
      keywords={["stugor", "bilder", "hyra scoutstuga"]}
    />
  );
}

export const query = graphql`
  query ($galleryPath: String = "stugor/omradet/*") {
    bilder: allFile(
      sort: { name: ASC }
      filter: { relativePath: { glob: $galleryPath }, extension: { eq: "jpg" } }
    ) {
      ...galleryImage
    }
    caption: allCaptionJson(
      filter: { fileName: { relativePath: { glob: $galleryPath } } }
    ) {
      ...galleryCaption
    }
  }
`;

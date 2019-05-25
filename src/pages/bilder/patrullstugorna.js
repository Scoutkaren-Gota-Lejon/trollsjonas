import React from "react"
import '../../components/stugor.css'
import Bilder from "../../components/Bilder";

export default ({ data }) => {
  return (<Bilder name="Patrullstugorna" bilder={data.bilder.edges} />);
}

export const query = graphql`
  query {
    bilder: allFile(filter: {relativePath: {glob:"stugor/patrullstugorna/*" }}) {
      edges {
        node {
          id,
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

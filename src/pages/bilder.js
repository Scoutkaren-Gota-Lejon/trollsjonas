import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { SeoHead } from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image";
import "../components/bilder.css"

const galleries = [
  {
    url: "storstugan",
    name: "Storstugan",
  },
  {
    url: "patrullstugorna",
    name: "Patrullstugorna",
    pic: "",
  },
  {
    url: "timmerstugorna",
    name: "Timmerhusen",
    pic: "",
  },
  {
    url: "hygienanlaggningen",
    name: "Hygienanläggningen",
    pic: "",
  },
  {
    url: "omradet",
    name: "Området",
  },
]

const Bilder = ({ data }) => {
  return (
    <Layout>
      <h1>Bilder</h1>

      {galleries.map(page => {
        return (
          <div key={page.url} className="gallery-list">
            <Link className="gallery-link" to={`/bilder/${page.url}`}>
              <GatsbyImage image={data[page.url].childImageSharp.gatsbyImageData} alt={page.name} />{" "}
              <br />
              {page.name}
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}

export default Bilder;

export function Head({ data }) {
  const seo = data.seo.frontmatter
  const keywords = seo.keywords || []
  const description = seo.description || ""
  return <SeoHead title={seo.title} keywords={keywords} description={description} />
}

export const query = graphql`
  query {
    storstugan: file(relativePath: { eq: "stugor/storstugan.jpg" }) {
      ...stugImage
    }

    timmerstugorna: file(relativePath: { eq: "stugor/timmerhus.jpg" }) {
      ...stugImage
    }

    patrullstugorna: file(relativePath: { eq: "stugor/patrullstuga.jpg" }) {
      ...stugImage
    }

    hygienanlaggningen: file(
      relativePath: { eq: "stugor/hygienanlaggning.jpg" }
    ) {
      ...stugImage
    }

    omradet: file(relativePath: { eq: "stugor/omradet.jpg" }) {
      ...stugImage
    }

    seo: markdownRemark(fields: { slug: { eq: "/bilder/" } }) {
      frontmatter {
        title
        keywords
        description
      }
    }
  }
`

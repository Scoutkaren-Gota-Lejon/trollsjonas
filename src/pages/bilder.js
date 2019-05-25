import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import '../components/bilder.css'

const galleries = [
  {
    'url': 'storstugan',
    'name': 'Storstugan'
  },
  {
    'url': 'patrullstugorna',
    'name': 'Patrullstugorna',
    'pic': ''
  },
  {
    'url': 'timmerstugorna',
    'name': 'Timmerhusen',
    'pic': ''
  },
  {
    'url': 'hygienanlaggningen',
    'name': 'Hygienanläggningen',
    'pic': ''
  },
  {
    'url': 'omradet',
    'name': 'Området'
  }
]

export default ({ data }) => {
  const title = 'Bilder'
  const keywords = [];
  return (
    <Layout>
      <SEO title={title} keywords={keywords} />
      <h1>Bilder</h1>

      {galleries.map(page => {
        return (
          <div key={page.url} className="gallery-list">
            <Link className="gallery-link" to={`/bilder/${page.url}`}>
              <Img fixed={data[page.url].childImageSharp.fixed} alt={page.name} /> <br />
              {page.name}
            </Link>
          </div>
        )
      })}
    </Layout>
  )
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

    hygienanlaggningen: file(relativePath: { eq: "stugor/hygienanlaggning.jpg" }) {
      ...stugImage
    }

    omradet: file(relativePath: { eq: "stugor/omradet.jpg" }) {
      ...stugImage
    }
  }
`

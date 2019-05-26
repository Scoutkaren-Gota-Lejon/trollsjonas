import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import '../components/stugor.css'

export default ({ data }) => {
  const seo = data.seo.frontmatter;

  const title = seo.title
  const keywords = seo.keywords ? seo.keywords : [];
  const description = seo.description ? seo.description : '';

  return (
    <Layout>
      <SEO title={title} keywords={keywords} description={description} />
      <h1>Stugorna</h1>

      <div className="stuga-section">
        <h3>Storstugan</h3>
        <Img className="stuga-image" alt="Storstugan" fixed={data.storstugan.childImageSharp.fixed} />
        <p>
          Anläggningens största hus inrymmer kök, sällskapsutrymmen och sovplatser.
          Köket för självhushåll är utrustat med de vanligaste faciliteterna så som spis, diskbänk arbetsbänkar, kyl och frys, mikrovågsugn, arbetsredskap och porslin för 40 personer.
          I det större samlingsrummet finns en öppen vedspis, soffor och plats för cirka 30 personer.
          Det intilliggande rummet har även det kamin och inrymmer 8-10 personer, alternativ 4 sovplatser.
          På övervåningen finns ett sovloft där 12 personer får en god natts sömn i medhavd sovsäck på de befintliga madrasserna.
        </p>
        <p>
          <Link to="/bilder/storstugan/">Länk till sida med bilder på stugan</Link>
        </p>
      </div>

      <div className="stuga-section">
        <h3>Timmerstugorna</h3>
        <Img className="stuga-image" alt="Timmerstugorna" fixed={data.timmerhus.childImageSharp.fixed} />
        <p>
          På Trollsjönäs har vi två likadana stugor som vi kallar för Timmerstugor.
          Stugorna har två våningar varav det ena inrymmer sovplatser och det andra ett mindre sällskapsrum.
          I varje stuga kan 8 personer sova i egna sovsäckar på de befintliga madrasserna.
        </p>
        <p>
          <Link to="/bilder/timmerstugorna/">Länk till sida med bilder på stugan</Link>
        </p>
      </div>

      <div className="stuga-section">
        <h3>Patrullstugorna</h3>
        <Img className="stuga-image" alt="Röda stugan" fixed={data.patrullstuga.childImageSharp.fixed} />
        <p>
          Dessa stugor är våra minsta och har plats för 4 sovande personer vardera.
          Sängarna är av två-våningsmodell och har fasta madrasser att sova på.
        </p>
        <p>
          <Link to="/bilder/patrullstugorna/">Länk till sida med bilder på stugan</Link>
        </p>
      </div>

      <div className="stuga-section">
        <h3>Hygienanläggningen</h3>
        <Img className="stuga-image" alt="Hygienanläggningen" fixed={data.hygienanlaggning.childImageSharp.fixed} />
        <p>
          Denna byggnad inrymmer alla toaletter som finns på Trollsjönäs, förutom skogen utanför.
          Totalt finns det fyra vattentoaletter där en har ingång med ramp från utsidan.
          I anslutning till toaletterna finns det handfat med såväl varmt som kallt vatten.
        </p>
        <p>
          <Link to="/bilder/hygienanlaggningen/">Länk till sida med bilder på hygienanläggningen</Link>
        </p>
      </div>
    </Layout>
  )
}

export const stugImage = graphql`
  fragment stugImage on File {
    childImageSharp {
      fixed(height: 150) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    storstugan: file(relativePath: { eq: "stugor/storstugan.jpg" }) {
      ...stugImage
    }

    timmerhus: file(relativePath: { eq: "stugor/timmerhus.jpg" }) {
      ...stugImage
    }

    patrullstuga: file(relativePath: { eq: "stugor/patrullstuga.jpg" }) {
      ...stugImage
    }

    hygienanlaggning: file(relativePath: { eq: "stugor/hygienanlaggning.jpg" }) {
      ...stugImage
    }

    seo: markdownRemark(fields: { slug: { eq: "/stugor/" } }) {
      frontmatter {
        title,
        keywords,
        description
      }
    }
  }
`

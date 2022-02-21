import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import StugSection from "../components/StugSection"

const storstuganDesc =
  "Anläggningens största hus inrymmer kök, sällskapsutrymmen och sovplatser." +
  "Köket för självhushåll är utrustat med de vanligaste faciliteterna så som spis, diskbänk, diskmaskin, arbetsbänkar, kyl och frys, mikrovågsugn, arbetsredskap och porslin för 40 personer." +
  "I det större samlingsrummet finns en öppen vedspis, soffor och plats för cirka 40 personer." +
  "Det intilliggande rummet har även det kamin och inrymmer 8-10 personer, alternativ 4 sovplatser." +
  "På övervåningen finns ett sovloft där 12 personer får en god natts sömn i medhavd sovsäck på de befintliga madrasserna."

const timmerhusDesc =
  "På Trollsjönäs har vi två likadana stugor som vi kallar för Timmerstugor." +
  "Stugorna har två våningar varav det ena inrymmer sovplatser och det andra ett mindre sällskapsrum." +
  "I varje stuga kan 8 personer sova i egna sovsäckar på de befintliga madrasserna."

const patrullDesc =
  "Dessa stugor är våra minsta och har plats för 4 sovande personer vardera." +
  "Sängarna är av två-våningsmodell och har fasta madrasser att sova på."

const hygienDesc =
  "Denna byggnad inrymmer alla toaletter som finns på Trollsjönäs." +
  "Totalt finns det fyra vattentoaletter där en har ingång med ramp från utsidan." +
  "I anslutning till toaletterna finns det handfat med såväl varmt som kallt vatten."

const Stugor = ({ data }) => {
  const seo = data.seo.frontmatter

  const title = seo.title
  const keywords = seo.keywords ? seo.keywords : []
  const description = seo.description ? seo.description : ""

  return (
    <Layout>
      <Seo title={title} keywords={keywords} description={description} />
      <h1>Stugorna</h1>

      <StugSection
        data={data}
        title="Storstugan"
        imageLink="storstugan"
        description={storstuganDesc}
      />

      <StugSection
        data={data}
        title="Timmerstugorna"
        imageLink="timmerstugorna"
        description={timmerhusDesc}
      />

      <StugSection
        data={data}
        title="Patrullstugorna"
        imageLink="patrullstugorna"
        description={patrullDesc}
      />

      <StugSection
        data={data}
        title="Hygienanläggningen"
        imageLink="hygienanlaggningen"
        description={hygienDesc}
      />
    </Layout>
  )
}

export default Stugor;

export const stugImage = graphql`fragment stugImage on File {
  childImageSharp {
    gatsbyImageData(height: 150, layout: FIXED)
  }
}
`

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

    seo: markdownRemark(fields: { slug: { eq: "/stugor/" } }) {
      frontmatter {
        title
        keywords
        description
      }
    }
  }
`

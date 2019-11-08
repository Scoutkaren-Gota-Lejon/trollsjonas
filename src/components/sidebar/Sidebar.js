import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import informationsfolder from './informationsfolder.pdf'

const SideBar = () => {
  const data = useStaticQuery(
    graphql`
      query {
        map: file(relativePath: { eq: "map.png" }) {
          childImageSharp {
            fixed(width: 270, height: 375) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    `
  )

  return (
  <aside
    className="sidebar-container"
  >
      <section
        style={{
          background: 'rgba(235, 245, 228, 0.7)',
          padding: 15
        }}
        >
        <h3>Hyra Trollsjönäs</h3>
        Om du vill hyra Trollsjönäs är du välkommen att kontakta vår uthyrningssamordnare<br />
        Gert Andersson på <br />
        mobil: 0733-429732 <br />
        e-postadress: <a href="mailto: boka@gotalejon.org">boka@gotalejon.org</a><br /><br />
        <a href={informationsfolder}>Informationsfolder</a>
      </section>

      <section
        style={{
          background: 'rgba(235, 245, 228, 0.7)',
          marginTop: 20,
          padding: 15
        }}
        >
        <h3>Här finns vi</h3>
        <Img
          alt="här finns vi"
          fixed={data.map.childImageSharp.fixed}
        />
        <br />
        <small><a href="https://www.google.com/maps/d/edit?mid=zMXAajihALcI.kU_EyCTSzIV4">Visa på en större karta</a></small>
      </section>
  </aside>
  )
}

export default SideBar

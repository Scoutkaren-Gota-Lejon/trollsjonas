import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import informationsfolder from './informationsfolder.pdf'

const SideBar = () => {
  const data = useStaticQuery(
    graphql`{
  map: file(relativePath: {eq: "map.png"}) {
    childImageSharp {
      gatsbyImageData(width: 270, height: 375, layout: FIXED)
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
          Det går att använda <a href="/kontakt/#form">bokningsformuläret</a> för att hyra Trollsjönäs eller
          kontakta vår uthyrningssamordnare <br />
          Gert Andersson på <br />
          mobil: 0707-52 40 81<br />
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
          <GatsbyImage image={data.map.childImageSharp.gatsbyImageData} alt="här finns vi" />
          <br />
          <small><a href="https://www.google.com/maps/d/edit?mid=zMXAajihALcI.kU_EyCTSzIV4">Visa på en större karta</a></small>
        </section>
    </aside>
  );
}

export default SideBar

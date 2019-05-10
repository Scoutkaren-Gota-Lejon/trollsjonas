import PropTypes from "prop-types"
import React from "react"

import informationsfolder from './informationsfolder.pdf'

const SideBar = () => (
  <aside
    style={{
      marginLeft: 20,
      float: 'right',
      width: 300
    }}
  >
      <section
        style={{
          background: 'rgba(235, 245, 228, 0.7)',
          padding: 15
        }}
        >
        <h3>Hyra Trollsjönäs</h3>
        Om du vill hyra Trollsjönäs är du välkommen att kontakta vår uthyrningssamordnare
        Gert Andersson på <br />
        mobil: 0733-429732 <br />
        e-postadress: <a href="mailto: boka@gotalejon.org">boka@gotalejon.org</a><br /><br />
        <a href={informationsfolder}>Informationsfolder</a>
      </section>
  </aside>
)

SideBar.propTypes = {
  siteTitle: PropTypes.string,
  maxWidth: PropTypes.number
}

export default SideBar

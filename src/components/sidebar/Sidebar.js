import React from "react"

import informationsfolder from './informationsfolder.pdf'

const SideBar = () => (
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
        <iframe title="karta till oss" frameBorder="0" width="100%" height="390" scrolling="no" src="https://maps.google.com/maps/ms?msa=0&amp;msid=215786389003830185070.0004f02fd98c8a8a72978&amp;ie=UTF8&amp;t=m&amp;ll=57.814041,12.028656&amp;spn=0.285289,0.369415&amp;z=10&amp;output=embed"></iframe>
        <br />
        <small><a href="https://www.google.com/maps/d/edit?mid=zMXAajihALcI.kU_EyCTSzIV4">Visa på en större karta</a></small>
      </section>
  </aside>
)

export default SideBar

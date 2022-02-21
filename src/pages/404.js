import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>Hittades inte</h1>
    <p>Oops! Sidan du letade efter finns inte.</p>
  </Layout>
)

export default NotFoundPage

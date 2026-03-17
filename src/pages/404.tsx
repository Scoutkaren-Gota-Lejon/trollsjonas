import React from "react"
import Layout from "../components/layout"
import { SeoHead } from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <h1>Hittades inte</h1>
    <p>Oops! Sidan du letade efter finns inte.</p>
  </Layout>
)

export default NotFoundPage

export function Head() {
  return <SeoHead title="404: Not found" />
}

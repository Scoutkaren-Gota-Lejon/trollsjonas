import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { SeoHead } from "../components/seo"
import Boka from "../components/Boka"
import PriceCalc from "../components/PriceCalc"
import rehypeReact from "rehype-react"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "booking-form": Boka, "price-calc": PriceCalc },
}).Compiler

const Page = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      {
        renderAst(post.htmlAst)
      }
    </Layout>
  )
}

export default Page;

export function Head({ data }) {
  const post = data.markdownRemark
  const keywords = post.frontmatter.keywords || []
  const description = post.frontmatter.description || ""
  return (
    <SeoHead
      title={post.frontmatter.title}
      keywords={keywords}
      description={description}
    />
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        keywords
        description
      }
    }
  }
`

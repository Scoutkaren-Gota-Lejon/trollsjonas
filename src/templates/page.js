import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Boka from "../components/Boka"
import rehypeReact from "rehype-react"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "booking-form": Boka },
}).Compiler

const Page = ({ data }) => {
  const post = data.markdownRemark
  const keywords = post.frontmatter.keywords ? post.frontmatter.keywords : []
  const description = post.frontmatter.description
    ? post.frontmatter.description
    : ""
  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        keywords={keywords}
        description={description}
      />
      {
        renderAst(post.htmlAst)
      }
    </Layout>
  )
}

export default Page;

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

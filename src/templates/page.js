import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const post = data.markdownRemark
  const keywords = post.frontmatter.keywords ? post.frontmatter.keywords : [];
  const description = post.frontmatter.description ? post.frontmatter.description : '';
  return (
    <Layout>
      <SEO title={post.frontmatter.title} keywords={keywords} description={description} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        keywords,
        description
      }
    }
  }
`

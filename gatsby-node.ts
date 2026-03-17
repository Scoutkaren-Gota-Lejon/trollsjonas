import path from "path"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql<{
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: { onlyurl: boolean }
          fields: { slug: string }
        }
      }>
    }
  }>(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              onlyurl
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data!.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.frontmatter.onlyurl) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/page.tsx`),
        context: {
          slug: node.fields.slug,
        },
      })
    }
  })
}

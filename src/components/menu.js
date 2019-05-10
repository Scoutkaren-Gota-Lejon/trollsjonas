import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Menu = ({maxWidth}) => {
  const data = useStaticQuery(
    graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          },
          fields {
            slug
          }
        }
      }
    }
  }
`)

  return (
  <nav
    style={{
      backgroundColor: '#00ff00'
    }}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: maxWidth,
      }}
    >
      {data && data.allMarkdownRemark.edges.map(menu => (
        <Link
          to={menu.node.fields.slug}
          style={{
          textDecoration: `none`,
          padding: `1.0875rem`
          }}
        >
          {menu.node.frontmatter.title}
        </Link>
      ))}
    </div>
  </nav>
)
}

Menu.defaultProps = {
  siteTitle: ``,
}

export default Menu




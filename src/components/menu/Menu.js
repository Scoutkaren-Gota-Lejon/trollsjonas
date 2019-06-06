import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "./menu.css"

const Menu = ({maxWidth}) => {
  const data = useStaticQuery(
    graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title,
            order
          },
          fields {
            slug
          }
        }
      }
    }
  }
`)

const sortFunc = (a, b) => {
  return a.node.frontmatter.order - b.node.frontmatter.order;
}

  return (
  <nav
    className="site-menu">
    <ul
      style={{
        maxWidth: maxWidth,
      }}
    >
      {data && data.allMarkdownRemark.edges.sort(sortFunc).map(menu => (
        <li key={menu.node.fields.slug}>
        <Link
          to={menu.node.fields.slug}
          partiallyActive={menu.node.fields.slug !== '/'}
          activeClassName="active"
        >
          {menu.node.frontmatter.title}
        </Link>
        </li>
      ))}

        <li>
          <a href="https://gotalejon.org">
            Scoutkåren Göta Lejon
          </a>
        </li>
    </ul>
  </nav>
)
}

Menu.defaultProps = {
  siteTitle: ``,
}

export default Menu




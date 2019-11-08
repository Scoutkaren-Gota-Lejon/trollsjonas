import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  background-color: #EBF5E4;

  ul {
    margin: 0 auto;
  }

  li {
    display: inline-block;
    position: relative;
    margin-bottom: 0;

    a {
      color: #141412;
      display: block;
      font-size: 15px;
      line-height: 1;
      padding: 15px 15px;
      text-decoration: none;
    }

    .active {
      color: #bc360a;
      font-style: italic;
    }

    &:hover > a,
    a:hover {
      background-color: #220e10;
      color: #fff;
    }
  }
`

const Menu = ({maxWidth}) => {
  const data = useStaticQuery(
    graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title,
            menu,
            order,
            hidden
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
  <Container>
    <ul
      style={{
        maxWidth: maxWidth,
      }}
    >
      {data && data.allMarkdownRemark.edges.sort(sortFunc).map(menu => {

        if (menu.node.frontmatter.hidden) {
          return '';
        }

        return (
          <li key={menu.node.fields.slug}>
          <Link
            to={menu.node.fields.slug}
            partiallyActive={menu.node.fields.slug !== '/'}
            activeClassName="active"
          >
            {menu.node.frontmatter.menu ? menu.node.frontmatter.menu : menu.node.frontmatter.title}
          </Link>
          </li>
        )
      })}

        <li>
          <a href="https://gotalejon.org">
            Scoutkåren Göta Lejon
          </a>
        </li>
    </ul>
  </Container>
)
}

Menu.defaultProps = {
  siteTitle: ``,
}

export default Menu




import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: #EBF5E4;
  position: relative;
  width: 100%;

  input[type=checkbox] {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  label {
    display: none;
    cursor: pointer;
    user-select: none;
  }

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

  @media (max-width: 44em) {
    ul {
      display:none;
      height:100%;
    }

    label {
      position: relative;
      display: block;
      width: 100%;
      min-height: 2.25em;
      padding: .45em;
      font-size: 1.1em;
      margin: 0;
    }

    input[type=checkbox]:checked ~ ul {
      display:block;

      > li {
        width: 100%;
        opacity: .8;
        text-align: left;
      }
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
  <Container>
    <input type="checkbox" id="button" />
    <label htmlFor="button">Meny</label>
    <ul
      style={{
        maxWidth: maxWidth,
      }}
    >
      {data && data.allMarkdownRemark.edges.sort(sortFunc).map(menu => {

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




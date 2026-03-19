import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #ebf5e4;
  position: relative;
  width: 100%;

  input[type="checkbox"] {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  label {
    display: none;
    cursor: pointer;
    user-select: none;
    align-items: center;
    gap: 4px;
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

  @media (max-width: 70em) {
    ul {
      display: none;
      height: 100%;
    }

    label {
      position: relative;
      display: flex;
      width: 100%;
      min-height: 2.25em;
      padding: 0.45em;
      font-size: 1.1em;
      margin: 0;
    }

    input[type="checkbox"]:checked ~ ul {
      display: block;

      > li {
        width: 100%;
        opacity: 0.8;
        text-align: left;
      }
    }
  }
`;

interface MenuEdge {
  node: {
    frontmatter: {
      title: string;
      menu: string | null;
      order: number;
    };
    fields: {
      slug: string;
    };
  };
}

const Menu = ({ maxWidth }: { maxWidth: number }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              menu
              order
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const sortFunc = (a: MenuEdge, b: MenuEdge) => {
    return a.node.frontmatter.order - b.node.frontmatter.order;
  };

  return (
    <Container>
      <input type="checkbox" id="menu-button" />
      <label htmlFor="menu-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        Meny
      </label>
      <ul
        style={{
          maxWidth: maxWidth,
        }}
      >
        {data &&
          data.allMarkdownRemark.edges.sort(sortFunc).map((menu: MenuEdge) => {
            return (
              <li key={menu.node.fields.slug}>
                <Link
                  to={menu.node.fields.slug}
                  partiallyActive={menu.node.fields.slug !== "/"}
                  activeClassName="active"
                >
                  {menu.node.frontmatter.menu
                    ? menu.node.frontmatter.menu
                    : menu.node.frontmatter.title}
                </Link>
              </li>
            );
          })}

        <li>
          <a href="https://gotalejon.org">Scoutkåren Göta Lejon</a>
        </li>
      </ul>
    </Container>
  );
};

export default Menu;

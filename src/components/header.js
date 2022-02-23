import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";

const Header = ({ siteTitle, maxWidth }) => {
  const data = useStaticQuery(
    graphql`{
  header: file(relativePath: {eq: "header.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 800, placeholder: NONE, layout: CONSTRAINED)
    }
  }
}
`
  )

  return (
    <header
      style={{
        background: `#0b090b`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: maxWidth,
          position: "relative",
          padding: `0 1.0875rem`,
          height: "100px",
        }}
      >
        <GatsbyImage
          image={data.header.childImageSharp.gatsbyImageData}
          alt="header"
          loading="eager"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }} />
        <h1
          style={{
            margin: 0,
            position: "absolute",
            top: "30%",
          }}
        >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  maxWidth: PropTypes.number,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

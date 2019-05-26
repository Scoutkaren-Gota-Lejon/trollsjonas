import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, maxWidth }) => (
  <header
    style={{
      background: `#534a46`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: maxWidth,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
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
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  maxWidth: PropTypes.number
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

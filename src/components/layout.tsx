import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Menu from "./menu/Menu";
import Sidebar from "./sidebar/Sidebar";
import GlobalStyle from "./GlobalStyle";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            maxWidth
          }
        }
      }
    `}
    render={(data) => (
      <>
        <GlobalStyle />
        <Header
          siteTitle={data.site.siteMetadata.title}
          maxWidth={data.site.siteMetadata.maxWidth}
        />
        <Menu maxWidth={data.site.siteMetadata.maxWidth} />
        <div
          style={{
            margin: `1.45rem auto 0`,
            maxWidth: data.site.siteMetadata.maxWidth,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main className="main-container">
            {children}
            <div className="clear" />
          </main>
          <Sidebar />
          <footer></footer>
        </div>
      </>
    )}
  />
);

export default Layout;

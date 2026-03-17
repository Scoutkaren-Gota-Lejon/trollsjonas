import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SeoHeadProps {
  title: string
  description?: string
  keywords?: string[]
  lang?: string
  children?: React.ReactNode
}

export function SeoHead({ title, description, keywords, lang = "sv", children }: SeoHeadProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const fullTitle = `${title} | ${site.siteMetadata.title}`

  return (
    <>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="google-site-verification" content="YOnCh2nGQDtlK6udHZSi5okwBwFrDfjkXI1ZVRj10MI" />
      <meta name="msvalidate.01" content="7169FCF615003F8600B2B393D64EC239" />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      {children}
    </>
  )
}

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    maxWidth: 1100,
    title: `Trollsjönäs`,
    description: `Hyr stugor i vättlefjäll.`,
    author: `Stiftelsen Göta Lejons Friluftsgård`,
    siteUrl: `https://trollsjonas.gotalejon.org`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto']
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-component",
            options: { components: ["booking-form"] }
          },
          "gatsby-remark-component",
          "gatsby-remark-copy-linked-files",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
            },
          },
        ],
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        redirect: [
          'RewriteRule ^priser/?$ /hyra [R=301,L,NE]',
        ],
      },
    },
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Trollsjönäs`,
        short_name: `Trollsjönäs`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
        icons: [
          {
            src: `/favicons/icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `/favicons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          }
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-25532932-2"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
  ],
}

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Replaces the gatsby-source-filesystem + gatsby-transformer-remark pipeline
 * and the `allMarkdownRemark` GraphQL queries that fed gatsby-node.ts, Menu,
 * stugor and bilder.
 *
 * `onlyurl` entries provide a menu label and SEO frontmatter but generate no
 * page of their own — their routes are hand-authored (bilder/, stugor/).
 */
const pages = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./content" }),
  schema: z.object({
    title: z.string(),
    menu: z.string().optional(),
    order: z.number(),
    onlyurl: z.boolean().default(false),
    description: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { pages };

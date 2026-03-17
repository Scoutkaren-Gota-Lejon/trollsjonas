import React from "react";
import * as production from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { SeoHead } from "../components/seo";
import Boka from "../components/Boka";
import PriceCalc from "../components/PriceCalc";

const renderAst = (tree: Parameters<typeof toJsxRuntime>[0]) =>
  toJsxRuntime(tree, {
    ...production,
    components: { "booking-form": Boka, "price-calc": PriceCalc } as Record<
      string,
      React.ComponentType
    >,
  });

const Page = ({ data }: { data: Record<string, any> }) => {
  const post = data.markdownRemark;
  return <Layout>{renderAst(post.htmlAst)}</Layout>;
};

export default Page;

export function Head({ data }: { data: Record<string, any> }) {
  const post = data.markdownRemark;
  const keywords = post.frontmatter.keywords || [];
  const description = post.frontmatter.description || "";
  return (
    <SeoHead
      title={post.frontmatter.title}
      keywords={keywords}
      description={description}
    />
  );
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        keywords
        description
      }
    }
  }
`;

import React from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const Container = styled.div`
  clear: both;
`;

const StugImg = styled(GatsbyImage)`
  float: right;
  margin-left: 10px;
  margin-bottom: 10px;
`;

interface StugSectionProps {
  data: Record<
    string,
    { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
  >;
  title: string;
  description: string;
  imageLink: string;
}

const StugSection = ({
  data,
  title,
  description,
  imageLink,
}: StugSectionProps) => {
  const picLink = `/bilder/${imageLink}`;
  const picSrc = data[imageLink].childImageSharp.gatsbyImageData;

  return (
    <Container>
      <h3>{title}</h3>
      <StugImg alt={title} image={picSrc} />
      <p>{description}</p>
      <p>
        <Link to={picLink}>Fler bilder på stugan</Link>
      </p>
    </Container>
  );
};

export default StugSection;

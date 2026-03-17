import React from "react";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import Header from "./header";

vi.mock("gatsby-plugin-image", () => ({
  GatsbyImage: ({ alt }: { alt: string }) =>
    React.createElement("img", { alt }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.mocked(useStaticQuery).mockReturnValue({
      header: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    });
  });

  it("renders site title", () => {
    render(<Header siteTitle="Trollsjönäs" maxWidth={1100} />);
    expect(screen.getByText("Trollsjönäs")).toBeInTheDocument();
  });

  it("links to home page", () => {
    render(<Header siteTitle="Trollsjönäs" maxWidth={1100} />);
    expect(screen.getByText("Trollsjönäs").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders header image", () => {
    render(<Header siteTitle="Trollsjönäs" maxWidth={1100} />);
    expect(screen.getByAltText("header")).toBeInTheDocument();
  });
});

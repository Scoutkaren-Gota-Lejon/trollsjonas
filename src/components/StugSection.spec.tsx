import React from "react";
import { render, screen } from "@testing-library/react";
import StugSection from "./StugSection";

vi.mock("@emotion/styled", () => {
  const styled = (component: any) => (_styles: any) => (props: any) =>
    typeof component === "string"
      ? React.createElement(component, props)
      : React.createElement(component, props);
  return {
    default: new Proxy(styled, {
      get: (_target, tag) => (_styles: any) => (props: any) =>
        React.createElement(tag as string, props),
    }),
  };
});

vi.mock("gatsby-plugin-image", () => ({
  GatsbyImage: ({ alt }: { alt: string }) =>
    React.createElement("img", { alt }),
}));

describe("StugSection", () => {
  const mockData = {
    storstugan: {
      childImageSharp: {
        gatsbyImageData: {} as any,
      },
    },
  };

  it("renders title, description and link", () => {
    render(
      <StugSection
        data={mockData}
        title="Storstugan"
        description="A big cabin"
        imageLink="storstugan"
      />,
    );

    expect(screen.getByText("Storstugan")).toBeInTheDocument();
    expect(screen.getByText("A big cabin")).toBeInTheDocument();
    expect(screen.getByText("Fler bilder på stugan")).toHaveAttribute(
      "href",
      "/bilder/storstugan",
    );
  });

  it("renders image with correct alt text", () => {
    render(
      <StugSection
        data={mockData}
        title="Storstugan"
        description="desc"
        imageLink="storstugan"
      />,
    );

    expect(screen.getByAltText("Storstugan")).toBeInTheDocument();
  });
});

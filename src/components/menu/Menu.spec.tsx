import React from "react";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import Menu from "./Menu";

vi.mock("@emotion/styled", () => ({
  default: new Proxy((component: any) => component, {
    get: (_target, tag) => (_styles: any) => (props: any) =>
      React.createElement(tag as string, props),
  }),
}));

const mockMenuData = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          frontmatter: { title: "Start", menu: null, order: 1 },
          fields: { slug: "/" },
        },
      },
      {
        node: {
          frontmatter: { title: "Stugor", menu: "Stugor", order: 2 },
          fields: { slug: "/stugor/" },
        },
      },
      {
        node: {
          frontmatter: { title: "Kontakt", menu: null, order: 3 },
          fields: { slug: "/kontakt/" },
        },
      },
    ],
  },
};

describe("Menu", () => {
  beforeEach(() => {
    vi.mocked(useStaticQuery).mockReturnValue(mockMenuData);
  });

  it("renders menu items sorted by order", () => {
    render(<Menu maxWidth={1100} />);

    const links = screen.getAllByRole("link");
    const menuTexts = links.map((l) => l.textContent);

    expect(menuTexts).toContain("Start");
    expect(menuTexts).toContain("Stugor");
    expect(menuTexts).toContain("Kontakt");
  });

  it("uses menu field when available, falls back to title", () => {
    render(<Menu maxWidth={1100} />);

    expect(screen.getByText("Stugor")).toHaveAttribute("href", "/stugor/");
    expect(screen.getByText("Start")).toHaveAttribute("href", "/");
  });

  it("renders external Göta Lejon link", () => {
    render(<Menu maxWidth={1100} />);
    expect(screen.getByText("Scoutkåren Göta Lejon")).toHaveAttribute(
      "href",
      "https://gotalejon.org",
    );
  });
});

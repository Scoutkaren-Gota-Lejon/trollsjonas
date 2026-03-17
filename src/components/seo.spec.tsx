import React from "react";
import { render } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import { SeoHead } from "./seo";

describe("SeoHead", () => {
  beforeEach(() => {
    vi.mocked(useStaticQuery).mockReturnValue({
      site: {
        siteMetadata: {
          title: "Trollsjönäs",
          description: "Default description",
          author: "Test Author",
        },
      },
    });
  });

  it("renders title with site name", () => {
    render(<SeoHead title="Stugor" />, { container: document.head });
    expect(document.title).toBe("Stugor | Trollsjönäs");
  });

  it("uses provided description", () => {
    render(<SeoHead title="Test" description="Custom desc" />, {
      container: document.head,
    });
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute("content")).toBe("Custom desc");
  });

  it("falls back to site description", () => {
    render(<SeoHead title="Test" />, { container: document.head });
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute("content")).toBe("Default description");
  });

  it("renders keywords meta tag", () => {
    render(<SeoHead title="Test" keywords={["stuga", "hyra"]} />, {
      container: document.head,
    });
    const meta = document.querySelector('meta[name="keywords"]');
    expect(meta?.getAttribute("content")).toBe("stuga, hyra");
  });

  it("omits keywords meta tag when no keywords", () => {
    render(<SeoHead title="Test" />, { container: document.head });
    const meta = document.querySelector('meta[name="keywords"]');
    expect(meta).toBeNull();
  });

  it("renders og:type meta tag", () => {
    render(<SeoHead title="Test" />, { container: document.head });
    const meta = document.querySelector('meta[property="og:type"]');
    expect(meta?.getAttribute("content")).toBe("website");
  });
});

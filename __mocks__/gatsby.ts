import React from "react";
import { vi } from "vitest";

export const graphql = vi.fn();
export const navigate = vi.fn();
export const useStaticQuery = vi.fn();
export const StaticQuery = vi.fn();

export const Link = vi.fn().mockImplementation(
  ({ activeClassName, activeStyle, partiallyActive, to, ...rest }: any) =>
    React.createElement("a", { ...rest, href: to })
);

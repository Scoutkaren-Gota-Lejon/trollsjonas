import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceCalc from "./PriceCalc";

// Mock emotion styled to render plain elements
vi.mock("@emotion/styled", () => ({
  default: new Proxy((component: any) => component, {
    get: (_target, tag) => (_styles: any) => (props: any) =>
      React.createElement(tag as string, props),
  }),
}));

describe("PriceCalc", () => {
  it("shows dash with no input", () => {
    render(<PriceCalc />);
    expect(screen.getByText(/Pris: - kr/)).toBeInTheDocument();
  });

  it("calculates 20 persons x 3 days = 5400 kr", async () => {
    render(<PriceCalc />);
    const user = userEvent.setup();

    const persons = screen.getByLabelText("Antal personer");
    const days = screen.getByLabelText("Antal dagar");

    await user.type(persons, "20");
    await user.type(days, "3");

    expect(screen.getByText(/Pris: 5400 kr/)).toBeInTheDocument();
  });

  it("enforces minimum 16 persons: 5 persons x 2 days = 2880 kr", async () => {
    render(<PriceCalc />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Antal personer"), "5");
    await user.type(screen.getByLabelText("Antal dagar"), "2");

    expect(screen.getByText(/Pris: 2880 kr/)).toBeInTheDocument();
  });

  it("applies scouting discount: 20 persons x 1 day = 1500 kr", async () => {
    render(<PriceCalc />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Antal personer"), "20");
    await user.type(screen.getByLabelText("Antal dagar"), "1");
    await user.click(screen.getByLabelText("Scoutkår"));

    expect(screen.getByText(/Pris: 1500 kr/)).toBeInTheDocument();
  });

  it("returns to dash when input is cleared", async () => {
    render(<PriceCalc />);
    const user = userEvent.setup();

    const persons = screen.getByLabelText("Antal personer");
    await user.type(persons, "20");
    await user.type(screen.getByLabelText("Antal dagar"), "1");

    expect(screen.getByText(/Pris: 1800 kr/)).toBeInTheDocument();

    await user.clear(persons);

    expect(screen.getByText(/Pris: - kr/)).toBeInTheDocument();
  });
});

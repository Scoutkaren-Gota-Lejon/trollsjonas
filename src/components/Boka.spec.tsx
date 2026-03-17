import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Boka from "./Boka";

vi.mock("@emotion/styled", () => ({
  default: new Proxy((component: any) => component, {
    get: (_target, tag) => (_styles: any) => (props: any) =>
      React.createElement(tag as string, props),
  }),
}));

vi.mock("@mui/x-date-pickers/AdapterDateFns", () => ({
  AdapterDateFns: class {},
}));

vi.mock("@mui/x-date-pickers/LocalizationProvider", () => ({
  LocalizationProvider: ({ children }: any) =>
    React.createElement(React.Fragment, null, children),
}));

vi.mock("@mui/x-date-pickers/DatePicker", () => ({
  DatePicker: () =>
    React.createElement("input", { "data-testid": "datepicker" }),
}));

vi.mock("../backend-api/utils", () => ({
  makeServerPost: vi.fn(),
}));

import { makeServerPost } from "../backend-api/utils";

describe("Boka", () => {
  beforeEach(() => {
    vi.mocked(makeServerPost).mockReset();
  });

  it("renders the booking form with expected fields", () => {
    render(<Boka />);
    expect(screen.getByText("Bokningsförfrågan")).toBeInTheDocument();
    expect(screen.getByLabelText("Förening/Organisation")).toBeInTheDocument();
    expect(screen.getByLabelText("Namn")).toBeInTheDocument();
    expect(screen.getByLabelText("E-post")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefon")).toBeInTheDocument();
    expect(screen.getByLabelText("Antal personer")).toBeInTheDocument();
    expect(screen.getByLabelText("Hyra kanoter")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Skicka förfrågan" }),
    ).toBeInTheDocument();
  });

  it("shows thank you message on successful submission", async () => {
    vi.mocked(makeServerPost).mockResolvedValue({});
    const user = userEvent.setup();

    render(<Boka />);

    await user.type(screen.getByLabelText("Namn"), "Test");
    await user.type(screen.getByLabelText("E-post"), "test@test.se");
    await user.click(screen.getByRole("button", { name: "Skicka förfrågan" }));

    expect(
      await screen.findByText(/Tack för din förfrågan/),
    ).toBeInTheDocument();
    expect(makeServerPost).toHaveBeenCalledWith(
      "booking.php",
      expect.objectContaining({
        booking: true,
        name: "Test",
        email: "test@test.se",
      }),
    );
  });

  it("shows error message on failed submission", async () => {
    vi.mocked(makeServerPost).mockRejectedValue(new Error("fail"));
    const user = userEvent.setup();

    render(<Boka />);

    await user.click(screen.getByRole("button", { name: "Skicka förfrågan" }));

    expect(await screen.findByText(/Något gick fel/)).toBeInTheDocument();
  });
});

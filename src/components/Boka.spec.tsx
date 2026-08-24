import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Boka from "./Boka";

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

    await user.type(screen.getByLabelText("E-post"), "test@test.se");
    await user.click(screen.getByRole("button", { name: "Skicka förfrågan" }));

    expect(await screen.findByText(/Något gick fel/)).toBeInTheDocument();
  });

  it("shows error for invalid email and does not submit", async () => {
    const user = userEvent.setup();

    render(<Boka />);

    await user.type(screen.getByLabelText("E-post"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Skicka förfrågan" }));

    expect(screen.getByText("Ange en giltig e-postadress")).toBeInTheDocument();
    expect(makeServerPost).not.toHaveBeenCalled();
  });

  it("shows error for empty email and does not submit", async () => {
    const user = userEvent.setup();

    render(<Boka />);

    await user.click(screen.getByRole("button", { name: "Skicka förfrågan" }));

    expect(screen.getByText("Ange en giltig e-postadress")).toBeInTheDocument();
    expect(makeServerPost).not.toHaveBeenCalled();
  });

  it("clears email error when user types a valid email", async () => {
    const user = userEvent.setup();

    render(<Boka />);

    // Submit with invalid email to trigger error
    await user.type(screen.getByLabelText("E-post"), "bad");
    await user.click(screen.getByRole("button", { name: "Skicka förfrågan" }));
    expect(screen.getByText("Ange en giltig e-postadress")).toBeInTheDocument();

    // Clear and type valid email — error should clear without resubmitting
    await user.clear(screen.getByLabelText("E-post"));
    await user.type(screen.getByLabelText("E-post"), "valid@example.com");

    expect(
      screen.queryByText("Ange en giltig e-postadress"),
    ).not.toBeInTheDocument();
  });
});

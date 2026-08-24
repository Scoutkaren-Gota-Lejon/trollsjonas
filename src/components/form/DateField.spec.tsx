import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateField from "./DateField";

const lastDate = (fn: ReturnType<typeof vi.fn>): Date | null =>
  fn.mock.calls[fn.mock.calls.length - 1][0];

describe("DateField", () => {
  const may2024 = new Date(2024, 4, 10);

  it("shows a placeholder until a date is chosen", () => {
    render(
      <DateField label="Från" name="from" value={null} onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText("Från")).toHaveValue("");
    expect(screen.getByPlaceholderText("åååå-mm-dd")).toBeInTheDocument();
  });

  it("displays the selected date as yyyy-MM-dd", () => {
    render(
      <DateField label="Från" name="from" value={may2024} onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText("Från")).toHaveValue("2024-05-10");
  });

  it("accepts a date typed directly into the field", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DateField label="Från" name="from" value={null} onChange={onChange} />,
    );

    await user.type(screen.getByLabelText("Från"), "2024-05-15");

    const typed = lastDate(onChange);
    expect(typed).toBeInstanceOf(Date);
    expect(typed!.getFullYear()).toBe(2024);
    expect(typed!.getMonth()).toBe(4);
    expect(typed!.getDate()).toBe(15);
  });

  it("ignores an unparseable typed value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DateField label="Från" name="from" value={null} onChange={onChange} />,
    );

    await user.type(screen.getByLabelText("Från"), "inte-ett-datum");

    // strictParsing suppresses onChange entirely for input that cannot be
    // parsed, so the assertion is that no date ever reaches the form.
    const reported = onChange.mock.calls.map(([date]) => date);
    expect(reported.some((date) => date instanceof Date)).toBe(false);
  });

  it("opens the calendar on focus and reports the picked day", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DateField
        label="Från"
        name="from"
        value={may2024}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Från"));
    await user.click(screen.getByRole("gridcell", { name: /\b15 maj 2024/ }));

    const picked = lastDate(onChange);
    expect(picked!.getMonth()).toBe(4);
    expect(picked!.getDate()).toBe(15);
  });

  it("disables days before minDate", async () => {
    const user = userEvent.setup();
    render(
      <DateField
        label="Till"
        name="to"
        value={may2024}
        onChange={vi.fn()}
        minDate={may2024}
      />,
    );

    await user.click(screen.getByLabelText("Till"));

    // The 9th precedes minDate; the 10th is minDate itself and stays selectable.
    expect(
      screen.getByRole("gridcell", { name: /\b9 maj 2024/ }),
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.getByRole("gridcell", { name: /\b10 maj 2024/ }),
    ).not.toHaveAttribute("aria-disabled", "true");
  });
});

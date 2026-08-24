import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateField from "./DateField";

describe("DateField", () => {
  it("renders a native date input wired to its label", () => {
    render(<DateField label="Från" name="from" value="" onChange={vi.fn()} />);

    const input = screen.getByLabelText("Från");
    expect(input).toHaveAttribute("type", "date");
    expect(input).toHaveAttribute("name", "from");
    expect(input).toHaveValue("");
  });

  it("displays the current value", () => {
    render(
      <DateField
        label="Från"
        name="from"
        value="2024-05-10"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Från")).toHaveValue("2024-05-10");
  });

  it("reports a typed date as an ISO string", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DateField label="Från" name="from" value="" onChange={onChange} />);

    await user.type(screen.getByLabelText("Från"), "2024-05-15");

    expect(onChange).toHaveBeenLastCalledWith("2024-05-15");
  });

  it("passes minDate through as the input's min attribute", () => {
    render(
      <DateField
        label="Till"
        name="to"
        value=""
        onChange={vi.fn()}
        min="2024-05-10"
      />,
    );

    expect(screen.getByLabelText("Till")).toHaveAttribute("min", "2024-05-10");
  });

  it("omits min when no lower bound is given", () => {
    render(<DateField label="Från" name="from" value="" onChange={vi.fn()} />);

    expect(screen.getByLabelText("Från")).not.toHaveAttribute("min");
  });
});

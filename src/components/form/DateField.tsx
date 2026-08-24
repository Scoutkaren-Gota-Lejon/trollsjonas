import DatePicker, { registerLocale } from "react-datepicker";
import { shift, size } from "@floating-ui/react";
import { sv } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-theme.css";

// react-datepicker looks locales up by name, so date-fns' `sv` is registered
// once at module load rather than passed as an object on every render.
registerLocale("sv", sv);

// react-datepicker's built-in middleware is flip + offset + arrow. `flip` only
// works on the main axis, so nothing stops the calendar running off the side of
// the viewport — the "Från" popup sat 29px off the left edge below 1024px, and
// "Till" ran off the right on phones. `shift` slides it back into view; `size`
// caps its width so it still fits when the viewport is narrower than the
// calendar itself.
const POPPER_MIDDLEWARE = [
  shift({ padding: 8 }),
  size({
    padding: 8,
    apply({ availableWidth, elements }) {
      elements.floating.style.setProperty(
        "max-width",
        `${Math.max(0, availableWidth)}px`,
      );
    },
  }),
];

interface DateFieldProps {
  label: string;
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  /** Days before this are unselectable (MUI's old disablePast/minDate). */
  minDate?: Date;
}

/**
 * Date entry for the booking form. The date can be typed directly as
 * yyyy-MM-dd or chosen from the calendar popover.
 */
export default function DateField({
  label,
  name,
  value,
  onChange,
  minDate,
}: DateFieldProps) {
  const id = `field-${name}`;

  return (
    <div className="datefield">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <DatePicker
        id={id}
        name={name}
        selected={value}
        onChange={onChange}
        minDate={minDate}
        locale="sv"
        dateFormat="yyyy-MM-dd"
        placeholderText="åååå-mm-dd"
        autoComplete="off"
        // Lets a typed value be parsed as the user goes, rather than only on blur.
        strictParsing
        showPopperArrow={false}
        popperModifiers={POPPER_MIDDLEWARE}
        // Day cells default to English "Choose …" / "Not available …" prefixes.
        chooseDayAriaLabelPrefix="Välj"
        disabledDayAriaLabelPrefix="Inte tillgänglig"
        className="w-[150px] rounded border border-neutral-400 bg-white px-3 py-2
          text-base outline-none transition-colors focus:border-[#bc360a]
          focus:ring-1 focus:ring-[#bc360a]"
      />
    </div>
  );
}

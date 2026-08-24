const base =
  "rounded border bg-white px-3 py-2 text-base text-neutral-900 " +
  "outline-none transition-colors " +
  "focus:border-[#bc360a] focus:ring-1 focus:ring-[#bc360a]";

interface DateFieldProps {
  label: string;
  name: string;
  /** ISO yyyy-MM-dd, or "" when unset — the native input's own value format. */
  value: string;
  onChange: (value: string) => void;
  /** Earliest selectable date, ISO yyyy-MM-dd. */
  min?: string;
}

/**
 * Native date entry. The browser supplies the calendar, keyboard entry and
 * locale-appropriate display, and `min` covers what MUI called disablePast and
 * minDate. The value is already ISO, which is exactly what the booking API
 * expects, so no formatting or parsing is needed on either side.
 */
export default function DateField({
  label,
  name,
  value,
  onChange,
  min,
}: DateFieldProps) {
  const id = `field-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        className={`${base} w-[170px] border-neutral-400`}
      />
    </div>
  );
}

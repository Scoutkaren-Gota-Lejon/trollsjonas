import React from "react";

const base =
  "w-full rounded border bg-white px-3 py-2 text-base text-neutral-900 " +
  "outline-none transition-colors placeholder:text-neutral-400 " +
  "focus:border-[#bc360a] focus:ring-1 focus:ring-[#bc360a]";

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

/**
 * Replaces the MUI `TextField` wrapper that both Boka and PriceCalc defined.
 * The `name` attribute is load-bearing: the booking form reads values off
 * form.elements by name, and the Playwright specs select on it.
 */
export default function TextField({
  label,
  name,
  type = "text",
  value,
  defaultValue,
  error,
  multiline = false,
  rows = 2,
  onChange,
}: TextFieldProps) {
  const id = `field-${name}`;
  const border = error ? "border-red-600" : "border-neutral-400";
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={label}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${base} ${border} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={label}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${base} ${border}`}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 mb-0 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

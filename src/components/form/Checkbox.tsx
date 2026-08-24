interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** Replaces MUI `Checkbox` + `FormControlLabel`. */
export default function Checkbox({
  label,
  name,
  checked,
  onChange,
}: CheckboxProps) {
  const id = `field-${name}`;

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 shrink-0 accent-[#bc360a]"
      />
      <label htmlFor={id} className="cursor-pointer select-none text-base">
        {label}
      </label>
    </div>
  );
}

"use client";

type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export default function Select({
  label,
  name,
  value,
  options,
  placeholder = "Selecione",
  required = false,
  disabled = false,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
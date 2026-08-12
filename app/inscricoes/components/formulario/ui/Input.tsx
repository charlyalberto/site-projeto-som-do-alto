"use client";

type InputProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  full?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function Input({
  label,
  name,
  value,
  placeholder,
  type = "text",
  min,
  max,
  required = false,
  disabled = false,
  readOnly = false,
  full = false,
  onChange,
}: InputProps) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition ${
          readOnly || disabled
            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
            : "focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        }`}
      />
    </div>
  );
}
"use client";

type TextareaProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export default function Textarea({
  label,
  name,
  value,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
  onChange,
}: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
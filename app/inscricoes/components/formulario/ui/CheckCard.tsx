"use client";

type CheckCardProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export default function CheckCard({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckCardProps) {
  return (
    <label
      className={`flex items-center gap-3 border-2 rounded-2xl p-4 transition ${
        disabled
          ? "opacity-40 cursor-not-allowed border-gray-200"
          : checked
          ? "border-orange-500 bg-orange-50 cursor-pointer"
          : "border-gray-200 bg-white hover:border-orange-300 cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="w-5 h-5 accent-orange-500 shrink-0"
      />

      <span className="text-sm font-semibold text-gray-700">
        {label}
      </span>
    </label>
  );
}
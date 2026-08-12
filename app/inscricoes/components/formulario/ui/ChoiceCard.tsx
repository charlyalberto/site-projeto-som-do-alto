"use client";

type ChoiceCardProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
  icon?: string;
  disabled?: boolean;
};

export default function ChoiceCard({
  title,
  selected,
  onClick,
  description,
  icon,
  disabled = false,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left border-2 rounded-2xl p-5 transition ${
        selected
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 bg-white hover:border-orange-300"
      } ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-4">

        {icon && (
          <div className="text-3xl shrink-0">
            {icon}
          </div>
        )}

        <div className="flex-1">

          <p className="font-bold text-gray-900">
            {title}
          </p>

          {description && (
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          )}

        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            selected
              ? "border-orange-500 bg-orange-500"
              : "border-gray-300"
          }`}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>

      </div>
    </button>
  );
}
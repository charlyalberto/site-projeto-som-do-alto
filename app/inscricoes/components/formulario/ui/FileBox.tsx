"use client";

type FileBoxProps = {
  title: string;
  description: string;
  name: string;
  accept: string;
  value: File | null;
  onChange: (file: File | null) => void;
};

export default function FileBox({
  title,
  description,
  name,
  accept,
  value,
  onChange,
}: FileBoxProps) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-orange-300 transition">

      <div className="flex items-start gap-4">

        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl shrink-0">
          📎
        </div>

        <div className="flex-1">

          <h3 className="font-bold text-lg text-gray-900">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            {description}
          </p>

          <input
            type="file"
            name={name}
            accept={accept}
            onChange={(e) =>
              onChange(
                e.target.files?.[0] || null
              )
            }
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-orange-100 file:text-orange-700 file:font-semibold hover:file:bg-orange-200"
          />

          {value && (
            <p className="text-sm text-green-600 font-semibold mt-3">
              ✓ {value.name}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}
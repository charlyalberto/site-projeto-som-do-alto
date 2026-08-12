"use client";

type SectionTitleProps = {
  icon: string;
  title: string;
  description: string;
};

export default function SectionTitle({
  icon,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="text-gray-500 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
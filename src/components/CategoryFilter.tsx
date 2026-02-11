"use client";

import { CATEGORIES } from "@/lib/constants";
import clsx from "clsx";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-1">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onCategoryChange(value)}
            className={clsx(
              "glass-pill",
              selectedCategory === value && "glass-pill-active"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

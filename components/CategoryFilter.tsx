"use client";

import { Badge } from "./ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground">Filter:</span>
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                   ${
                     selectedCategory === null
                       ? "bg-primary text-primary-foreground shadow-md scale-105"
                       : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
                   }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize
                     ${
                       selectedCategory === category
                         ? "bg-primary text-primary-foreground shadow-md scale-105"
                         : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105"
                     }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

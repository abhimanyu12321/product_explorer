"use client";

import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative w-full max-w-md transition-all duration-300 ${
        isFocused ? "scale-[1.02]" : ""
      }`}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-10 h-12 text-base bg-background/50 backdrop-blur-sm border-2 
                   focus:border-primary/50 focus:ring-2 focus:ring-primary/20 
                   transition-all duration-300 shadow-sm hover:shadow-md"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground 
                     hover:text-foreground transition-colors p-1 rounded-full 
                     hover:bg-muted/50"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

"use client";
import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function SearchInput({ placeholder = "Search...", ...props }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full md:w-64 px-3 py-2 text-sm border border-accent rounded dark:bg-background dark:text-stone-900 dark:border-gray-700"
      {...props}
    />
  );
}

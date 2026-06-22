"use client";

import type { SVGProps } from "react";

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M4 5h16l-6 7.5V19l-4 2v-8.5z" />
    </svg>
  );
}

type ListingSearchBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilterCount: number;
  onOpenFilters: () => void;
  autoFocus?: boolean;
};

export function ListingSearchBar({
  searchValue,
  onSearchChange,
  activeFilterCount,
  onOpenFilters,
  autoFocus = false,
}: ListingSearchBarProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          autoFocus={autoFocus}
          className="w-full min-h-11 rounded-xl border border-border bg-card pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, area, specialty..."
          type="text"
          value={searchValue}
        />
        <SearchIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
      </div>
      <button
        className={`min-h-11 shrink-0 rounded-xl border px-4 flex items-center gap-2 text-sm font-medium transition-colors ${
          activeFilterCount > 0
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card text-foreground hover:border-primary/40"
        }`}
        onClick={onOpenFilters}
        type="button"
      >
        <FilterIcon className="size-4 shrink-0" />
        Filters
        {activeFilterCount > 0 ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {activeFilterCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}

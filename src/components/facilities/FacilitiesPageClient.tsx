"use client";

import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import type { Facility } from "@/types/facility";
import { useMemo, useState } from "react";

const ALL_CATEGORY = "All";

const CATEGORY_LABELS = [
  ALL_CATEGORY,
  "Clinic",
  "Hospital",
  "Laboratory",
  "Diagnostic center",
];

type FacilitiesPageClientProps = {
  facilities: Facility[];
};

export function FacilitiesPageClient({ facilities }: FacilitiesPageClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilities.filter((f) => {
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.subcategory.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === ALL_CATEGORY ||
        f.category.toLowerCase().includes(activeCategory.toLowerCase());

      return matchesQuery && matchesCategory;
    });
  }, [facilities, query, activeCategory]);

  return (
    <div className="grid gap-6">
      {/* Search */}
      <section className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
        <label
          className="mb-2 block text-sm font-semibold text-foreground"
          htmlFor="facility-search"
        >
          Search facilities
        </label>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            id="facility-search"
            className="min-h-13 w-full rounded-md border border-border bg-input px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-primary sm:min-h-14 sm:px-4"
            placeholder="Search by name, area, or type"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="min-h-12 rounded-md border border-border bg-card px-5 text-sm font-semibold text-muted-foreground hover:text-foreground md:min-h-14"
              type="button"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {filtered.length === facilities.length
            ? `Showing all ${facilities.length} facilities`
            : `${filtered.length} of ${facilities.length} facilities match`}
        </p>
      </section>

      {/* Category chips */}
      <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <p className="text-sm font-semibold text-foreground">Filter by type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORY_LABELS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground">
            {activeCategory === ALL_CATEGORY ? "All facilities" : activeCategory + "s"}
          </h2>
          {query && (
            <p className="mt-1 text-sm text-muted-foreground">
              Results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-base font-semibold text-foreground">
              No facilities found
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(ALL_CATEGORY);
              }}
              className="mt-4 inline-flex min-h-10 items-center rounded-md border border-border bg-card px-4 text-sm font-semibold text-primary"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <FacilityCardGrid facilities={filtered} />
        )}
      </section>
    </div>
  );
}

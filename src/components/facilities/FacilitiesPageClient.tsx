"use client";

import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import type { Facility } from "@/types/facility";
import { useMemo, useState } from "react";

const ALL_CATEGORY = "All";

const CATEGORY_TABS = [
  { label: "All", value: ALL_CATEGORY },
  { label: "Hospitals", value: "Hospital" },
  { label: "Specialty Centres", value: "Specialty" },
  { label: "Clinics", value: "Clinic" },
  { label: "Diagnostics", value: "Diagnostic Center" },
  { label: "Pharmacy", value: "Pharmacy" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Hospital: "#1d4ed8",
  Clinic: "#0e9f9a",
  "Diagnostic Center": "#7c3aed",
  Pharmacy: "#059669",
  Specialty: "#0e9f9a",
};

type Props = { facilities: Facility[] };

export function FacilitiesPageClient({ facilities }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [activeSubcity, setActiveSubcity] = useState("");

  const subcities = useMemo(() => {
    const seen = new Set<string>();
    facilities.forEach((f) => {
      const sc = f.subcity?.toLowerCase();
      if (sc && sc !== "online" && !sc.includes("/") && !sc.includes("multiple")) {
        seen.add(sc);
      }
    });
    return Array.from(seen).sort();
  }, [facilities]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { [ALL_CATEGORY]: facilities.length };
    CATEGORY_TABS.slice(1).forEach(({ value }) => {
      counts[value] = facilities.filter((f) => {
        if (value === "Specialty") {
          return f.facilityType === "Specialty Center" || f.facilityType === "Medical Plaza";
        }
        return f.category === value;
      }).length;
    });
    return counts;
  }, [facilities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilities.filter((f) => {
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.subcategory.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.subcity?.toLowerCase().includes(q) ||
        f.area?.toLowerCase().includes(q) ||
        f.specialtyCategory?.toLowerCase().includes(q) ||
        f.services.some((s) => s.toLowerCase().includes(q));

      const matchesCategory =
        activeCategory === ALL_CATEGORY ||
        (activeCategory === "Specialty"
          ? f.facilityType === "Specialty Center" || f.facilityType === "Medical Plaza"
          : f.category === activeCategory);

      const matchesSubcity =
        !activeSubcity || f.subcity?.toLowerCase().includes(activeSubcity);

      return matchesQuery && matchesCategory && matchesSubcity;
    });
  }, [facilities, query, activeCategory, activeSubcity]);

  const activeColor = CATEGORY_COLORS[activeCategory] ?? "#0f4c81";

  return (
    <div className="grid gap-5">
      {/* Search bar */}
      <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <label className="mb-2.5 block text-sm font-semibold text-foreground" htmlFor="facility-search">
          Search facilities
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="facility-search"
            className="h-12 w-full rounded-lg border border-border bg-input pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary sm:h-13"
            placeholder="Search by name, area, specialty, or service…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">
          {filtered.length === facilities.length
            ? `${facilities.length} facilities`
            : `${filtered.length} of ${facilities.length} match`}
        </p>
      </section>

      {/* Category pill tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {CATEGORY_TABS.map(({ label, value }) => {
          const isActive = activeCategory === value;
          const color = CATEGORY_COLORS[value] ?? "#0f4c81";
          return (
            <button
              key={value}
              type="button"
              onClick={() => setActiveCategory(value)}
              aria-pressed={isActive}
              className={`shrink-0 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-transparent text-white"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
              style={isActive ? { background: color } : undefined}
            >
              {label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {tabCounts[value] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-city filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sub-city:</span>
        <button
          type="button"
          onClick={() => setActiveSubcity("")}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            activeSubcity === "" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          All
        </button>
        {subcities.slice(0, 8).map((sc) => (
          <button
            key={sc}
            type="button"
            onClick={() => setActiveSubcity(sc)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-colors ${
              activeSubcity === sc ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            {sc}
          </button>
        ))}
      </div>

      {/* Results */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="h-5 w-1 rounded-full" style={{ background: activeColor }} />
          <h2 className="text-xl font-bold text-foreground">
            {activeCategory === ALL_CATEGORY
              ? "All facilities"
              : CATEGORY_TABS.find((t) => t.value === activeCategory)?.label}
          </h2>
          {query && (
            <span className="text-sm text-muted-foreground">
              · results for &ldquo;{query}&rdquo;
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <p className="text-base font-semibold text-foreground">No facilities found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or filter.
            </p>
            <button
              type="button"
              onClick={() => { setQuery(""); setActiveCategory(ALL_CATEGORY); setActiveSubcity(""); }}
              className="mt-4 inline-flex min-h-10 items-center rounded-full border border-primary px-5 text-sm font-semibold text-primary"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <FacilityCardGrid facilities={filtered} />
        )}
      </section>
    </div>
  );
}

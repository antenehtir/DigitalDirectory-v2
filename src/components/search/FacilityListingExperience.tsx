"use client";

import { Suspense, type ReactNode } from "react";
import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import { filterFacilitiesByQuery, type FacilityCategoryFilter } from "@/lib/frontend-search-filters";
import { facilityMatchesListingFilters } from "@/lib/listing-filters";
import type { Facility } from "@/types/facility";
import { FilterModal } from "./FilterModal";
import { ListingSearchBar } from "./ListingSearchBar";
import { useListingFilterModal } from "./use-listing-filter-modal";

type FacilityListingExperienceProps = {
  facilities: Facility[];
  lockedType?: FacilityCategoryFilter;
  emptyState?: ReactNode;
};

export function FacilityListingExperience(props: FacilityListingExperienceProps) {
  return (
    <Suspense>
      <FacilityListingExperienceInner {...props} />
    </Suspense>
  );
}

function FacilityListingExperienceInner({
  facilities,
  lockedType,
  emptyState,
}: FacilityListingExperienceProps) {
  const {
    isOpen,
    open,
    close,
    filters,
    query,
    setQuery,
    applyFilters,
    resetFilters,
    activeFilterCount,
  } = useListingFilterModal();

  const effectiveFilters = lockedType ? { ...filters, type: lockedType } : filters;
  const visibleFilterCount = lockedType
    ? activeFilterCount - (filters.type ? 1 : 0)
    : activeFilterCount;

  const results = filterFacilitiesByQuery(facilities, query).filter((facility) =>
    facilityMatchesListingFilters(facility, effectiveFilters),
  );

  return (
    <div className="grid gap-4">
      <ListingSearchBar
        activeFilterCount={visibleFilterCount}
        onOpenFilters={open}
        onSearchChange={setQuery}
        searchValue={query}
      />

      <FilterModal
        filters={filters}
        isOpen={isOpen}
        lockedType={lockedType}
        onApply={applyFilters}
        onClose={close}
        onReset={() => resetFilters(lockedType)}
      />

      {results.length > 0 ? (
        <FacilityCardGrid facilities={results} />
      ) : (
        emptyState ?? (
          <p className="text-sm leading-6 text-muted-foreground">
            No matches yet. Try clearing filters or searching another term.
          </p>
        )
      )}
    </div>
  );
}

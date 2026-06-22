"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  countActiveListingFilters,
  readListingFiltersFromSearchParams,
  writeListingFiltersToSearchParams,
  type ListingFilters,
} from "@/lib/listing-filters";

export function useListingFilterModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const filters = readListingFiltersFromSearchParams(searchParams);
  const query = searchParams.get("q") ?? "";

  const setQuery = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const applyFilters = useCallback(
    (next: ListingFilters) => {
      const params = new URLSearchParams(searchParams.toString());
      writeListingFiltersToSearchParams(params, next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    filters,
    query,
    setQuery,
    applyFilters,
    resetFilters,
    activeFilterCount: countActiveListingFilters(filters),
  };
}

import type { Facility } from "@/types/facility";

export type SearchSuggestion = {
  id: string;
  name: string;
  metadata: string;
  detailHref?: string;
};

export function getProviderSearchSuggestions(
  facilities: Facility[],
  query: string,
  limit = 6,
): SearchSuggestion[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  return facilities
    .filter((facility) =>
      [
        facility.name,
        facility.category,
        facility.subcategory,
        facility.location,
        facility.address,
        ...facility.services,
      ]
        .map(normalizeSearchText)
        .some((value) => value.includes(normalizedQuery)),
    )
    .slice(0, limit)
    .map((facility) => ({
      id: facility.id,
      name: facility.name,
      metadata: [facility.category, facility.location].filter(Boolean).join(" | "),
      detailHref: facility.detailHref ?? `/facilities/${facility.slug}`,
    }));
}

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

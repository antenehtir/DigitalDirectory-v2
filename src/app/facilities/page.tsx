import { FacilitiesPage } from "@/components/facilities/FacilitiesPage";
import { PageShell } from "@/components/layout/PageShell";
import { realFacilities } from "@/data/real-facility-profiles";
import {
  filterFacilitiesByCategory,
  filterFacilitiesByQuery,
  getFacilityCategoryLabel,
  normalizeFacilityCategoryParam,
  normalizeSearchParam,
} from "@/lib/frontend-search-filters";

export const dynamic = "force-dynamic";

type FacilitiesRouteProps = {
  searchParams?: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
};

export default async function FacilitiesRoute({
  searchParams,
}: FacilitiesRouteProps) {
  const params = await searchParams;
  const category = normalizeFacilityCategoryParam(params?.category);
  const query = normalizeSearchParam(params?.q);
  const facilities = filterFacilitiesByQuery(
    filterFacilitiesByCategory(realFacilities, category),
    query,
  );

  return (
    <PageShell>
      <FacilitiesPage
        activeCategory={category}
        activeCategoryLabel={getFacilityCategoryLabel(category)}
        activeQuery={query}
        facilities={facilities}
      />
    </PageShell>
  );
}

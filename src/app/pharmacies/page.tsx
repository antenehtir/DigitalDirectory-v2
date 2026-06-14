import { PageShell } from "@/components/layout/PageShell";
import { PharmaciesPage } from "@/components/pharmacies/PharmaciesPage";
import { realFacilities } from "@/data/real-facility-profiles";
import {
  filterFacilitiesByQuery,
  normalizeSearchParam,
} from "@/lib/frontend-search-filters";
import type { Facility } from "@/types/facility";

export const dynamic = "force-dynamic";

type PharmaciesRouteProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function PharmaciesRoute({
  searchParams,
}: PharmaciesRouteProps) {
  const params = await searchParams;
  const query = normalizeSearchParam(params?.q);
  const pharmacies = filterFacilitiesByQuery(await getPharmaciesForRoute(), query);

  return (
    <PageShell>
      <PharmaciesPage activeQuery={query} pharmacies={pharmacies} />
    </PageShell>
  );
}

async function getPharmaciesForRoute(): Promise<Facility[]> {
  return realFacilities.filter((facility) =>
    [facility.category, facility.subcategory, facility.name, ...facility.services]
      .join(" ")
      .toLowerCase()
      .includes("pharmacy"),
  );
}

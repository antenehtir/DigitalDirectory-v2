import { DiagnosticsPage } from "@/components/diagnostics/DiagnosticsPage";
import { PageShell } from "@/components/layout/PageShell";
import { realFacilities } from "@/data/real-facility-profiles";
import type { Facility } from "@/types/facility";

export const dynamic = "force-dynamic";

export default async function DiagnosticsRoute() {
  const diagnostics = await getDiagnosticsForRoute();

  return (
    <PageShell>
      <DiagnosticsPage diagnostics={diagnostics} />
    </PageShell>
  );
}

async function getDiagnosticsForRoute(): Promise<Facility[]> {
  return realFacilities.filter((facility) =>
    [
      facility.category,
      facility.subcategory,
      facility.name,
      ...facility.services,
    ]
      .join(" ")
      .toLowerCase()
      .match(/diagnostic|laboratory|lab|imaging|radiology/),
  );
}

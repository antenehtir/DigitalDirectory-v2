import { notFound } from "next/navigation";

import { FacilityDetailPage } from "@/components/facility-detail/FacilityDetailPage";
import { PageShell } from "@/components/layout/PageShell";
import { getRealFacilityBySlug } from "@/data/real-facility-profiles";

export const dynamic = "force-dynamic";

type PharmacyDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PharmacyDetailRoute({
  params,
}: PharmacyDetailRouteProps) {
  const { slug } = await params;
  const facility = getRealFacilityBySlug(slug);

  if (!facility || !isPharmacyFacility(facility)) {
    notFound();
  }

  return (
    <PageShell>
      <FacilityDetailPage facility={facility} />
    </PageShell>
  );
}

function isPharmacyFacility(facility: { category: string; subcategory: string }) {
  return [facility.category, facility.subcategory]
    .join(" ")
    .toLowerCase()
    .includes("pharmacy");
}

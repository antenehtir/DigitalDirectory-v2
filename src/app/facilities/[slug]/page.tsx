import { notFound } from "next/navigation";

import { FacilityDetailPage } from "@/components/facility-detail/FacilityDetailPage";
import { PageShell } from "@/components/layout/PageShell";
import {
  getRealFacilityBySlug,
  getSimilarRealFacilities,
} from "@/data/real-facility-profiles";

export const dynamic = "force-dynamic";

type FacilityDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FacilityDetailRoute({
  params,
}: FacilityDetailRouteProps) {
  const { slug } = await params;
  const facility = getRealFacilityBySlug(slug);

  if (!facility) {
    notFound();
  }

  return (
    <PageShell>
      <FacilityDetailPage
        facility={facility}
        similarFacilities={getSimilarRealFacilities(facility)}
      />
    </PageShell>
  );
}

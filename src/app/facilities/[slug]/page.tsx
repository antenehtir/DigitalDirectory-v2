import { notFound } from "next/navigation";

import { FacilityDetailPage } from "@/components/facility-detail/FacilityDetailPage";
import { PageShell } from "@/components/layout/PageShell";
import { getSupabasePublicFacilityDetailBySlug } from "@/lib/supabase/facilities-public-read";
import type { Facility } from "@/types/facility";
import type { PublicProviderDetail } from "@/types/public-listings";

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
  const result = await getSafeFacilityDetail(slug);

  if (result.status !== "success") {
    notFound();
  }

  return (
    <PageShell>
      <FacilityDetailPage
        facility={mapPublicProviderDetailToFacility(result.detail)}
      />
    </PageShell>
  );
}

async function getSafeFacilityDetail(slug: string) {
  try {
    return await getSupabasePublicFacilityDetailBySlug(slug);
  } catch {
    return {
      status: "error" as const,
      source: "static-fallback" as const,
      detail: null,
      fallbackRecommended: true as const,
      reason: "query-failed" as const,
      errorCode: "FACILITY_DETAIL_PUBLIC_READ_FAILED" as const,
      message:
        "Supabase facility detail public read failed. Use not-found handling.",
    };
  }
}

function mapPublicProviderDetailToFacility(
  detail: PublicProviderDetail,
): Facility {
  const category = detail.categoryLabel;

  return {
    id: detail.id,
    name: detail.name,
    slug: detail.slug,
    category,
    subcategory: detail.description || detail.summary,
    services: detail.services.length > 0 ? detail.services : [category],
    location: detail.location.displayName || detail.locationLabel,
    address: detail.address ?? detail.locationLabel,
    workingHours: detail.workingHours,
    verificationStatus: detail.verificationStatus,
    isOpen: false,
    availabilityNote: detail.availabilityPreview ?? "Availability not listed",
    contactActionLabel: detail.primaryActionLabel,
    directionsActionLabel: detail.secondaryActionLabel,
  };
}

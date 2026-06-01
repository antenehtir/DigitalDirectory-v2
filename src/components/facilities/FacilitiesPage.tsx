import { PageContainer } from "@/components/layout/PageContainer";
import { sampleFacilities } from "@/data/sampleFacilities";
import type { Facility } from "@/types/facility";
import { FacilitiesHero } from "./FacilitiesHero";
import { FacilitiesPageClient } from "./FacilitiesPageClient";
import { FacilityTrustBlock } from "./FacilityTrustBlock";
import { RequestFacilityAdditionCta } from "./RequestFacilityAdditionCta";

type FacilitiesPageProps = {
  facilities?: Facility[];
};

export function FacilitiesPage({
  facilities = sampleFacilities,
}: FacilitiesPageProps) {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <FacilitiesHero />
        <FacilitiesPageClient facilities={facilities} />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <FacilityTrustBlock />
          <RequestFacilityAdditionCta />
        </div>
      </div>
    </PageContainer>
  );
}

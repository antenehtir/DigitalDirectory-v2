import { PageContainer } from "@/components/layout/PageContainer";
import { sampleFacilities } from "@/data/sampleFacilities";
import type { Facility } from "@/types/facility";
import { FacilityActionPanel } from "./FacilityActionPanel";
import { FacilityCorrectionCta } from "./FacilityCorrectionCta";
import { FacilityDetailHeader } from "./FacilityDetailHeader";
import { FacilityHoursSection } from "./FacilityHoursSection";
import { FacilityInformationSection } from "./FacilityInformationSection";
import { FacilityServicesSection } from "./FacilityServicesSection";
import { FacilityTrustSection } from "./FacilityTrustSection";
import { SimilarFacilitiesSection } from "./SimilarFacilitiesSection";

const defaultFacility = sampleFacilities.find(
  (sampleFacility) => sampleFacility.slug === "addis-health-center",
);

type FacilityDetailPageProps = {
  facility?: Facility;
};

export function FacilityDetailPage({ facility }: FacilityDetailPageProps = {}) {
  const selectedFacility = facility ?? defaultFacility;

  if (!selectedFacility) {
    return null;
  }

  const similarFacilities = sampleFacilities.filter(
    (sampleFacility) => sampleFacility.slug !== selectedFacility.slug,
  );

  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <FacilityDetailHeader facility={selectedFacility} />
          <FacilityActionPanel facility={selectedFacility} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-6">
            <FacilityInformationSection facility={selectedFacility} />
            <FacilityServicesSection facility={selectedFacility} />
            <FacilityHoursSection facility={selectedFacility} />
          </div>

          <div className="grid gap-6">
            <FacilityTrustSection facility={selectedFacility} />
            <FacilityCorrectionCta facility={selectedFacility} />
          </div>
        </div>

        <SimilarFacilitiesSection facilities={similarFacilities} />
      </div>
    </PageContainer>
  );
}

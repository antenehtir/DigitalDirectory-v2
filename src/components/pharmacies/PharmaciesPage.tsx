import { PageContainer } from "@/components/layout/PageContainer";
import { PharmacyHero } from "./PharmacyHero";
import { PharmacyResultsSection } from "./PharmacyResultsSection";
import { PharmacySearchPreview } from "./PharmacySearchPreview";
import { RequestPharmacyAdditionCta } from "./RequestPharmacyAdditionCta";
import type { Facility } from "@/types/facility";

type PharmaciesPageProps = {
  activeQuery?: string;
  pharmacies?: Facility[];
};

export function PharmaciesPage({
  activeQuery = "",
  pharmacies,
}: PharmaciesPageProps) {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <PharmacyHero />

        <PharmacySearchPreview query={activeQuery} />
        <PharmacyResultsSection query={activeQuery} pharmacies={pharmacies} />
        <RequestPharmacyAdditionCta />
      </div>
    </PageContainer>
  );
}

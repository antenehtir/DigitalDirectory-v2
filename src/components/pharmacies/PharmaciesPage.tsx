import { PageContainer } from "@/components/layout/PageContainer";
import { DeliveryWorkflowPreview } from "./DeliveryWorkflowPreview";
import { PharmacyFilterChips } from "./PharmacyFilterChips";
import { PharmacyHero } from "./PharmacyHero";
import { PharmacyResultsSection } from "./PharmacyResultsSection";
import { PharmacySearchPreview } from "./PharmacySearchPreview";
import { PharmacyTrustNote } from "./PharmacyTrustNote";
import { PrescriptionPickupPreview } from "./PrescriptionPickupPreview";
import { RequestPharmacyAdditionCta } from "./RequestPharmacyAdditionCta";

export function PharmaciesPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <PharmacyHero />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="grid gap-6">
            <PharmacySearchPreview />
            <PharmacyFilterChips />
          </div>
          <PharmacyTrustNote />
        </div>

        <PharmacyResultsSection />

        <div className="grid gap-6 lg:grid-cols-2">
          <PrescriptionPickupPreview />
          <DeliveryWorkflowPreview />
        </div>

        <RequestPharmacyAdditionCta />
      </div>
    </PageContainer>
  );
}

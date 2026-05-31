import { PageContainer } from "@/components/layout/PageContainer";
import { DiagnosticsNearMePreview } from "./DiagnosticsNearMePreview";
import { FutureMapListExplanation } from "./FutureMapListExplanation";
import { LocationContextPreview } from "./LocationContextPreview";
import { NearbyFacilitiesPreview } from "./NearbyFacilitiesPreview";
import { NearbyFilterChips } from "./NearbyFilterChips";
import { NearbyHero } from "./NearbyHero";
import { NearbyTrustPrivacyNote } from "./NearbyTrustPrivacyNote";
import { PharmacyNearMePreview } from "./PharmacyNearMePreview";

export function NearbyPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <NearbyHero />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-6">
            <LocationContextPreview />
            <NearbyFilterChips />
          </div>

          <FutureMapListExplanation />
        </div>

        <NearbyFacilitiesPreview />

        <div className="grid gap-6 lg:grid-cols-2">
          <PharmacyNearMePreview />
          <DiagnosticsNearMePreview />
        </div>

        <NearbyTrustPrivacyNote />
      </div>
    </PageContainer>
  );
}

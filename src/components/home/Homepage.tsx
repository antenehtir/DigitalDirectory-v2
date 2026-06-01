import { DoctorDiscoverySection } from "./DoctorDiscoverySection";
import { HeroSearchSection } from "./HeroSearchSection";
import { NearbyHealthcareSection } from "./NearbyHealthcareSection";
import { PharmacyDiscoverySection } from "./PharmacyDiscoverySection";
import { PopularSpecialtiesSection } from "./PopularSpecialtiesSection";
import { PreviewBanner } from "./PreviewBanner";
import { ProviderRegistrationCta } from "./ProviderRegistrationCta";
import { QuickCategoriesSection } from "./QuickCategoriesSection";
import { TrustExplanationSection } from "./TrustExplanationSection";
import { VerifiedFacilitiesPreview } from "./VerifiedFacilitiesPreview";

export function Homepage() {
  return (
    <>
      <PreviewBanner />
      <HeroSearchSection />
      <QuickCategoriesSection />
      <NearbyHealthcareSection />
      <VerifiedFacilitiesPreview />
      <PopularSpecialtiesSection />
      <PharmacyDiscoverySection />
      <DoctorDiscoverySection />
      <ProviderRegistrationCta />
      <TrustExplanationSection />
    </>
  );
}

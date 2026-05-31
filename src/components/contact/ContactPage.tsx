import { CommunityChannelsSection } from "@/components/community/CommunityChannelsSection";
import { CommunityTrustNote } from "@/components/community/CommunityTrustNote";
import { NewsletterPreview } from "@/components/community/NewsletterPreview";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactHero } from "./ContactHero";
import { ContactPreviewForm } from "./ContactPreviewForm";
import { ContactPurposeOptions } from "./ContactPurposeOptions";
import { ContactTrustSafetyNote } from "./ContactTrustSafetyNote";
import { CorrectionSupportSection } from "./CorrectionSupportSection";
import { EmergencyDisclaimer } from "./EmergencyDisclaimer";
import { PartnershipInquirySection } from "./PartnershipInquirySection";
import { ProviderSupportSection } from "./ProviderSupportSection";
import { SupportChannelsPreview } from "./SupportChannelsPreview";

export function ContactPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <ContactHero />
        <EmergencyDisclaimer />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-6">
            <ContactPurposeOptions />
            <SupportChannelsPreview />
          </div>
          <ContactPreviewForm />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ProviderSupportSection />
          <CorrectionSupportSection />
          <PartnershipInquirySection />
        </div>

        <ContactTrustSafetyNote />
        <CommunityChannelsSection />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <NewsletterPreview />
          <CommunityTrustNote />
        </div>
      </div>
    </PageContainer>
  );
}

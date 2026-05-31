import { CommunityFeedbackCta } from "@/components/community/CommunityFeedbackCta";
import { PageContainer } from "@/components/layout/PageContainer";
import { FeatureRequestSection } from "./FeatureRequestSection";
import { FeedbackCtaSection } from "./FeedbackCtaSection";
import { FeedbackHero } from "./FeedbackHero";
import { FeedbackPreviewForm } from "./FeedbackPreviewForm";
import { FeedbackReviewProcess } from "./FeedbackReviewProcess";
import { FeedbackTrustPrivacyNote } from "./FeedbackTrustPrivacyNote";
import { FeedbackTypeOptions } from "./FeedbackTypeOptions";
import { ListingAccuracyFeedback } from "./ListingAccuracyFeedback";
import { PlatformExperienceFeedback } from "./PlatformExperienceFeedback";

export function FeedbackPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <FeedbackHero />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-6">
            <FeedbackTypeOptions />
            <FeedbackReviewProcess />
          </div>
          <FeedbackPreviewForm />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ListingAccuracyFeedback />
          <PlatformExperienceFeedback />
          <FeatureRequestSection />
        </div>

        <FeedbackTrustPrivacyNote />
        <CommunityFeedbackCta />
        <FeedbackCtaSection />
      </div>
    </PageContainer>
  );
}

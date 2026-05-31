import { PageContainer } from "@/components/layout/PageContainer";
import { CorrectionPreviewForm } from "./CorrectionPreviewForm";
import { CorrectionReviewProcess } from "./CorrectionReviewProcess";
import { CorrectionTypeOptions } from "./CorrectionTypeOptions";
import { CorrectionsHero } from "./CorrectionsHero";
import { CorrectionsNavigationCta } from "./CorrectionsNavigationCta";
import { CorrectableItems } from "./CorrectableItems";
import { TrustSafetyNote } from "./TrustSafetyNote";

export function CorrectionsPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <CorrectionsHero />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-6">
            <CorrectionTypeOptions />
            <CorrectableItems />
          </div>

          <CorrectionPreviewForm />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <CorrectionReviewProcess />
          <TrustSafetyNote />
        </div>

        <CorrectionsNavigationCta />
      </div>
    </PageContainer>
  );
}

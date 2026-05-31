import { PageContainer } from "@/components/layout/PageContainer";
import { AccountTypeCards } from "./AccountTypeCards";
import { AuthHero } from "./AuthHero";
import { AuthTrustSafetyNote } from "./AuthTrustSafetyNote";
import { AdminReviewerAccessPreview, ProviderAccessPreview } from "./AccessPreviewSection";
import { PublicBrowsingNote } from "./PublicBrowsingNote";
import { SignInPreviewForm } from "./SignInPreviewForm";

export function SignInPreviewPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <AuthHero
          eyebrow="Account preview"
          title="Future sign-in should support real provider and review work."
          description="DigitalDirectory-v2 can plan account access without adding sign-in today. Public healthcare discovery stays open while provider, admin, and reviewer accounts remain future workflow previews."
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-6">
            <PublicBrowsingNote />
            <ProviderAccessPreview />
          </div>
          <SignInPreviewForm />
        </div>

        <AccountTypeCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <AdminReviewerAccessPreview />
          <AuthTrustSafetyNote />
        </div>
      </div>
    </PageContainer>
  );
}

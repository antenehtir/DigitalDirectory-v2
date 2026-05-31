import { PageContainer } from "@/components/layout/PageContainer";
import { AccountTypeCards } from "./AccountTypeCards";
import { AuthHero } from "./AuthHero";
import { AuthTrustSafetyNote } from "./AuthTrustSafetyNote";
import { AdminReviewerAccessPreview, ProviderAccessPreview } from "./AccessPreviewSection";
import { PublicBrowsingNote } from "./PublicBrowsingNote";

export function AccountPreviewPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <AuthHero
          eyebrow="Account strategy preview"
          title="Account roles can come later, after trust workflows are ready."
          description="This page previews future account types and access needs without creating dashboards, protected routes, sessions, or real authentication."
        />

        <PublicBrowsingNote />
        <AccountTypeCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <ProviderAccessPreview />
          <AdminReviewerAccessPreview />
        </div>

        <AuthTrustSafetyNote />
      </div>
    </PageContainer>
  );
}

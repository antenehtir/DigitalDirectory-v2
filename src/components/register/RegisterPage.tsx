import { PageContainer } from "@/components/layout/PageContainer";
import { ProviderTypeOptions } from "./ProviderTypeOptions";
import { RegisterHero } from "./RegisterHero";
import { RegistrationPreviewForm } from "./RegistrationPreviewForm";
import { RequestTypeOptions } from "./RequestTypeOptions";

export function RegisterPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <RegisterHero />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-6">
            <ProviderTypeOptions />
            <RequestTypeOptions />
          </div>

          <RegistrationPreviewForm />
        </div>
      </div>
    </PageContainer>
  );
}

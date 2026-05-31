import { PageContainer } from "@/components/layout/PageContainer";
import { DiagnosticsFilterChips } from "./DiagnosticsFilterChips";
import { DiagnosticsHero } from "./DiagnosticsHero";
import { DiagnosticsResultsSection } from "./DiagnosticsResultsSection";
import { DiagnosticsSearchPreview } from "./DiagnosticsSearchPreview";
import { DiagnosticsTrustNote } from "./DiagnosticsTrustNote";
import { ImagingServicesPreview } from "./ImagingServicesPreview";
import { LaboratoryServicesPreview } from "./LaboratoryServicesPreview";
import { RequestDiagnosticsAdditionCta } from "./RequestDiagnosticsAdditionCta";

export function DiagnosticsPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <DiagnosticsHero />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="grid gap-6">
            <DiagnosticsSearchPreview />
            <DiagnosticsFilterChips />
          </div>
          <DiagnosticsTrustNote />
        </div>

        <DiagnosticsResultsSection />

        <div className="grid gap-6 lg:grid-cols-2">
          <LaboratoryServicesPreview />
          <ImagingServicesPreview />
        </div>

        <RequestDiagnosticsAdditionCta />
      </div>
    </PageContainer>
  );
}

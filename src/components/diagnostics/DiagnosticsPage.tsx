import { PageContainer } from "@/components/layout/PageContainer";
import { DiagnosticsHero } from "./DiagnosticsHero";
import { DiagnosticsResultsSection } from "./DiagnosticsResultsSection";
import { RequestDiagnosticsAdditionCta } from "./RequestDiagnosticsAdditionCta";
import type { Facility } from "@/types/facility";

type DiagnosticsPageProps = {
  diagnostics?: Facility[];
};

export function DiagnosticsPage({ diagnostics }: DiagnosticsPageProps) {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <DiagnosticsHero />
        <DiagnosticsResultsSection diagnostics={diagnostics} />
        <RequestDiagnosticsAdditionCta />
      </div>
    </PageContainer>
  );
}

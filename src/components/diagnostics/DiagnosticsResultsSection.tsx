import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import { sampleDiagnostics } from "@/data/sampleDiagnostics";

export function DiagnosticsResultsSection() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Diagnostics results
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Sample diagnostics listings
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Diagnostic cards reuse the existing facility card system with
          frontend-only sample data.
        </p>
      </div>
      <FacilityCardGrid facilities={sampleDiagnostics} />
    </section>
  );
}

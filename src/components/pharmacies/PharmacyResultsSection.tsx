import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import { samplePharmacies } from "@/data/samplePharmacies";

export function PharmacyResultsSection() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Pharmacy results
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Sample pharmacy listings
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pharmacy cards reuse the existing facility card system with
          frontend-only sample data.
        </p>
      </div>
      <FacilityCardGrid facilities={samplePharmacies} />
    </section>
  );
}

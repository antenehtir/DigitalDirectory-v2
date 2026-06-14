import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import type { Facility } from "@/types/facility";

type PharmacyResultsSectionProps = {
  pharmacies?: Facility[];
  query?: string;
};

export function PharmacyResultsSection({
  pharmacies = [],
  query = "",
}: PharmacyResultsSectionProps) {
  const isFiltered = query.length > 0;

  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Pharmacy results
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Pharmacy listings
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {isFiltered
            ? `Showing pharmacies matching "${query}".`
            : "Reviewed pharmacy information."}
        </p>
      </div>
      {pharmacies.length > 0 ? (
        <FacilityCardGrid facilities={pharmacies} />
      ) : (
        <section className="rounded-lg border border-dashed border-border bg-card p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-muted text-sm font-bold text-primary">
            0
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Pharmacy listings will be added soon.
          </h3>
        </section>
      )}
    </section>
  );
}

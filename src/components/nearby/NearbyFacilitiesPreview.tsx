import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import { sampleFacilities } from "@/data/sampleFacilities";

export function NearbyFacilitiesPreview() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Nearby facility preview
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Healthcare options in the area
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sample facilities are displayed with the reusable facility card
          system. No real location sorting or distance calculations are used.
        </p>
      </div>
      <FacilityCardGrid facilities={sampleFacilities} />
    </section>
  );
}

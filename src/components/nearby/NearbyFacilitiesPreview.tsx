import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import { sampleFacilities } from "@/data/sampleFacilities";

export function NearbyFacilitiesPreview() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Nearby facilities
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Healthcare options in the area
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Facility information is organized by area. Distance calculations are
          shown only after verification.
        </p>
      </div>
      <FacilityCardGrid facilities={sampleFacilities} />
    </section>
  );
}

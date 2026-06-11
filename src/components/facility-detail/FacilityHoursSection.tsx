import type { Facility } from "@/types/facility";

type FacilityHoursSectionProps = {
  facility: Facility;
};

export function FacilityHoursSection({ facility }: FacilityHoursSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Hours
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Working hours
      </h2>
      <div className="mt-5 rounded-md border border-border bg-background p-4">
        <p className="text-sm font-semibold text-foreground">
          {facility.workingHours}
        </p>
        <p
          className={`mt-2 text-sm font-semibold ${
            facility.isOpen ? "text-success" : "text-warning"
          }`}
        >
          {facility.availabilityNote}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Hours will be updated after verification.
        </p>
      </div>
    </section>
  );
}

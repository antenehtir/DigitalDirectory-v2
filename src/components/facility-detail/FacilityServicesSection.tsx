import type { Facility } from "@/types/facility";

type FacilityServicesSectionProps = {
  facility: Facility;
};

export function FacilityServicesSection({
  facility,
}: FacilityServicesSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Services
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Available care information
      </h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {facility.services.map((service) => (
          <span
            className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm"
            key={service}
          >
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}

import { VerificationBadge } from "@/components/trust/VerificationBadge";
import type { Facility } from "@/types/facility";

type FacilityDetailHeaderProps = {
  facility: Facility;
};

export function FacilityDetailHeader({ facility }: FacilityDetailHeaderProps) {
  return (
    <header className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          <p className="mb-3 inline-flex rounded-full border border-border bg-muted px-3 py-2 text-sm font-medium text-primary">
            Facility details
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {facility.name}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {facility.subcategory} in {facility.address}
          </p>
        </div>
        <VerificationBadge status={facility.verificationStatus} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            {facility.category}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Facility type</p>
        </div>
        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            {facility.location}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Location</p>
        </div>
        <div className="rounded-md border border-border bg-background p-4">
          <p
            className={`text-sm font-semibold ${
              facility.isOpen ? "text-success" : "text-warning"
            }`}
          >
            {facility.availabilityNote}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Availability</p>
        </div>
      </div>
    </header>
  );
}

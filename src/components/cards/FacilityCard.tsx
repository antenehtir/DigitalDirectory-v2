import Link from "next/link";
import { VerificationBadge } from "@/components/trust/VerificationBadge";
import type { Facility } from "@/types/facility";

type FacilityCardProps = {
  facility: Facility;
};

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-background p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">
            {facility.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-foreground">
            {facility.name}
          </h3>
        </div>
        <VerificationBadge status={facility.verificationStatus} />
      </div>

      <div className="mt-4 grid gap-3 text-sm">
        <div>
          <p className="font-medium text-card-foreground">
            {facility.subcategory}
          </p>
          <p className="mt-1 text-muted-foreground">{facility.address}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {facility.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
            >
              {service}
            </span>
          ))}
        </div>
        <div className="grid gap-2 rounded-md bg-card p-3">
          <p className="text-muted-foreground">{facility.location}</p>
          <p className="text-muted-foreground">{facility.workingHours}</p>
          <p
            className={`font-semibold ${
              facility.isOpen ? "text-success" : "text-warning"
            }`}
          >
            {facility.availabilityNote}
          </p>
        </div>
      </div>

      <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-3">
        <button
          className="min-h-11 rounded-md border border-border bg-card px-3 text-sm font-semibold text-primary"
          type="button"
        >
          {facility.contactActionLabel}
        </button>
        <button
          className="min-h-11 rounded-md border border-border bg-card px-3 text-sm font-semibold text-primary"
          type="button"
        >
          {facility.directionsActionLabel}
        </button>
        <Link
          className="flex min-h-11 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground"
          href="/facilities"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

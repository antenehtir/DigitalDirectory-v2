import Link from "next/link";
import type { Facility } from "@/types/facility";

type FacilityCardProps = {
  facility: Facility;
};

const CATEGORY_COLORS: Record<string, string> = {
  Hospital: "#1d4ed8",
  Clinic: "#0e9f9a",
  "Diagnostic Center": "#7c3aed",
  Pharmacy: "#059669",
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#d97706";
}

export function FacilityCard({ facility }: FacilityCardProps) {
  const detailHref = `/facilities/${facility.slug}`;
  const color = getCategoryColor(facility.category);
  const phone = facility.phone?.split(" / ")[0];

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Category colour stripe */}
      <div className="h-1 w-full shrink-0" style={{ background: color }} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color }}
            >
              {facility.facilityType ?? facility.category}
            </p>
            <h3 className="mt-1.5 text-base font-bold leading-tight text-foreground sm:text-lg">
              {facility.name}
            </h3>
          </div>

          {/* Verification badge */}
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
              facility.verificationStatus === "verified"
                ? "bg-success/10 text-success"
                : facility.verificationStatus === "pending"
                ? "bg-warning/10 text-warning"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {facility.verificationStatus === "verified"
              ? "Verified"
              : facility.verificationStatus === "pending"
              ? "Pending"
              : "Submitted"}
          </span>
        </div>

        {/* Info block */}
        <div className="mt-3 grid gap-1.5 text-sm">
          {facility.specialtyCategory && (
            <p className="font-medium text-foreground capitalize">
              {facility.specialtyCategory}
            </p>
          )}
          <p className="text-muted-foreground leading-5">{facility.address}</p>
          <p className="text-muted-foreground">{facility.workingHours}</p>
        </div>

        {/* Services chips */}
        {facility.services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {facility.services.slice(0, 3).map((svc) => (
              <span
                key={svc}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {svc}
              </span>
            ))}
            {facility.services.length > 3 && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{facility.services.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto grid grid-cols-3 gap-2 pt-4">
          {phone ? (
            <a
              href={`tel:${phone}`}
              className="flex min-h-11 items-center justify-center rounded-lg border border-border bg-background text-center text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Call
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex min-h-11 items-center justify-center rounded-lg border border-border bg-muted text-center text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-50"
            >
              Call
            </button>
          )}

          {facility.googleMapsUrl ? (
            <a
              href={facility.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-lg border border-border bg-background text-center text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Map
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex min-h-11 items-center justify-center rounded-lg border border-border bg-muted text-center text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-50"
            >
              Map
            </button>
          )}

          <Link
            href={detailHref}
            className="flex min-h-11 items-center justify-center rounded-lg text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: color }}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

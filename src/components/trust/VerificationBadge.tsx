import type { VerificationStatus } from "@/types/verification";

type VerificationBadgeProps = {
  status: VerificationStatus;
  entityType?: "facility" | "doctor";
};

const badgeContent: Record<
  VerificationStatus,
  { label: string; className: string }
> = {
  verified: {
    label: "Verified",
    className: "bg-success text-white",
  },
  pending: {
    label: "Pending",
    className: "bg-warning text-foreground",
  },
  "community-submitted": {
    label: "Community",
    className: "bg-muted text-muted-foreground",
  },
};

export function VerificationBadge({
  status,
  entityType,
}: VerificationBadgeProps) {
  const badge = badgeContent[status];
  const label =
    status === "verified" && entityType === "doctor"
      ? "Verified Doctor"
      : status === "verified" && entityType === "facility"
        ? "Verified Facility"
        : badge.label;

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
    >
      {label}
    </span>
  );
}

import type { FacilityVerificationStatus } from "@/types/facility";

type VerificationBadgeProps = {
  status: FacilityVerificationStatus;
};

const badgeContent: Record<
  FacilityVerificationStatus,
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

export function VerificationBadge({ status }: VerificationBadgeProps) {
  const badge = badgeContent[status];

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}

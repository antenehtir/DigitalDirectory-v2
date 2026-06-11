import { VerificationBadge } from "@/components/trust/VerificationBadge";
import type { Doctor } from "@/types/doctor";

type DoctorTrustSectionProps = {
  doctor: Doctor;
};

export function DoctorTrustSection({ doctor }: DoctorTrustSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Trust and verification
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Verification is visible before patient action.
          </h2>
        </div>
        <VerificationBadge status={doctor.verificationStatus} entityType="doctor" />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        DigitalDirectory-v2 separates verified, pending, and
        community-submitted healthcare information so patients can understand
        what has been reviewed.
      </p>
      <div className="mt-5 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">
          Provider information review
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Provider information is reviewed before publication and may be updated
          as doctors confirm details.
        </p>
      </div>
    </section>
  );
}

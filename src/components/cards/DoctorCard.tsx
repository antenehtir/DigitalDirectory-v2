import Link from "next/link";
import { VerificationBadge } from "@/components/trust/VerificationBadge";
import type { Doctor, DoctorTelemedicineStatus } from "@/types/doctor";

type DoctorCardProps = {
  doctor: Doctor;
};

const telemedicineLabels: Record<DoctorTelemedicineStatus, string> = {
  available: "Telemedicine preview",
  planned: "Telemedicine planned",
  "not-available": "In-person preview",
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-primary">
            {doctor.profileInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">
              {doctor.specialty}
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-tight text-card-foreground">
              {doctor.name}
            </h3>
          </div>
        </div>
        <VerificationBadge status={doctor.verificationStatus} entityType="doctor" />
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <div>
          <p className="font-medium text-card-foreground">{doctor.facility}</p>
          <p className="mt-1 text-muted-foreground">{doctor.location}</p>
        </div>
        <div className="grid gap-2 rounded-md bg-muted p-3">
          <p className="font-semibold text-success">{doctor.availability}</p>
          <p className="text-muted-foreground">
            {telemedicineLabels[doctor.telemedicineStatus]}
          </p>
        </div>
      </div>

      <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
        <button
          className="min-h-11 rounded-md border border-border bg-card px-3 text-sm font-semibold text-primary"
          type="button"
        >
          {doctor.bookingActionLabel}
        </button>
        <Link
          className="flex min-h-11 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground"
          href="/doctors"
        >
          {doctor.profileActionLabel}
        </Link>
      </div>
    </article>
  );
}

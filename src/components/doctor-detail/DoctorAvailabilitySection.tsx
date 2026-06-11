import type { Doctor } from "@/types/doctor";

type DoctorAvailabilitySectionProps = {
  doctor: Doctor;
};

export function DoctorAvailabilitySection({
  doctor,
}: DoctorAvailabilitySectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Availability
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Schedule information
      </h2>
      <div className="mt-5 rounded-md border border-border bg-background p-4">
        <p className="text-sm font-semibold text-success">
          {doctor.availability}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Availability details are being verified and may be updated as the
          provider confirms schedules.
        </p>
      </div>
    </section>
  );
}

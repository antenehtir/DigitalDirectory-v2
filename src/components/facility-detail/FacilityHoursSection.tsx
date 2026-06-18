import type { Facility } from "@/types/facility";

type FacilityHoursSectionProps = {
  facility: Facility;
};

export function FacilityHoursSection({ facility }: FacilityHoursSectionProps) {
  if (!facility.workingHours) return null;

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-[0_10px_26px_rgba(31,41,55,0.04)] sm:p-6">
      <p className="text-sm font-semibold text-primary">Hours</p>
      <p className="mt-2 text-base text-foreground">{facility.workingHours}</p>
    </section>
  );
}

import { DoctorCard } from "./DoctorCard";
import type { Doctor } from "@/types/doctor";

type DoctorCardGridProps = {
  doctors: Doctor[];
  className?: string;
};

export function DoctorCardGrid({
  doctors,
  className = "grid gap-4 md:grid-cols-2",
}: DoctorCardGridProps) {
  return (
    <div className={className}>
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}

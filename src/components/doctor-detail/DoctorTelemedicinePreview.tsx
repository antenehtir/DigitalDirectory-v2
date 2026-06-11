import type { Doctor, DoctorTelemedicineStatus } from "@/types/doctor";

type DoctorTelemedicinePreviewProps = {
  doctor: Doctor;
};

const telemedicineCopy: Record<
  DoctorTelemedicineStatus,
  { title: string; description: string }
> = {
  available: {
    title: "Telemedicine information available",
    description:
      "Online consultation details are shown only when confirmed by the provider.",
  },
  planned: {
    title: "Telemedicine planned",
    description:
      "Telemedicine details are being verified before they are shown as available.",
  },
  "not-available": {
    title: "In-person care",
    description:
      "This profile currently presents in-person care information.",
  },
};

export function DoctorTelemedicinePreview({
  doctor,
}: DoctorTelemedicinePreviewProps) {
  const copy = telemedicineCopy[doctor.telemedicineStatus];

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Telemedicine
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        {copy.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {copy.description}
      </p>
      <div className="mt-5 rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-primary">
        Telemedicine details are being verified.
      </div>
    </section>
  );
}

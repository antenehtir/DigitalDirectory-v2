const imagingServices = [
  "X-ray information",
  "Ultrasound information",
  "Imaging consultation",
  "Radiology center information",
];

export function ImagingServicesPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Imaging services
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Imaging service information.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Booking, schedules, payment, uploads, and result workflow details will
        be updated after verification.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {imagingServices.map((service) => (
          <div
            className="rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
            key={service}
          >
            {service}
          </div>
        ))}
      </div>
    </section>
  );
}

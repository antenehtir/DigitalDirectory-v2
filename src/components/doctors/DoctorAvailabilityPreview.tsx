const previewItems = [
  "Verified doctors are visually marked.",
  "Availability details are being verified.",
  "Telemedicine details are shown only when confirmed.",
];

export function DoctorAvailabilityPreview() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Availability
      </p>
      <h2 className="mt-2 text-xl font-semibold text-foreground">
        Help patients understand doctor access at a glance.
      </h2>
      <div className="mt-4 grid gap-3">
        {previewItems.map((item) => (
          <div key={item} className="flex gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-success" />
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

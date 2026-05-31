const laboratoryServices = [
  "Blood test preview",
  "Urine test preview",
  "Health screening preview",
  "Sample collection preview",
];

export function LaboratoryServicesPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Laboratory services
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Lab service categories for future discovery.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This section previews how lab services can be grouped without showing
        live availability, prices, or result delivery options.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {laboratoryServices.map((service) => (
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

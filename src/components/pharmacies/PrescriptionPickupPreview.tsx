const pickupSteps = [
  {
    title: "Find pharmacy",
    description: "Patients can discover trusted pharmacy listings first.",
  },
  {
    title: "Review pickup details",
    description: "Pickup information is shown only after provider confirmation.",
  },
  {
    title: "Confirm later",
    description: "Prescription handling details are updated after verification.",
  },
];

export function PrescriptionPickupPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Prescription pickup
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Pickup information is reviewed before publication.
      </h2>
      <div className="mt-5 grid gap-3">
        {pickupSteps.map((step, index) => (
          <div
            className="grid gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-[auto_1fr] sm:items-start"
            key={step.title}
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

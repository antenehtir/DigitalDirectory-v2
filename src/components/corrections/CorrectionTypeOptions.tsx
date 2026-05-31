const correctionTypes = [
  {
    title: "Wrong contact details",
    description: "Phone, email, website, or patient contact information.",
  },
  {
    title: "Incorrect location",
    description: "Address, neighborhood, city, or branch information.",
  },
  {
    title: "Service update",
    description: "Specialties, departments, pharmacy, or lab services.",
  },
  {
    title: "Trust status review",
    description: "Verification, pending status, or community-submitted labels.",
  },
];

export function CorrectionTypeOptions() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Correction type
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          What needs to be corrected?
        </h2>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {correctionTypes.map((type) => (
          <div
            className="min-h-28 rounded-md border border-border bg-background p-4 shadow-sm"
            key={type.title}
          >
            <h3 className="text-base font-semibold text-foreground">
              {type.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

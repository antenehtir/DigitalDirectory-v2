const previewFields = [
  { label: "Provider or facility name", value: "Provider or facility name" },
  { label: "Contact person", value: "Primary contact name" },
  { label: "Phone or email", value: "+251 900 000 000" },
  { label: "City or area", value: "Addis Ababa" },
  { label: "Category or specialty", value: "Clinic, doctor, pharmacy, lab" },
];

export function RegistrationPreviewForm() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Registration form
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Registration request details
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Provider information is reviewed before publication. Share the details
          needed for listing or verification review.
        </p>
      </div>

      <div className="mt-5 grid gap-4" aria-label="Registration form">
        {previewFields.map((field) => (
          <div className="grid gap-2" key={field.label}>
            <p className="text-sm font-semibold text-foreground">
              {field.label}
            </p>
            <div className="flex min-h-12 items-center rounded-md border border-border bg-input px-4 text-sm text-foreground shadow-sm">
              {field.value}
            </div>
          </div>
        ))}

        <div className="grid gap-2">
          <p className="text-sm font-semibold text-foreground">
            Notes for review
          </p>
          <div className="min-h-28 rounded-md border border-border bg-input px-4 py-3 text-sm leading-6 text-foreground shadow-sm">
            Briefly describe the listing, verification, or correction request.
          </div>
        </div>

        <div className="mt-1 flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm">
          Submit request
        </div>
      </div>
    </section>
  );
}

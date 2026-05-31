const correctionFields = [
  { label: "Listing name", value: "Example Care Clinic" },
  { label: "Listing type", value: "Facility, doctor, pharmacy, or lab" },
  { label: "Current information", value: "Old phone number or address" },
  { label: "Suggested correction", value: "Updated phone number or address" },
  { label: "Your contact", value: "+251 900 000 000" },
];

export function CorrectionPreviewForm() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Preview form
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Correction request details
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Static preview fields show the future request shape. Nothing is
          submitted, uploaded, or stored.
        </p>
      </div>

      <div
        className="mt-5 grid gap-4"
        role="form"
        aria-label="Correction preview form"
      >
        {correctionFields.map((field) => (
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
            Briefly explain what is wrong and what should appear instead.
          </div>
        </div>

        <div className="mt-1 flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm">
          Submit correction preview
        </div>
      </div>
    </section>
  );
}

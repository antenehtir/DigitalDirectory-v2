const correctionFields = [
  { label: "Listing name", placeholder: "Provider or facility name" },
  { label: "Listing type", placeholder: "Facility, doctor, pharmacy, or diagnostics" },
  { label: "Current information", placeholder: "Information to correct" },
  { label: "Suggested correction", placeholder: "Updated information" },
  { label: "Your contact", placeholder: "Phone or email for review" },
];

export function CorrectionPreviewForm() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Correction form
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Correction request details
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Provider information is reviewed before publication. Share the details
          that need to be checked.
        </p>
      </div>

      <div
        className="mt-5 grid gap-4"
        role="form"
        aria-label="Correction form"
      >
        {correctionFields.map((field) => (
          <div className="grid gap-2" key={field.label}>
            <label className="text-sm font-semibold text-foreground">
              {field.label}
            </label>
            <input
              className="min-h-12 rounded-md border border-border bg-input px-4 text-sm text-foreground shadow-sm"
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-foreground">
            Notes for review
          </label>
          <textarea
            className="min-h-28 rounded-md border border-border bg-input px-4 py-3 text-sm leading-6 text-foreground shadow-sm"
            placeholder="Briefly explain what is wrong and what should appear instead."
          />
        </div>

        <button
          className="mt-1 min-h-12 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm"
          type="button"
        >
          Submit correction
        </button>
      </div>
    </section>
  );
}

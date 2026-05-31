const feedbackFields = [
  { label: "Name or role", placeholder: "Patient, provider, partner, or visitor" },
  { label: "Feedback area", placeholder: "Listing accuracy, experience, feature, or trust" },
  { label: "Related page or listing", placeholder: "Optional page or provider name preview" },
];

export function FeedbackPreviewForm() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Feedback preview form
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Feedback details preview
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Static fields show the future feedback shape. Nothing is submitted,
        emailed, stored, uploaded, or turned into a ticket.
      </p>

      <div className="mt-5 grid gap-4" role="form" aria-label="Feedback preview form">
        {feedbackFields.map((field) => (
          <div className="grid gap-2" key={field.label}>
            <p className="text-sm font-semibold text-foreground">
              {field.label}
            </p>
            <div className="flex min-h-12 items-center rounded-md border border-border bg-input px-4 text-sm text-muted-foreground shadow-sm">
              {field.placeholder}
            </div>
          </div>
        ))}

        <div className="grid gap-2">
          <p className="text-sm font-semibold text-foreground">
            Feedback message
          </p>
          <div className="min-h-28 rounded-md border border-border bg-input px-4 py-3 text-sm leading-6 text-muted-foreground shadow-sm">
            Briefly describe what should be improved or reviewed.
          </div>
        </div>

        <div className="mt-1 flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-center text-sm font-semibold text-primary-foreground shadow-sm">
          Send feedback preview
        </div>
      </div>
    </section>
  );
}

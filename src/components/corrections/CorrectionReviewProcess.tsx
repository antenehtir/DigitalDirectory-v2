const reviewSteps = [
  {
    title: "Receive correction",
    description: "The future workflow collects the suggested update.",
  },
  {
    title: "Compare listing details",
    description: "Existing information is checked against the new request.",
  },
  {
    title: "Update trustfully",
    description: "Reviewed changes can later improve patient-facing accuracy.",
  },
];

export function CorrectionReviewProcess() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Review process
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Corrections are reviewed before they affect trust.
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This page only previews the process. It does not add admin review,
          authentication, documents, or database updates.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {reviewSteps.map((step, index) => (
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

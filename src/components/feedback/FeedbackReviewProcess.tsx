const reviewSteps = [
  {
    title: "Collect feedback",
    description: "Future versions can group feedback by purpose and page.",
  },
  {
    title: "Review safely",
    description: "Trust-sensitive suggestions should be reviewed before changes.",
  },
  {
    title: "Improve discovery",
    description: "Useful feedback can guide search, cards, content, and support.",
  },
];

export function FeedbackReviewProcess() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Review process
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Feedback should improve trust carefully.
      </h2>

      <div className="mt-5 grid gap-3">
        {reviewSteps.map((step, index) => (
          <article
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
          </article>
        ))}
      </div>
    </section>
  );
}

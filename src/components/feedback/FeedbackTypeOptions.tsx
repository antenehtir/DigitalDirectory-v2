const feedbackTypes = [
  {
    title: "Listing accuracy",
    description: "Share feedback about incorrect healthcare information.",
  },
  {
    title: "Platform experience",
    description: "Comment on navigation, search clarity, and mobile comfort.",
  },
  {
    title: "Feature request",
    description: "Suggest future discovery, verification, or support ideas.",
  },
  {
    title: "Trust concern",
    description: "Flag information that may need review before users rely on it.",
  },
];

export function FeedbackTypeOptions() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Feedback type
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        What kind of feedback is it?
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {feedbackTypes.map((type) => (
          <article
            className="min-h-28 rounded-md border border-border bg-background p-4 shadow-sm"
            key={type.title}
          >
            <h3 className="text-base font-semibold text-foreground">
              {type.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {type.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

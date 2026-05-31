export function FeedbackTrustPrivacyNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Trust and privacy
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Feedback should not bypass verification.
          </h2>
        </div>
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>
            Listing feedback can help identify issues, but verified healthcare
            information should remain clearly reviewed before it changes.
          </p>
          <p>
            This page does not collect files, send messages, create tickets, or
            process payment or private healthcare information.
          </p>
        </div>
      </div>
    </section>
  );
}

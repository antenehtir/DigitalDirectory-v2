export function CommunityFeedbackCta() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Community updates
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Feedback can shape future update channels.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Share what kinds of listing, verification, pharmacy, diagnostics, or
        provider onboarding updates would be most useful in future channels.
      </p>
      <div className="mt-5 rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-primary">
        Community channel feedback is preview-only.
      </div>
    </section>
  );
}

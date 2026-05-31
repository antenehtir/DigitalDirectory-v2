export function CommunityTrustNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Community trust note
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Updates should support verified healthcare discovery.
          </h2>
        </div>
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>
            Community channels should point users back to reviewed listings,
            correction flows, and clear trust labels rather than replacing
            verification.
          </p>
          <p>
            These are placeholder links only. No social login, subscription,
            tracking, analytics, email delivery, or social API integration is
            active.
          </p>
        </div>
      </div>
    </section>
  );
}

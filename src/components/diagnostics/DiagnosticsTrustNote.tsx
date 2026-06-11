export function DiagnosticsTrustNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Diagnostics trust note
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Diagnostic information needs careful trust cues.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Verified, pending, and community-submitted diagnostic centers should
        remain visually distinct before future test availability, booking,
        pricing, upload, payment, or result delivery features are introduced.
      </p>
      <div className="mt-5 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">
          Diagnostics information review
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Test availability, pricing, booking, upload, payment, and result
          delivery information will be updated after verification.
        </p>
      </div>
    </section>
  );
}

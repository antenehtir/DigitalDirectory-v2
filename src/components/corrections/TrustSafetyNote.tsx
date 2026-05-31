export function TrustSafetyNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Trust and safety note
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Corrections should not weaken verification.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Verified healthcare information must remain distinct from pending and
        community-submitted updates. Future corrections will need review before
        changing trusted details.
      </p>
      <div className="mt-5 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">
          Frontend-only preview
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          No correction is submitted, no files are uploaded, and no listing data
          is changed from this page.
        </p>
      </div>
    </section>
  );
}

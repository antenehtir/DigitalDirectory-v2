export function FeatureRequestSection() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Feature request
      </p>
      <h2 className="mt-2 text-xl font-semibold leading-tight text-foreground">
        Suggest future healthcare tools.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Future ideas may include Amharic search, stronger verification,
        pharmacy availability, diagnostics workflows, or care navigation.
      </p>
      <div className="mt-5 rounded-md border border-border bg-muted px-4 py-3 text-sm font-semibold text-primary">
        Feature requests are not submitted yet.
      </div>
    </section>
  );
}

export function DiagnosticsHero() {
  return (
    <header className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex rounded-full border border-border bg-muted px-3 py-2 text-sm font-medium text-primary">
          Diagnostics discovery
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Find laboratories and imaging services.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Browse diagnostic centers for laboratory and imaging services with
          provider information reviewed before publication.
        </p>
      </div>
    </header>
  );
}

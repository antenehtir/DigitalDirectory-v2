const diagnostics = [
  {
    name: "Sunrise Diagnostic Lab",
    detail: "Blood tests and screening",
    note: "Sample collection availability preview only.",
  },
  {
    name: "Megenagna Imaging Center",
    detail: "Imaging and diagnostics",
    note: "Future details can include services, hours, and trust status.",
  },
];

export function DiagnosticsNearMePreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Diagnostics near me
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Lab and diagnostic preview
      </h2>
      <div className="mt-5 grid gap-3">
        {diagnostics.map((diagnostic) => (
          <article
            className="rounded-md border border-border bg-background p-4 shadow-sm"
            key={diagnostic.name}
          >
            <h3 className="text-base font-semibold text-foreground">
              {diagnostic.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {diagnostic.detail}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {diagnostic.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

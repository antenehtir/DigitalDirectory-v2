export function DiagnosticsSearchPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Diagnostics search
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Search diagnostic service information.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Test availability, pricing, booking, uploads, payments, and result
        delivery details are shown only after verification.
      </p>

      <div className="mt-5 grid gap-3 rounded-md border border-border bg-background p-4">
        <div className="rounded-md border border-border bg-input px-4 py-3 text-sm font-medium text-muted-foreground shadow-sm">
          Search lab, imaging center, test category, or area
        </div>
        <div className="rounded-md bg-muted px-4 py-3 text-sm font-semibold text-primary">
          Location: Addis Ababa
        </div>
      </div>
    </section>
  );
}

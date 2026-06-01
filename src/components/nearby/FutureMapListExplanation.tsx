export function FutureMapListExplanation() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Future map and list
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        List view now. Map view coming soon.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Browse facilities as a list today. A map view showing distances and
        directions is planned for a future update.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">List first</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Patients can scan trusted cards before opening richer views.
          </p>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Map later</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Maps can be added in a future phase after core discovery is stable.
          </p>
        </div>
      </div>
    </section>
  );
}

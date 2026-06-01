export function LocationContextPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Location context
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Browsing: Addis Ababa
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Select a neighbourhood below to see facilities in that area. No location
        permission is required.
      </p>

      <div className="mt-5 grid gap-3 rounded-md border border-border bg-background p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Current area
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Showing results across Bole, Megenagna, Kazanchis, and central Addis Ababa
          </p>
        </div>
        <div className="rounded-md bg-muted px-4 py-3 text-sm font-semibold text-primary">
          No location permission needed
        </div>
      </div>
    </section>
  );
}

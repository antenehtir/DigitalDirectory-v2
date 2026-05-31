export function LocationContextPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Location context
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Preview area: Addis Ababa
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This static location context shows how nearby discovery will feel in a
        future version. The page does not use browser location or ask for
        permission.
      </p>

      <div className="mt-5 grid gap-3 rounded-md border border-border bg-background p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Manual area preview
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Bole, Megenagna, Kazanchis, and central Addis Ababa samples
          </p>
        </div>
        <div className="rounded-md bg-muted px-4 py-3 text-sm font-semibold text-primary">
          Location permission not requested
        </div>
      </div>
    </section>
  );
}

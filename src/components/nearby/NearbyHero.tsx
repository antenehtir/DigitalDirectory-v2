export function NearbyHero() {
  return (
    <header className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex rounded-full border border-border bg-muted px-3 py-2 text-sm font-medium text-primary">
          Nearby
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Browse by Sub-city / Area
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Choose an area to see real facilities listed there.
        </p>
      </div>
    </header>
  );
}

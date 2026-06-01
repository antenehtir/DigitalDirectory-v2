export function NearbyHero() {
  return (
    <header className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex rounded-full border border-border bg-muted px-3 py-2 text-sm font-medium text-primary">
          Addis Ababa · Nearby care
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Healthcare options in your area.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Browse clinics, pharmacies, and diagnostic services by neighbourhood.
          Pick your area below and see what is available near you.
        </p>
      </div>
    </header>
  );
}

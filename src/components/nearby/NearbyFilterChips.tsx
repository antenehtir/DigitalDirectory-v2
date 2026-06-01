const nearbyFilters = [
  "Open now",
  "Verified",
  "Clinics",
  "Pharmacies",
  "Diagnostics",
  "Primary care",
  "Community submitted",
];

export function NearbyFilterChips() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Nearby filters
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Filter by care type
      </h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {nearbyFilters.map((filter) => (
          <span
            className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm"
            key={filter}
          >
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
}

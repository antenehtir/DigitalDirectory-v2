const pharmacyFilters = [
  "Open now",
  "Verified",
  "Prescription pickup",
  "Near me",
  "Wellness items",
  "Refill preview",
  "Community submitted",
];

export function PharmacyFilterChips() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Pharmacy filters
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Static chips for future filtering.
      </h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {pharmacyFilters.map((filter) => (
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

const categoryFilters = [
  "All results",
  "Facilities",
  "Doctors",
  "Pharmacies",
  "Labs",
];

const refinementFilters = [
  "Verified only",
  "Open now",
  "Accepting calls",
  "Nearby",
];

export function SearchFilterControls() {
  return (
    <aside className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-foreground">Categories</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:grid">
          {categoryFilters.map((filter, index) => (
            <button
              key={filter}
              className={`min-h-11 rounded-full border px-4 text-left text-sm font-semibold lg:rounded-md ${
                index === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground"
              }`}
              type="button"
              aria-pressed={index === 0}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-semibold text-foreground">Filters</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:grid">
          {refinementFilters.map((filter) => (
            <button
              key={filter}
              className="min-h-11 rounded-full border border-border bg-muted px-4 text-left text-sm font-semibold text-foreground lg:rounded-md"
              type="button"
              aria-pressed="false"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-md bg-muted p-4">
        <p className="text-sm font-semibold text-foreground">
          Location
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Addis Ababa, Ethiopia. Location information is reviewed before publication.
        </p>
      </div>
    </aside>
  );
}

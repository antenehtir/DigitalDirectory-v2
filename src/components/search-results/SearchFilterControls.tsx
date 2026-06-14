import Link from "next/link";

const categoryFilters = [
  { label: "All", href: "/search" },
  { label: "General Hospitals", href: "/facilities?category=hospital" },
  { label: "Specialty Centers", href: "/facilities?category=specialty" },
  { label: "Clinics", href: "/facilities?category=clinic" },
  { label: "Doctors", href: "/doctors" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Pharmacies", href: "/pharmacies" },
];

export function SearchFilterControls() {
  return (
    <aside className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-foreground">Categories</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:grid">
          {categoryFilters.map((filter, index) => (
            <Link
              key={filter.label}
              className={`min-h-11 rounded-full border px-4 text-left text-sm font-semibold lg:rounded-md ${
                index === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground"
              }`}
              href={filter.href}
              aria-pressed={index === 0}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

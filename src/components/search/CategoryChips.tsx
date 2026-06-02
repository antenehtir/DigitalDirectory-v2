import Link from "next/link";
import { healthcareCategories } from "./search-options";

const categoryRoutes: Record<string, string> = {
  All: "/search",
  Doctors: "/doctors",
  Hospitals: "/facilities?category=hospital",
  Clinics: "/facilities?category=clinic",
  Pharmacies: "/pharmacies",
  Laboratories: "/facilities?category=laboratory",
};

export function CategoryChips() {
  return (
    <div aria-label="Healthcare categories">
      <p className="mb-2 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
        Search by category
      </p>
      <div className="flex flex-wrap gap-2">
        {healthcareCategories.map((category, index) => (
          <Link
            key={category}
            className={`flex min-h-10 items-center rounded-full border px-3 text-sm font-semibold sm:px-4 ${
              index === 0
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground"
            }`}
            href={categoryRoutes[category]}
            aria-current={index === 0 ? "page" : undefined}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}

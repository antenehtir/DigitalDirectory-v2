import { CategoryChips } from "./CategoryChips";
import { EmptyStatePreview } from "./EmptyStatePreview";
import { FilterChips } from "./FilterChips";
import { LocationPreview } from "./LocationPreview";
import { PopularSearchSuggestions } from "./PopularSearchSuggestions";

export function HealthcareSearchBox() {
  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
      <form className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="home-healthcare-search"
          >
            What healthcare service do you need?
          </label>
          <input
            id="home-healthcare-search"
            className="min-h-14 w-full rounded-md border border-border bg-input px-4 text-base text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Search doctors, facilities, specialties, pharmacies"
            readOnly
          />
        </div>
        <button
          className="min-h-14 self-end rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm"
          type="button"
        >
          Search
        </button>
      </form>

      <div className="mt-5 grid gap-5">
        <CategoryChips />
        <LocationPreview />
        <FilterChips />
        <PopularSearchSuggestions />
        <EmptyStatePreview />
      </div>
    </div>
  );
}

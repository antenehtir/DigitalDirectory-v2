"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryChips } from "./CategoryChips";

export function HealthcareSearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <div className="mt-6 rounded-3xl border border-border bg-card p-3 shadow-[0_18px_50px_rgba(11,31,51,0.08)] sm:mt-8 sm:p-5">
      <form
        className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_auto]"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="home-healthcare-search"
          >
            Reception search
          </label>
          <input
            id="home-healthcare-search"
            className="min-h-13 w-full rounded-2xl border border-border bg-input px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-strong-border sm:min-h-14 sm:px-4"
            placeholder="Search doctors, facilities, specialties, pharmacies"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button
          className="min-h-12 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 lg:min-h-14 lg:self-end"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5">
        <CategoryChips />
      </div>
    </div>
  );
}

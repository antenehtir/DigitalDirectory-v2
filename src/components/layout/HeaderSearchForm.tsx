"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function HeaderSearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form
      className="hidden min-w-64 flex-1 items-center rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors focus-within:border-primary md:flex lg:max-w-sm"
      onSubmit={submitSearch}
      role="search"
    >
      <input
        aria-label="Search providers"
        className="min-h-8 min-w-0 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        placeholder="Search hospitals, clinics, diagnostics"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        aria-label="Search"
        className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        type="submit"
      >
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="m20 20-4.2-4.2m1.2-5.3a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
    </form>
  );
}

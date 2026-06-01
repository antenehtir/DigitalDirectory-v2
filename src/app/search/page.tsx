import { PageShell } from "@/components/layout/PageShell";
import { SearchResultsPage } from "@/components/search-results/SearchResultsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search for hospitals, clinics, doctors, pharmacies, and diagnostic labs in Addis Ababa.",
};

export default function SearchPage() {
  return (
    <PageShell>
      <SearchResultsPage />
    </PageShell>
  );
}

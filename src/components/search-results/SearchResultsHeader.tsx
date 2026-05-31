export function SearchResultsHeader() {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 inline-flex rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-primary shadow-sm">
        Search results preview
      </p>
      <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Find trusted healthcare providers faster.
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        This frontend-only page previews how search results, filters, and empty
        states will feel before real search logic is added.
      </p>
    </div>
  );
}

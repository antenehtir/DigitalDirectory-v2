export function EmptyStatePreview() {
  return (
    <div className="rounded-lg border border-dashed border-border bg-background p-5 text-center">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-muted text-sm font-bold text-primary">
        0
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        No matching providers preview
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Future search results can use this empty state to suggest broader
        specialties, nearby facilities, or verified-only adjustments.
      </p>
    </div>
  );
}

type ResultsSummaryProps = {
  facilityCount: number;
  doctorCount: number;
};

export function ResultsSummary({
  facilityCount,
  doctorCount,
}: ResultsSummaryProps) {
  const totalCount = facilityCount + doctorCount;

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-sm font-semibold text-foreground">
        {totalCount} sample results
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Showing {facilityCount} facility previews and {doctorCount} doctor
        previews from mock data. Real ranking and search matching will come in a
        later phase.
      </p>
    </div>
  );
}

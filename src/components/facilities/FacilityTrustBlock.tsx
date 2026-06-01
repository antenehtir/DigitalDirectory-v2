const trustPoints = [
  "Verified facilities are clearly marked with a green badge.",
  "Working hours and open status are shown on every card.",
  "You can suggest a correction if any detail looks wrong.",
];

export function FacilityTrustBlock() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Trust first
      </p>
      <h2 className="mt-2 text-xl font-semibold text-foreground">
        Facility listings should make trust easy to scan.
      </h2>
      <div className="mt-4 grid gap-3">
        {trustPoints.map((point) => (
          <div key={point} className="flex gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-success" />
            <p className="text-sm leading-6 text-muted-foreground">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

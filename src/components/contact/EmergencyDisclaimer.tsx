export function EmergencyDisclaimer() {
  return (
    <section className="rounded-lg border border-warning bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-warning">
        Emergency disclaimer
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        This is not an emergency support channel.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        For urgent medical needs, users should contact local emergency services
        or visit the nearest appropriate healthcare facility.
      </p>
    </section>
  );
}

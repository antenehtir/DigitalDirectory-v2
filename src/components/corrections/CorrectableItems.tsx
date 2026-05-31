const correctableItems = [
  "Facility or doctor name",
  "Phone number or contact method",
  "Address or service area",
  "Specialties and services",
  "Opening hours",
  "Verification or trust status",
];

export function CorrectableItems() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
          What can be corrected
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Keep patient-facing details clear.
        </h2>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {correctableItems.map((item) => (
          <div
            className="rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

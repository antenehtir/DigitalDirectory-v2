const pharmacies = [
  {
    name: "Bole Community Pharmacy",
    detail: "Medicine access preview",
    note: "Open status will be confirmed in a future version.",
  },
  {
    name: "Central Care Pharmacy",
    detail: "Prescription and wellness items",
    note: "Inventory checks are not active yet.",
  },
];

export function PharmacyNearMePreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Pharmacy near me
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Pharmacy discovery preview
      </h2>
      <div className="mt-5 grid gap-3">
        {pharmacies.map((pharmacy) => (
          <article
            className="rounded-md border border-border bg-background p-4 shadow-sm"
            key={pharmacy.name}
          >
            <h3 className="text-base font-semibold text-foreground">
              {pharmacy.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {pharmacy.detail}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {pharmacy.note}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

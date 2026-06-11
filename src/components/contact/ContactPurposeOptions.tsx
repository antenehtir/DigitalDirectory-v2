const purposes = [
  {
    title: "General support",
    description: "Questions about finding doctors, facilities, or services.",
  },
  {
    title: "Provider listing help",
    description: "Guidance for doctors, facilities, pharmacies, and labs.",
  },
  {
    title: "Suggest a correction",
    description: "Report outdated contact, location, services, or trust status.",
  },
  {
    title: "Partnership inquiry",
    description: "Contact path for organizations and collaborators.",
  },
];

export function ContactPurposeOptions() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Contact purpose
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Choose the type of support.
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {purposes.map((purpose) => (
          <article
            className="min-h-28 rounded-md border border-border bg-background p-4 shadow-sm"
            key={purpose.title}
          >
            <h3 className="text-base font-semibold text-foreground">
              {purpose.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {purpose.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

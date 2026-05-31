const updateTopics = [
  "New verified providers",
  "Pharmacy and diagnostics additions",
  "Correction and feedback reminders",
  "Provider onboarding announcements",
];

export function NewsletterPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Email updates preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Email updates can come later.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This static preview reserves space for future platform updates without
        collecting email addresses or sending messages.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex min-h-12 items-center rounded-md border border-border bg-input px-4 text-sm text-muted-foreground shadow-sm">
          Email address preview
        </div>
        <div className="flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm">
          Subscribe preview
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {updateTopics.map((topic) => (
          <span
            className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground"
            key={topic}
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}

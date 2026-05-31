const specialties = [
  "All doctors",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Gynecology",
  "Dentistry",
  "Internal medicine",
];

export function SpecialtyFilterChips() {
  return (
    <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-sm font-semibold text-foreground">
        Specialty filters
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {specialties.map((specialty, index) => (
          <button
            key={specialty}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${
              index === 0
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground"
            }`}
            type="button"
            aria-pressed={index === 0}
          >
            {specialty}
          </button>
        ))}
      </div>
    </section>
  );
}

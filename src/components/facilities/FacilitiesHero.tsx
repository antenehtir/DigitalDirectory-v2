export function FacilitiesHero() {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
        Addis Ababa · Healthcare facilities
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        Find clinics, hospitals, and care centres near you.
      </h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">
        Browse 99 registered healthcare providers across Addis Ababa —
        hospitals, specialty centres, diagnostics labs, and more. All listings
        are verification-pending and displayed as submitted.
      </p>

      {/* Quick stats */}
      <div className="mt-5 flex flex-wrap gap-4">
        {[
          { label: "General Hospitals", count: "25" },
          { label: "Specialty Centres", count: "60" },
          { label: "Diagnostic Labs", count: "7" },
          { label: "Other services", count: "7" },
        ].map(({ label, count }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{count}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}

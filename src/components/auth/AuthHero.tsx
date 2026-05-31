type AuthHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthHero({ eyebrow, title, description }: AuthHeroProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}

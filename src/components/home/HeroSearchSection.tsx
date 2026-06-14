import { PageContainer } from "@/components/layout/PageContainer";
import { HealthcareSearchBox } from "@/components/search/HealthcareSearchBox";

export function HeroSearchSection() {
  return (
    <section className="bg-[linear-gradient(180deg,var(--card)_0%,var(--background)_100%)]">
      <PageContainer className="py-7 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex max-w-full rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground shadow-[0_8px_24px_rgba(0,0,0,0.035)] sm:px-4">
            Private healthcare discovery for Addis Ababa
          </p>
          <h1 className="mx-auto max-w-3xl text-[2rem] font-semibold leading-[1.08] text-foreground sm:text-5xl">
            Find healthcare facilities, services, doctors, and pharmacies on the go.
          </h1>

          <div className="mx-auto max-w-3xl text-left">
            <HealthcareSearchBox />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

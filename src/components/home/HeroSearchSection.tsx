import { PageContainer } from "@/components/layout/PageContainer";
import { HealthcareSearchBox } from "@/components/search/HealthcareSearchBox";

export function HeroSearchSection() {
  return (
    <section className="bg-background">
      <PageContainer className="py-7 sm:py-14 lg:py-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex max-w-full rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground sm:px-4">
            Private healthcare discovery for Addis Ababa
          </p>
          <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.08] text-foreground sm:text-5xl">
            Find healthcare facilities, services, doctors, and pharmacies on the go.
          </h1>

          <HealthcareSearchBox />
        </div>
      </PageContainer>
    </section>
  );
}

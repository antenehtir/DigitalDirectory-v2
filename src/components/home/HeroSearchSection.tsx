import { PageContainer } from "@/components/layout/PageContainer";
import { HealthcareSearchBox } from "@/components/search/HealthcareSearchBox";

export function HeroSearchSection() {
  return (
    <section className="bg-background">
      <PageContainer className="py-8 sm:py-14 lg:py-16">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:items-center">
          <div className="min-w-0">
          <p className="mb-4 inline-flex max-w-full rounded-full border border-border bg-[#ECFEFF] px-3 py-2 text-sm font-medium text-[#0F766E] sm:px-4">
            Private healthcare discovery for Addis Ababa
          </p>
          <h1 className="max-w-3xl text-[2.15rem] font-semibold leading-[1.04] text-foreground sm:text-5xl sm:leading-[1.02]">
            Find the right care, faster.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Search private hospitals, clinics, diagnostics, doctors, and
            pharmacies across Addis Ababa.
          </p>

          <div className="max-w-3xl">
            <HealthcareSearchBox />
          </div>
          </div>

          <aside className="w-full min-w-0 rounded-3xl border border-border bg-card p-5 shadow-[0_18px_46px_rgba(31,41,55,0.06)] sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ECFEFF] text-sm font-bold text-[#0F766E]">
                1
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Care pathway
                </p>
                <p className="text-sm text-muted-foreground">
                  Start with a search, category, or nearby care.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {["Search by need", "Choose care type", "Open provider details"].map(
                (step, index) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"
                    key={step}
                  >
                    <span className="size-2 shrink-0 rounded-full bg-[#14B8A6]" />
                    <p className="min-w-0 text-sm font-medium text-foreground">
                      {index + 1}. {step}
                    </p>
                  </div>
                ),
              )}
            </div>
            <a
              className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-[#0B5E58]"
              href="/nearby"
            >
              Find nearby care
            </a>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}

import { DoctorCard } from "@/components/cards/DoctorCard";
import { FacilityCard } from "@/components/cards/FacilityCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { sampleDoctors } from "@/data/sampleDoctors";
import { sampleFacilities } from "@/data/sampleFacilities";
import { ResultsSummary } from "./ResultsSummary";
import { SearchFilterControls } from "./SearchFilterControls";
import { SearchInputPreview } from "./SearchInputPreview";
import { SearchResultsEmptyState } from "./SearchResultsEmptyState";
import { SearchResultsHeader } from "./SearchResultsHeader";

export function SearchResultsPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <SearchResultsHeader />
        <SearchInputPreview />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <SearchFilterControls />

          <div className="grid gap-6">
            <ResultsSummary
              facilityCount={sampleFacilities.length}
              doctorCount={sampleDoctors.length}
            />

            <section>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Facility results
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sample facility cards using the reusable card system.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {sampleFacilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Doctor results
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sample doctor cards using the reusable doctor card system.
                </p>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {sampleDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </section>

            <SearchResultsEmptyState />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

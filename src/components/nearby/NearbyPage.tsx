import Link from "next/link";
import { FacilityCardGrid } from "@/components/cards/FacilityCardGrid";
import { PageContainer } from "@/components/layout/PageContainer";
import { NearbyHero } from "./NearbyHero";
import type { Facility } from "@/types/facility";

type NearbyPageProps = {
  areaOptions: string[];
  facilities: Facility[];
  selectedArea: string;
};

export function NearbyPage({
  areaOptions,
  facilities,
  selectedArea,
}: NearbyPageProps) {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <NearbyHero />

        <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
          <h2 className="text-2xl font-semibold leading-tight text-foreground">
            Browse by Sub-city / Area
          </h2>
          {areaOptions.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {areaOptions.map((area) => {
                const isActive = area === selectedArea;

                return (
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground"
                    }`}
                    href={`/nearby?area=${encodeURIComponent(area)}`}
                    key={area}
                  >
                    {area}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Area options will be added soon.
            </p>
          )}
        </section>

        {selectedArea ? (
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Facilities in {selectedArea}
              </h2>
            </div>
            {facilities.length > 0 ? (
              <FacilityCardGrid facilities={facilities} />
            ) : (
              <section className="rounded-lg border border-dashed border-border bg-card p-5 text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  No facilities found for this area yet.
                </h3>
              </section>
            )}
          </section>
        ) : null}
      </div>
    </PageContainer>
  );
}

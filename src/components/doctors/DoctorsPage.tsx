import { DoctorCardGrid } from "@/components/cards/DoctorCardGrid";
import { PageContainer } from "@/components/layout/PageContainer";
import { sampleDoctors } from "@/data/sampleDoctors";
import type { Doctor } from "@/types/doctor";
import { DoctorAvailabilityPreview } from "./DoctorAvailabilityPreview";
import { DoctorSearchPreview } from "./DoctorSearchPreview";
import { DoctorTrustBlock } from "./DoctorTrustBlock";
import { DoctorsHero } from "./DoctorsHero";
import { RequestDoctorProfileCta } from "./RequestDoctorProfileCta";
import { SpecialtyFilterChips } from "./SpecialtyFilterChips";

type DoctorsPageProps = {
  doctors?: Doctor[];
};

export function DoctorsPage({ doctors = sampleDoctors }: DoctorsPageProps) {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <DoctorsHero />
        <DoctorSearchPreview />
        <SpecialtyFilterChips />

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Doctor results
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Sample doctor cards using the reusable doctor card system.
            </p>
          </div>
          <DoctorCardGrid doctors={doctors} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <DoctorAvailabilityPreview />
          <DoctorTrustBlock />
        </div>

        <RequestDoctorProfileCta />
      </div>
    </PageContainer>
  );
}

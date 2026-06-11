import { DoctorCardGrid } from "@/components/cards/DoctorCardGrid";
import { PageContainer } from "@/components/layout/PageContainer";
import { sampleDoctors } from "@/data/sampleDoctors";
import { SectionHeading } from "./SectionHeading";

export function DoctorDiscoverySection() {
  return (
    <section className="bg-background">
      <PageContainer className="py-8 sm:py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Doctors"
            title="Doctor discovery starts with clear profile information."
            description="Doctor cards keep specialty, facility, and verification signals easy to compare."
          />
          <DoctorCardGrid
            doctors={sampleDoctors.slice(0, 2)}
            className="grid gap-4"
          />
        </div>
      </PageContainer>
    </section>
  );
}

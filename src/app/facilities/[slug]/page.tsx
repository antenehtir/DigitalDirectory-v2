import { FacilityDetailPage } from "@/components/facility-detail/FacilityDetailPage";
import { PageShell } from "@/components/layout/PageShell";
import { getPublicFacilityBySlugFromSource } from "@/lib/public-listing-source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 300;

type FacilitySlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: FacilitySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = await getPublicFacilityBySlugFromSource(slug);

  if (!facility) {
    return { title: "Facility not found" };
  }

  return {
    title: facility.name,
    description: `${facility.subcategory} in ${facility.location}. Find contact details, hours, and services on Tiru.`,
  };
}

export default async function FacilitySlugRoute({
  params,
}: FacilitySlugPageProps) {
  const { slug } = await params;
  const facility = await getPublicFacilityBySlugFromSource(slug);

  if (!facility) {
    notFound();
  }

  return (
    <PageShell>
      <FacilityDetailPage facility={facility} />
    </PageShell>
  );
}

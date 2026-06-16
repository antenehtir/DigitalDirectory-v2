import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FacilityDetailPage } from "@/components/facility-detail/FacilityDetailPage";
import { PageShell } from "@/components/layout/PageShell";
import { getRealFacilityBySlug } from "@/data/real-facility-profiles";

export const dynamic = "force-dynamic";

type DiagnosticsDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: DiagnosticsDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = getRealFacilityBySlug(slug);
  const diagnostic =
    facility && isDiagnosticsFacility(facility) ? facility : null;

  return {
    title: diagnostic ? `${diagnostic.name} — Tiru` : "Diagnostic Center — Tiru",
    description: diagnostic
      ? `Diagnostic center in ${diagnostic.location}, Addis Ababa.`
      : "",
  };
}

export default async function DiagnosticsDetailRoute({
  params,
}: DiagnosticsDetailRouteProps) {
  const { slug } = await params;
  const facility = getRealFacilityBySlug(slug);

  if (!facility || !isDiagnosticsFacility(facility)) {
    notFound();
  }

  return (
    <PageShell>
      <FacilityDetailPage facility={facility} />
    </PageShell>
  );
}

function isDiagnosticsFacility(facility: {
  category: string;
  subcategory: string;
  services: string[];
}) {
  return [facility.category, facility.subcategory, ...facility.services]
    .join(" ")
    .toLowerCase()
    .match(/diagnostic|laboratory|lab|imaging|radiology/);
}

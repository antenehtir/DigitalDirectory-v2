import { PageShell } from "@/components/layout/PageShell";
import { NearbyPage } from "@/components/nearby/NearbyPage";
import { realFacilities } from "@/data/real-facility-profiles";

type NearbyRouteProps = {
  searchParams?: Promise<{
    area?: string | string[];
  }>;
};

export default async function NearbyRoute({ searchParams }: NearbyRouteProps) {
  const params = await searchParams;
  const selectedArea = normalizeAreaParam(params?.area);
  const areaOptions = getAreaOptions();
  const facilities = selectedArea
    ? realFacilities.filter((facility) => facility.location === selectedArea)
    : [];

  return (
    <PageShell>
      <NearbyPage
        areaOptions={areaOptions}
        facilities={facilities}
        selectedArea={selectedArea}
      />
    </PageShell>
  );
}

function normalizeAreaParam(value: string | string[] | undefined): string {
  const source = Array.isArray(value) ? value[0] : value;

  return source?.trim() ?? "";
}

function getAreaOptions(): string[] {
  return Array.from(
    new Set(
      realFacilities.map((facility) => facility.location).filter(Boolean),
    ),
  ).sort((left, right) => left.localeCompare(right));
}

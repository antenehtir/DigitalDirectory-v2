import { PageShell } from "@/components/layout/PageShell";
import {
  NearbyPage,
  type NearbyFacility,
} from "@/components/nearby/NearbyPage";
import { realFacilities } from "@/data/real-facility-profiles";
import { extractCoordinatesFromText } from "@/lib/nearby-distance";
import type { Facility, FacilityContactChannel } from "@/types/facility";

type NearbyRouteProps = {
  searchParams?: Promise<{
    area?: string | string[];
    category?: string | string[];
  }>;
};

export default async function NearbyRoute({ searchParams }: NearbyRouteProps) {
  const params = await searchParams;
  const selectedArea = normalizeAreaParam(params?.area);
  const selectedCategory = normalizeCategoryParam(params?.category);
  const areaOptions = getAreaOptions();

  return (
    <PageShell>
      <NearbyPage
        areaOptions={areaOptions}
        facilities={realFacilities.map(mapFacilityToNearbyFacility)}
        initialCategory={selectedCategory}
        selectedArea={selectedArea}
      />
    </PageShell>
  );
}

function normalizeAreaParam(value: string | string[] | undefined): string {
  const source = Array.isArray(value) ? value[0] : value;

  return source?.trim() ?? "";
}

function normalizeCategoryParam(value: string | string[] | undefined): string {
  const source = Array.isArray(value) ? value[0] : value;
  const normalized = source?.trim().toLowerCase() ?? "";

  return [
    "all",
    "hospital",
    "specialty",
    "clinic",
    "doctors",
    "diagnostics",
    "pharmacies",
  ].includes(normalized)
    ? normalized
    : "all";
}

function getAreaOptions(): string[] {
  return Array.from(
    new Set(
      realFacilities.map((facility) => facility.location).filter(Boolean),
    ),
  ).sort((left, right) => left.localeCompare(right));
}

function mapFacilityToNearbyFacility(facility: Facility): NearbyFacility {
  const mapsText = (facility.contactChannels ?? [])
    .filter((channel) => channel.channelType === "maps")
    .map(createCoordinateSearchText)
    .join(" ");

  return {
    ...facility,
    coordinates: extractCoordinatesFromText(mapsText),
  };
}

function createCoordinateSearchText(channel: FacilityContactChannel): string {
  return [channel.href, channel.value].filter(Boolean).join(" ");
}

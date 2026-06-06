import { PageShell } from "@/components/layout/PageShell";
import { PharmaciesPage } from "@/components/pharmacies/PharmaciesPage";
import { samplePharmacies } from "@/data/samplePharmacies";
import {
  filterFacilitiesByQuery,
  normalizeSearchParam,
} from "@/lib/frontend-search-filters";
import { getSupabasePublicPharmacyCards } from "@/lib/supabase/pharmacies-public-read";
import type { Facility } from "@/types/facility";
import type { PublicProviderCard } from "@/types/public-listings";

export const dynamic = "force-dynamic";

type PharmaciesRouteProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function PharmaciesRoute({
  searchParams,
}: PharmaciesRouteProps) {
  const params = await searchParams;
  const query = normalizeSearchParam(params?.q);
  const pharmacies = filterFacilitiesByQuery(await getPharmaciesForRoute(), query);

  return (
    <PageShell>
      <PharmaciesPage activeQuery={query} pharmacies={pharmacies} />
    </PageShell>
  );
}

const samplePharmaciesById = new Map(
  samplePharmacies.map((pharmacy) => [pharmacy.id, pharmacy]),
);

async function getPharmaciesForRoute(): Promise<Facility[]> {
  const supabaseResult = await getSupabasePublicPharmacyCards();

  if (supabaseResult.cards.length === 0) {
    return samplePharmacies.map(addPharmacyDetailHref);
  }

  return mapPublicPharmacyCardsToFacilities(supabaseResult.cards);
}

function mapPublicPharmacyCardsToFacilities(
  cards: PublicProviderCard[],
): Facility[] {
  return cards.map((card) => {
    const samplePharmacy = samplePharmaciesById.get(card.id);

    if (samplePharmacy) {
      return {
        ...samplePharmacy,
        detailHref: card.listingHref,
      };
    }

    return {
      id: card.id,
      name: card.name,
      slug: card.slug,
      category: card.categoryLabel,
      subcategory: card.summary,
      services: card.services,
      location: card.locationLabel,
      address: card.locationLabel,
      workingHours: card.hoursPreview ?? "Hours not listed",
      verificationStatus: card.verificationStatus,
      isOpen: false,
      availabilityNote: card.availabilityPreview ?? "Availability not listed",
      contactActionLabel: card.primaryActionLabel,
      directionsActionLabel: card.secondaryActionLabel,
      detailHref: card.listingHref,
    };
  });
}

function addPharmacyDetailHref(pharmacy: Facility): Facility {
  return {
    ...pharmacy,
    detailHref: `/pharmacies/${pharmacy.slug}`,
  };
}

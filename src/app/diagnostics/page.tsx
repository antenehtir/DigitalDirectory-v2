import { DiagnosticsPage } from "@/components/diagnostics/DiagnosticsPage";
import { PageShell } from "@/components/layout/PageShell";
import { sampleDiagnostics } from "@/data/sampleDiagnostics";
import { getSupabasePublicDiagnosticsCards } from "@/lib/supabase/diagnostics-public-read";
import type { Facility } from "@/types/facility";
import type { PublicProviderCard } from "@/types/public-listings";

export const dynamic = "force-dynamic";

export default async function DiagnosticsRoute() {
  const diagnostics = await getDiagnosticsForRoute();

  return (
    <PageShell>
      <DiagnosticsPage diagnostics={diagnostics} />
    </PageShell>
  );
}

const sampleDiagnosticsById = new Map(
  sampleDiagnostics.map((diagnosticsProvider) => [
    diagnosticsProvider.id,
    diagnosticsProvider,
  ]),
);

async function getDiagnosticsForRoute(): Promise<Facility[]> {
  const supabaseResult = await getSupabasePublicDiagnosticsCards();

  if (supabaseResult.cards.length === 0) {
    return sampleDiagnostics;
  }

  return mapPublicDiagnosticsCardsToFacilities(supabaseResult.cards);
}

function mapPublicDiagnosticsCardsToFacilities(
  cards: PublicProviderCard[],
): Facility[] {
  return cards.map((card) => {
    const sampleDiagnosticsProvider = sampleDiagnosticsById.get(card.id);

    if (sampleDiagnosticsProvider) {
      return {
        ...sampleDiagnosticsProvider,
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
      workingHours: card.hoursPreview ?? "Hours will be added after verification.",
      verificationStatus: card.verificationStatus,
      isOpen: false,
      availabilityNote:
        card.availabilityPreview ?? "Availability details are being verified.",
      contactActionLabel: card.primaryActionLabel,
      directionsActionLabel: card.secondaryActionLabel,
      detailHref: card.listingHref,
    };
  });
}

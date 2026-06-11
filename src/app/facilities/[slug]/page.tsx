import { notFound } from "next/navigation";

import { FacilityDetailPage } from "@/components/facility-detail/FacilityDetailPage";
import { PageShell } from "@/components/layout/PageShell";
import { getSupabasePublicFacilityDetailBySlug } from "@/lib/supabase/facilities-public-read";
import {
  getSupabasePublicProviderContactChannels,
  type PublicProviderContactChannel,
} from "@/lib/supabase/provider-contact-channels-public-read";
import type { Facility, FacilityContactChannel } from "@/types/facility";
import type { PublicProviderDetail } from "@/types/public-listings";

export const dynamic = "force-dynamic";

type FacilityDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FacilityDetailRoute({
  params,
}: FacilityDetailRouteProps) {
  const { slug } = await params;
  const [result, contactChannels] = await Promise.all([
    getSafeFacilityDetail(slug),
    getSafeFacilityContactChannels(slug),
  ]);

  if (result.status !== "success") {
    notFound();
  }

  return (
    <PageShell>
      <FacilityDetailPage
        facility={mapPublicProviderDetailToFacility(
          result.detail,
          contactChannels,
        )}
      />
    </PageShell>
  );
}

async function getSafeFacilityDetail(slug: string) {
  try {
    return await getSupabasePublicFacilityDetailBySlug(slug);
  } catch {
    return {
      status: "error" as const,
      source: "static-fallback" as const,
      detail: null,
      fallbackRecommended: true as const,
      reason: "query-failed" as const,
      errorCode: "FACILITY_DETAIL_PUBLIC_READ_FAILED" as const,
      message:
        "Supabase facility detail public read failed. Use not-found handling.",
    };
  }
}

async function getSafeFacilityContactChannels(
  slug: string,
): Promise<FacilityContactChannel[]> {
  try {
    const result = await getSupabasePublicProviderContactChannels(
      "facility",
      slug,
    );

    if (result.status !== "success") {
      return [];
    }

    return result.channels
      .map(mapPublicProviderContactChannelToFacilityContactChannel)
      .filter(
        (channel): channel is FacilityContactChannel => Boolean(channel),
      );
  } catch {
    return [];
  }
}

function mapPublicProviderDetailToFacility(
  detail: PublicProviderDetail,
  contactChannels: FacilityContactChannel[],
): Facility {
  const category = detail.categoryLabel;

  return {
    id: detail.id,
    name: detail.name,
    slug: detail.slug,
    category,
    subcategory: detail.description || detail.summary,
    services: detail.services.length > 0 ? detail.services : [category],
    location: detail.location.displayName || detail.locationLabel,
    address: detail.address ?? detail.locationLabel,
    workingHours: detail.workingHours,
    verificationStatus: detail.verificationStatus,
    isOpen: false,
    availabilityNote:
      detail.availabilityPreview ?? "Availability details are being verified.",
    contactActionLabel: detail.primaryActionLabel,
    directionsActionLabel: detail.secondaryActionLabel,
    contactChannels,
  };
}

function mapPublicProviderContactChannelToFacilityContactChannel(
  channel: PublicProviderContactChannel,
): FacilityContactChannel | null {
  if (!isAllowedFacilityContactChannelType(channel.channelType)) {
    return null;
  }

  return {
    id: channel.id,
    channelType: channel.channelType,
    label: channel.label,
    value: channel.valuePublic,
    href: channel.urlPublic,
  };
}

function isAllowedFacilityContactChannelType(
  channelType: PublicProviderContactChannel["channelType"],
): channelType is FacilityContactChannel["channelType"] {
  return (
    channelType === "phone" ||
    channelType === "whatsapp" ||
    channelType === "website" ||
    channelType === "maps" ||
    channelType === "social" ||
    channelType === "appointment"
  );
}

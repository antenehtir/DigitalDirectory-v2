import { PageShell } from "@/components/layout/PageShell";
import { NearbyPage } from "@/components/nearby/NearbyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nearby Healthcare",
  description:
    "Discover hospitals, clinics, and pharmacies near you in Addis Ababa.",
};

export default function NearbyRoute() {
  return (
    <PageShell>
      <NearbyPage />
    </PageShell>
  );
}

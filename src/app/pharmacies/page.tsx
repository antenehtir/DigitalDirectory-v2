import { PageShell } from "@/components/layout/PageShell";
import { PharmaciesPage } from "@/components/pharmacies/PharmaciesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmacies",
  description:
    "Find pharmacies and medication providers in Addis Ababa. Check availability and pickup options.",
};

export default function PharmaciesRoute() {
  return (
    <PageShell>
      <PharmaciesPage />
    </PageShell>
  );
}

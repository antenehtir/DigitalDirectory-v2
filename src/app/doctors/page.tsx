import { DoctorsPage } from "@/components/doctors/DoctorsPage";
import { PageShell } from "@/components/layout/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors",
  description:
    "Find verified doctors and specialists in Addis Ababa. Browse by specialty, location, and availability.",
};

export default function DoctorsRoute() {
  return (
    <PageShell>
      <DoctorsPage />
    </PageShell>
  );
}

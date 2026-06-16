import type { Metadata } from "next";
import { Suspense } from "react";
import { CorrectionsPage } from "@/components/corrections/CorrectionsPage";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Suggest a Correction — Tiru",
  description:
    "Help keep Tiru accurate by suggesting corrections to provider listings.",
};

export default function CorrectionsRoute() {
  return (
    <PageShell>
      <Suspense>
        <CorrectionsPage />
      </Suspense>
    </PageShell>
  );
}

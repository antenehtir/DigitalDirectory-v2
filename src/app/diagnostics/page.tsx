import { DiagnosticsPage } from "@/components/diagnostics/DiagnosticsPage";
import { PageShell } from "@/components/layout/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostics",
  description:
    "Find diagnostic labs and imaging centres in Addis Ababa. Search by test type and location.",
};

export default function DiagnosticsRoute() {
  return (
    <PageShell>
      <DiagnosticsPage />
    </PageShell>
  );
}

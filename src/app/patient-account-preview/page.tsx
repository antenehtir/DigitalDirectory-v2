import { PageShell } from "@/components/layout/PageShell";
import { PatientAccountPreviewPage } from "@/components/patient-account/PatientAccountPreviewPage";

export default function PatientAccountPreviewRoute() {
  return (
    <PageShell>
      <PatientAccountPreviewPage />
    </PageShell>
  );
}

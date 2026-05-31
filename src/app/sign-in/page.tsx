import { PageShell } from "@/components/layout/PageShell";
import { SignInPreviewPage } from "@/components/auth/SignInPreviewPage";

export default function SignInRoute() {
  return (
    <PageShell>
      <SignInPreviewPage />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Contact — Tiru",
  description: "Get in touch with the Tiru team.",
};

export default function ContactRoute() {
  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "./SectionHeading";

const categories = [
  { label: "Doctors", detail: "Find specialist and general practitioners", href: "/doctors" },
  { label: "Hospitals", detail: "Browse major hospitals and care centres", href: "/facilities" },
  { label: "Clinics", detail: "Discover local outpatient clinics", href: "/facilities" },
  { label: "Pharmacies", detail: "Locate nearby pharmacies and dispensaries", href: "/pharmacies" },
  { label: "Laboratories", detail: "Find diagnostic labs and sample collection", href: "/diagnostics" },
  { label: "Imaging centres", detail: "X-ray, ultrasound, and scan services", href: "/diagnostics" },
];

export function QuickCategoriesSection() {
  return (
    <section className="bg-card">
      <PageContainer className="py-8 sm:py-10 lg:py-14">
        <SectionHeading
          eyebrow="Discover"
          title="Start with the care category you need."
          description="Choose a category to browse providers in Addis Ababa."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.label}
              className="rounded-lg border border-border bg-background p-5 shadow-sm transition-colors hover:border-primary"
              href={category.href}
            >
              <p className="text-lg font-semibold text-foreground">
                {category.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {category.detail}
              </p>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

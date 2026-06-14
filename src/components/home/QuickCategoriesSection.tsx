import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

const categories = [
  { label: "General Hospitals", href: "/facilities?category=hospital" },
  { label: "Specialty Centers", href: "/facilities?category=specialty" },
  { label: "Clinics", href: "/facilities?category=clinic" },
  { label: "Doctors", href: "/doctors" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Pharmacies", href: "/pharmacies" },
];

export function QuickCategoriesSection() {
  return (
    <section className="bg-card">
      <PageContainer className="py-8 sm:py-10 lg:py-14">
        <h2 className="text-2xl font-semibold leading-tight text-foreground">
          Browse care categories
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.label}
              className="flex min-h-14 items-center rounded-lg border border-border bg-background px-4 text-base font-semibold text-foreground transition-colors hover:border-primary"
              href={category.href}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

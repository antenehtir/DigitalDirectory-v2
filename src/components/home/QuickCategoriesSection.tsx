import Link from "next/link";
import type { SVGProps } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

function CategoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

const categories = [
  {
    label: "General Hospitals",
    description: "Full-service private hospitals",
    href: "/facilities?category=hospital",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M4 21V8a1 1 0 011-1h4V4a1 1 0 011-1h4a1 1 0 011 1v3h4a1 1 0 011 1v13" />
        <path d="M4 21h16" />
        <path d="M12 8v4M10 10h4" />
        <path d="M9 21v-3h6v3" />
      </CategoryIcon>
    ),
  },
  {
    label: "Specialty Centers",
    description: "Focused care and specialist units",
    href: "/facilities?category=specialty",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M3 12h4l2-5 4 10 2-5h6" />
      </CategoryIcon>
    ),
  },
  {
    label: "Clinics",
    description: "Primary and outpatient care",
    href: "/facilities?category=clinic",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M4 11l8-7 8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M12 13v4M10 15h4" />
      </CategoryIcon>
    ),
  },
  {
    label: "Specialists",
    description: "Specialist profiles and specialties",
    href: "/doctors",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M6 3v6a6 6 0 006 6 6 6 0 006-6V3" />
        <path d="M6 3H4M18 3h2M18 15a4 4 0 01-4 4H10" />
        <circle cx="18" cy="19" r="2" />
      </CategoryIcon>
    ),
  },
  {
    label: "Diagnostics",
    description: "Labs, imaging, and tests",
    href: "/diagnostics",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M9 2v6.5L4.5 19a2 2 0 001.8 3h11.4a2 2 0 001.8-3L15 8.5V2" />
        <path d="M9 2h6" />
        <path d="M7 16h10" />
      </CategoryIcon>
    ),
  },
  {
    label: "Pharmacies",
    description: "Medicine access points",
    href: "/pharmacies",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <rect x="2" y="7" width="20" height="10" rx="5" />
        <path d="M12 7v10" />
      </CategoryIcon>
    ),
  },
  {
    label: "Ambulance",
    description: "Emergency transport",
    href: "/facilities?category=ambulance",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M3 12h1m16 0h1M5 12V7l3-3h8l3 3v5M5 12v4a1 1 0 001 1h12a1 1 0 001-1v-4M9 21v-4h6v4" />
        <path d="M9 7h6M12 7v3" />
      </CategoryIcon>
    ),
  },
  {
    label: "Home Care",
    description: "Care at your home",
    href: "/facilities?category=homecare",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <CategoryIcon {...props}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M12 12a2 2 0 100 4 2 2 0 000-4z" />
      </CategoryIcon>
    ),
  },
];

export function QuickCategoriesSection() {
  return (
    <section className="bg-transparent">
      <PageContainer className="py-7 sm:py-10 lg:py-12">
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-foreground">
            Browse by category
          </h2>
          <div className="mt-5 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.label}
                  className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-strong-border"
                  href={category.href}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-soft-accent text-primary">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-words hyphens-auto text-sm font-semibold leading-tight text-foreground">
                      {category.label}
                    </span>
                    <span className="mt-0.5 block line-clamp-2 text-xs leading-snug text-muted-foreground">
                      {category.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

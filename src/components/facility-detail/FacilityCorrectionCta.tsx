import Link from "next/link";
import type { Facility } from "@/types/facility";

type FacilityCorrectionCtaProps = {
  facility: Facility;
};

export function FacilityCorrectionCta({ facility }: FacilityCorrectionCtaProps) {
  return (
    <section className="rounded-lg bg-primary p-5 text-primary-foreground shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal">
        Request correction
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight">
        See something outdated for {facility.name}?
      </h2>
      <p className="mt-3 text-sm leading-6 text-primary-foreground/85">
        Preview the correction flow for outdated services, hours, location, or
        trust details.
      </p>
      <Link
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-card px-5 text-center text-sm font-semibold text-[#0F172A] sm:w-auto"
        href="/corrections"
        style={{ color: "#0F172A" }}
      >
        Request correction preview
      </Link>
    </section>
  );
}

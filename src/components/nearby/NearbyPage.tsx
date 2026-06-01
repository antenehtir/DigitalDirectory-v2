"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { sampleFacilities } from "@/data/sampleFacilities";
import { NearbyTrustPrivacyNote } from "./NearbyTrustPrivacyNote";

const FacilityMap = dynamic(
  () => import("@/components/map/FacilityMap").then((m) => m.FacilityMap),
  { ssr: false, loading: () => <div className="w-full h-full rounded-lg bg-muted animate-pulse" /> }
);

const AREA_TABS = [
  { slug: "all", label: "All areas" },
  { slug: "bole", label: "Bole" },
  { slug: "yeka", label: "Yeka" },
  { slug: "lemi kura", label: "CMC / Lemi Kura" },
  { slug: "kirkos", label: "Kirkos" },
  { slug: "arada", label: "Piassa / Arada" },
  { slug: "nifas silk-lafto", label: "Sarbet / Jemo" },
  { slug: "kolfe", label: "Kolfe" },
  { slug: "lideta", label: "Lideta" },
];

const TYPE_FILTERS = ["All types", "Hospital", "Clinic", "Diagnostic Center", "Pharmacy"];

export function NearbyPage() {
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedType, setSelectedType] = useState("All types");
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);

  const filteredFacilities = useMemo(() => {
    return sampleFacilities.filter((f) => {
      const matchArea =
        selectedArea === "all" ||
        f.subcity?.toLowerCase().includes(selectedArea.toLowerCase()) ||
        f.area?.toLowerCase().includes(selectedArea.toLowerCase());
      const matchType =
        selectedType === "All types" || f.category === selectedType;
      return matchArea && matchType;
    });
  }, [selectedArea, selectedType]);

  const mapFacilities = useMemo(
    () => sampleFacilities.filter((f) => f.lat && f.lng && f.subcity !== "online"),
    []
  );

  const listFacilities = filteredFacilities
    .filter((f) => f.subcity !== "online")
    .slice(0, 20);

  return (
    <PageContainer className="py-6 sm:py-8 lg:py-12">
      <div className="grid gap-6">
        {/* Hero */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Addis Ababa · Nearby care
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Healthcare options on the map
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Browse {sampleFacilities.filter(f => f.subcity !== "online").length} verified healthcare centres across Addis Ababa. Tap a pin to see details.
          </p>
        </div>

        {/* Area filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {AREA_TABS.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setSelectedArea(tab.slug)}
              aria-pressed={selectedArea === tab.slug}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selectedArea === tab.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Map */}
        <section className="relative overflow-hidden rounded-xl border border-border shadow-sm" style={{ height: "clamp(320px, 55vh, 520px)" }}>
          <FacilityMap
            facilities={mapFacilities}
            selectedArea={selectedArea === "all" ? undefined : selectedArea}
            onFacilityClick={(f) => setHighlightedFacility(f.slug)}
          />

          {/* Map legend */}
          <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-1 rounded-lg border border-border bg-card/95 backdrop-blur-sm px-3 py-2 shadow-sm text-xs">
            {[
              { label: "Hospital", color: "#1d4ed8" },
              { label: "Clinic", color: "#0e9f9a" },
              { label: "Diagnostic", color: "#7c3aed" },
              { label: "Pharmacy", color: "#059669" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Type filter + result count */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">
            {listFacilities.length < filteredFacilities.filter(f => f.subcity !== "online").length
              ? `Showing ${listFacilities.length} of ${filteredFacilities.filter(f => f.subcity !== "online").length} facilities`
              : `${filteredFacilities.filter(f => f.subcity !== "online").length} facilities`}
            {selectedArea !== "all" && (
              <span className="font-normal text-muted-foreground"> in {AREA_TABS.find(t => t.slug === selectedArea)?.label}</span>
            )}
          </p>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(t)}
                aria-pressed={selectedType === t}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedType === t
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-background text-foreground hover:border-secondary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Facility list */}
        {listFacilities.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {listFacilities.map((facility) => {
              const color =
                facility.category === "Hospital" ? "#1d4ed8"
                : facility.category === "Diagnostic Center" ? "#7c3aed"
                : facility.category === "Pharmacy" ? "#059669"
                : "#0e9f9a";

              return (
                <article
                  key={facility.id}
                  className={`flex flex-col rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden ${
                    highlightedFacility === facility.slug ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="h-1 w-full" style={{ background: color }} />
                  <div className="flex flex-col gap-2 p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                        {facility.facilityType ?? facility.category}
                      </p>
                      <h3 className="mt-1 text-sm font-bold leading-tight text-foreground line-clamp-2">
                        {facility.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{facility.address}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{facility.workingHours}</span>
                      <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
                        Pending
                      </span>
                    </div>
                    <div className="mt-1 flex gap-2">
                      {facility.phone && (
                        <a
                          href={`tel:${facility.phone.split(" / ")[0]}`}
                          className="flex-1 rounded-md border border-border bg-background py-1.5 text-center text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                        >
                          Call
                        </a>
                      )}
                      {facility.googleMapsUrl && (
                        <a
                          href={facility.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-md border border-border bg-background py-1.5 text-center text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                        >
                          Directions
                        </a>
                      )}
                      <Link
                        href={`/facilities/${facility.slug}`}
                        className="flex-1 rounded-md py-1.5 text-center text-xs font-semibold text-primary-foreground transition-colors"
                        style={{ background: color }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <p className="text-base font-semibold text-foreground">No facilities found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different area or type filter.</p>
            <button
              type="button"
              onClick={() => { setSelectedArea("all"); setSelectedType("All types"); }}
              className="mt-4 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary"
            >
              Clear filters
            </button>
          </div>
        )}

        <NearbyTrustPrivacyNote />
      </div>
    </PageContainer>
  );
}

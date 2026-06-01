"use client";

import { useState } from "react";

type Area = {
  slug: string;
  name: string;
  hint: string;
};

const AREAS: Area[] = [
  { slug: "all", name: "All areas", hint: "Browse all of Addis Ababa" },
  { slug: "bole", name: "Bole", hint: "Bole Road, Medhanialem, CMC" },
  { slug: "megenagna", name: "Megenagna", hint: "Yeka sub-city roundabout" },
  { slug: "kazanchis", name: "Kazanchis", hint: "Kirkos sub-city centre" },
  { slug: "piassa", name: "Piassa", hint: "Addis Ketema, central area" },
  { slug: "sarbet", name: "Sarbet", hint: "Nifas Silk-Lafto sub-city" },
  { slug: "gerji", name: "Gerji", hint: "Bole sub-city, east Addis" },
];

type AreaBrowseSelectorProps = {
  onAreaChange?: (slug: string) => void;
};

export function AreaBrowseSelector({ onAreaChange }: AreaBrowseSelectorProps) {
  const [selected, setSelected] = useState("all");

  function handleSelect(slug: string) {
    setSelected(slug);
    onAreaChange?.(slug);
  }

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Browse by area
      </p>
      <h2 className="mt-2 text-xl font-semibold leading-tight text-foreground">
        Choose a neighbourhood
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        No location permission needed — just tap an area to see nearby options.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {AREAS.map((area) => (
          <button
            key={area.slug}
            type="button"
            onClick={() => handleSelect(area.slug)}
            aria-pressed={selected === area.slug}
            className={`flex flex-col rounded-lg border px-4 py-3 text-left transition-colors ${
              selected === area.slug
                ? "border-primary bg-primary/5 text-primary"
                : "border-border bg-background text-foreground hover:border-primary/40"
            }`}
          >
            <span className="text-sm font-semibold">{area.name}</span>
            <span className="mt-0.5 text-xs text-muted-foreground">
              {area.hint}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

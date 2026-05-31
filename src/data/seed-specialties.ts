import type { SeedSpecialty } from "./seed-types";

export const seedSpecialties: SeedSpecialty[] = [
  {
    id: "specialty-pediatrics",
    slug: "pediatrics",
    name: "Pediatrics",
    description: "Child and adolescent health discovery category.",
    aliases: ["children", "child doctor"],
    isFeatured: true,
    reviewStatus: "sample-only",
  },
  {
    id: "specialty-cardiology",
    slug: "cardiology",
    name: "Cardiology",
    description: "Heart and cardiovascular care discovery category.",
    aliases: ["heart", "cardiac"],
    isFeatured: true,
    reviewStatus: "sample-only",
  },
  {
    id: "specialty-dermatology",
    slug: "dermatology",
    name: "Dermatology",
    description: "Skin health discovery category.",
    aliases: ["skin", "skin care"],
    isFeatured: true,
    reviewStatus: "sample-only",
  },
  {
    id: "specialty-internal-medicine",
    slug: "internal-medicine",
    name: "Internal medicine",
    description: "Adult general medical care discovery category.",
    aliases: ["adult medicine", "general medicine"],
    isFeatured: true,
    reviewStatus: "sample-only",
  },
  {
    id: "specialty-obstetrics-gynecology",
    slug: "obstetrics-gynecology",
    name: "Obstetrics and gynecology",
    description: "Women health, pregnancy, and reproductive care category.",
    aliases: ["obgyn", "women health"],
    isFeatured: true,
    reviewStatus: "sample-only",
  },
];

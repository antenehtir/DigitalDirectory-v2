import type { VerificationStatus } from "./verification";

export type FacilityVerificationStatus = VerificationStatus;

export type Facility = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  facilityType?: string;
  specialtyCategory?: string;
  services: string[];
  specialServices?: string[];
  location: string;
  subcity?: string;
  area?: string;
  address: string;
  workingHours: string;
  phone?: string;
  email?: string;
  website?: string;
  telegram?: string;
  whatsapp?: string;
  googleMapsUrl?: string;
  lat?: number;
  lng?: number;
  verificationStatus: FacilityVerificationStatus;
  isOpen: boolean;
  availabilityNote: string;
  contactActionLabel: string;
  directionsActionLabel: string;
};

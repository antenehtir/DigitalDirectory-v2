import type { VerificationStatus } from "./verification";

export type FacilityVerificationStatus = VerificationStatus;

export type Facility = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  services: string[];
  location: string;
  address: string;
  workingHours: string;
  verificationStatus: FacilityVerificationStatus;
  isOpen: boolean;
  availabilityNote: string;
  contactActionLabel: string;
  directionsActionLabel: string;
};

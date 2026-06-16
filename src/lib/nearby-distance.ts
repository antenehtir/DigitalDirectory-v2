export type Coordinates = {
  latitude: number;
  longitude: number;
};

export function calculateDistanceKm(
  origin: Coordinates,
  destination: Coordinates,
): number {
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(destination.latitude - origin.latitude);
  const longitudeDelta = toRadians(destination.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;
  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return earthRadiusKm * centralAngle;
}

export function resolveFacilityCoordinates(
  facility: { latitude?: number; longitude?: number },
  fallbackText: string | undefined,
): Coordinates | undefined {
  const { latitude, longitude } = facility;

  if (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    isValidLatitude(latitude) &&
    isValidLongitude(longitude)
  ) {
    return { latitude, longitude };
  }

  return extractCoordinatesFromText(fallbackText);
}

export function extractCoordinatesFromText(
  value: string | undefined,
): Coordinates | undefined {
  if (!value) {
    return undefined;
  }

  const atMatch = value.match(
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
  );
  const googleDataMatch = value.match(
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
  );
  const plainMatch = value.match(
    /\b(-?\d{1,2}\.\d{4,}),\s*(-?\d{1,3}\.\d{4,})\b/,
  );
  const match = atMatch ?? googleDataMatch ?? plainMatch;

  if (!match) {
    return undefined;
  }

  const latitude = Number(match[1]);
  const longitude = Number(match[2]);

  if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
    return undefined;
  }

  return { latitude, longitude };
}

export function formatDistanceKm(distanceKm: number): string {
  return `${distanceKm.toFixed(distanceKm < 10 ? 1 : 0)} km away`;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function isValidLatitude(value: number): boolean {
  return Number.isFinite(value) && value >= -90 && value <= 90;
}

function isValidLongitude(value: number): boolean {
  return Number.isFinite(value) && value >= -180 && value <= 180;
}

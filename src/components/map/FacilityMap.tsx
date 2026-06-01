"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Facility } from "@/types/facility";

type Props = {
  facilities: Facility[];
  selectedArea?: string;
  onFacilityClick?: (facility: Facility) => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  Hospital: "#1d4ed8",
  Clinic: "#0e9f9a",
  "Diagnostic Center": "#7c3aed",
  Pharmacy: "#059669",
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#d97706";
}

function createMarkerHtml(color: string, letter: string): string {
  return `<div style="
    width:32px;height:32px;border-radius:50% 50% 50% 4px;
    background:${color};border:2.5px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.28);
    display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;color:white;
    transform:rotate(-45deg);
  "><span style="transform:rotate(45deg)">${letter}</span></div>`;
}

const ADDIS_CENTER: [number, number] = [9.025, 38.775];

export function FacilityMap({ facilities, selectedArea, onFacilityClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let isMounted = true;
    import("leaflet").then((LMod) => {
      if (!isMounted || !containerRef.current || mapRef.current) return;
      const L = LMod.default;

      // Fix default icon paths broken by Webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: ADDIS_CENTER,
        zoom: 12,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = { map, L };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render markers when facilities or map change
  useEffect(() => {
    if (!mapRef.current) {
      const timer = setTimeout(() => {
        renderMarkers();
      }, 600);
      return () => clearTimeout(timer);
    }
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilities, selectedArea]);

  const renderMarkers = useCallback(() => {
    if (!mapRef.current) return;
    const { map, L } = mapRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered = selectedArea && selectedArea !== "all"
      ? facilities.filter((f) =>
          f.subcity?.toLowerCase().includes(selectedArea.toLowerCase()) ||
          f.area?.toLowerCase().includes(selectedArea.toLowerCase())
        )
      : facilities;

    const withCoords = filtered.filter((f) => f.lat && f.lng && f.subcity !== "online");

    withCoords.forEach((f) => {
      const color = getCategoryColor(f.category);
      const letter = f.facilityType === "General Hospital" ? "H"
        : f.facilityType === "Diagnostic Center" ? "D"
        : f.facilityType === "Pharmacy" ? "Rx"
        : f.facilityType === "Medical Plaza" ? "MP"
        : "C";

      const icon = L.divIcon({
        html: createMarkerHtml(color, letter),
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -34],
      });

      const marker = L.marker([f.lat!, f.lng!], { icon })
        .bindPopup(`
          <div style="min-width:200px;font-family:system-ui,sans-serif">
            <div style="font-size:11px;font-weight:600;color:${color};text-transform:uppercase;letter-spacing:0.05em">${f.facilityType ?? f.category}</div>
            <div style="font-size:14px;font-weight:700;margin:4px 0 2px;color:#0f172a">${f.name}</div>
            <div style="font-size:12px;color:#64748b;margin-bottom:6px">${f.address}</div>
            ${f.phone ? `<div style="font-size:12px;color:#0f172a"><strong>Tel:</strong> ${f.phone.split(" / ")[0]}</div>` : ""}
            <div style="font-size:12px;color:#0f172a;margin-top:2px"><strong>Hours:</strong> ${f.workingHours}</div>
            <div style="margin-top:8px;padding:4px 8px;background:${color};color:white;border-radius:4px;font-size:12px;font-weight:600;text-align:center;cursor:pointer" onclick="window.location.href='/facilities/${f.slug}'">View details</div>
          </div>
        `, { maxWidth: 280 })
        .addTo(map);

      if (onFacilityClick) {
        marker.on("click", () => onFacilityClick(f));
      }

      markersRef.current.push(marker);
    });

    if (withCoords.length > 0 && selectedArea && selectedArea !== "all") {
      const bounds = L.latLngBounds(withCoords.map((f) => [f.lat!, f.lng!] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [facilities, selectedArea, onFacilityClick]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        if (!mapRef.current) return;
        const { map, L } = mapRef.current;
        const { latitude: lat, longitude: lng } = pos.coords;

        if (userMarkerRef.current) userMarkerRef.current.remove();

        const userIcon = L.divIcon({
          html: `<div style="width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid white;box-shadow:0 0 0 4px rgba(37,99,235,0.25)"></div>`,
          className: "",
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        userMarkerRef.current = L.marker([lat, lng], { icon: userIcon })
          .bindPopup("Your location")
          .addTo(map);

        map.setView([lat, lng], 14);
      },
      (err) => {
        setLocating(false);
        setLocError(err.code === 1 ? "Location permission denied." : "Could not determine location.");
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-lg" />

      {/* Locate button */}
      <div className="absolute bottom-16 right-3 z-[1000] flex flex-col items-end gap-2">
        <button
          onClick={handleLocate}
          disabled={locating}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg hover:bg-muted transition-colors disabled:opacity-60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          </svg>
          {locating ? "Locating…" : "Near me"}
        </button>
        {locError && (
          <div className="rounded-lg bg-card border border-border px-3 py-2 text-xs text-error shadow-lg max-w-[200px] text-right">
            {locError}
          </div>
        )}
      </div>
    </div>
  );
}

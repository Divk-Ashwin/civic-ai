"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import { Incident } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

interface ClusterMapProps {
  incidents: Incident[];
}

// Fix for default marker icons in Next.js
const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Green icon for resolved incidents
const resolvedIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red pulsing icon for hotspots (confirmations > 10)
const createHotspotIcon = (count: number) => {
  return new DivIcon({
    className: "custom-div-icon",
    html: `
      <div class="hotspot-marker">
        <div class="pulse-ring"></div>
        <div class="marker-pin"></div>
        <div class="marker-count">${count}</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// Yellow/Orange icon for regular open incidents
const criticalIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ClusterMap({ incidents }: ClusterMapProps) {
  const hyderabadCenter: [number, number] = [17.3850, 78.4867];

  const getMarkerIcon = (incident: Incident) => {
    if (incident.status === "RESOLVED") {
      return resolvedIcon;
    }
    if (incident.confirmations > 10) {
      return createHotspotIcon(incident.confirmations);
    }
    if (incident.severity === "CRITICAL") {
      return criticalIcon;
    }
    return defaultIcon;
  };

  const getSeverityBadge = (severity: Incident["severity"]) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-critical/10 text-critical border-critical/20";
      case "HIGH":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "LOW":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <>
      <style jsx global>{`
        .hotspot-marker {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 3px solid #dc2626;
          border-radius: 50%;
          animation: pulse 2s ease-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        .marker-pin {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background-color: #dc2626;
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform-origin: bottom center;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.4);
        }

        .marker-count {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          color: #dc2626;
          font-weight: bold;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .leaflet-container {
          height: 600px;
          border-radius: 12px;
          z-index: 0;
        }

        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      <MapContainer
        center={hyderabadCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-[600px] rounded-xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map((incident) => {
          if (!incident.coordinates) return null;

          return (
            <Marker
              key={incident.id}
              position={[incident.coordinates.lat, incident.coordinates.lng]}
              icon={getMarkerIcon(incident)}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-secondary-900 mb-2">
                    {incident.location}
                  </h3>
                  <p className="text-sm text-secondary-700 mb-2">
                    {incident.category}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border",
                        getSeverityBadge(incident.severity)
                      )}
                    >
                      {incident.severity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-secondary-200">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-secondary-900">
                      {incident.confirmations} Witness{incident.confirmations !== 1 ? "es" : ""}
                    </span>
                  </div>

                  {incident.status === "RESOLVED" && (
                    <div className="mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium text-center">
                      ✓ Resolved
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}

export default ClusterMap;

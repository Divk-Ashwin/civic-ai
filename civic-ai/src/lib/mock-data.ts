export interface Incident {
  id: string;
  location: string;
  category: string;
  description: string;
  confirmations: number; // Cluster count - how many citizens reported this
  severity: "CRITICAL" | "HIGH" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  reportedDate: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  beforeImage?: string;
  afterImage?: string;
}

export const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    location: "Charminar, Old City",
    category: "Sewage Issue",
    description: "Major sewage overflow causing health hazard in residential area",
    confirmations: 42,
    severity: "CRITICAL",
    status: "OPEN",
    reportedDate: "2025-11-16",
    coordinates: { lat: 17.3616, lng: 78.4747 },
    beforeImage: "https://placehold.co/400x300/dc2626/ffffff?text=Sewage+Overflow",
  },
  {
    id: "INC-002",
    location: "Hitech City, Road No. 36",
    category: "Pothole",
    description: "Deep pothole causing vehicle damage",
    confirmations: 1,
    severity: "HIGH",
    status: "RESOLVED",
    reportedDate: "2025-11-10",
    coordinates: { lat: 17.4485, lng: 78.3908 },
    beforeImage: "https://placehold.co/400x300/f59e0b/ffffff?text=Pothole+Before",
    afterImage: "https://placehold.co/400x300/10b981/ffffff?text=Fixed+Road",
  },
  {
    id: "INC-003",
    location: "Banjara Hills, Road No. 12",
    category: "Fallen Tree / Branch",
    description: "Large tree branch blocking road after storm",
    confirmations: 15,
    severity: "HIGH",
    status: "IN_PROGRESS",
    reportedDate: "2025-11-17",
    coordinates: { lat: 17.4239, lng: 78.4738 },
    beforeImage: "https://placehold.co/400x300/f59e0b/ffffff?text=Fallen+Branch",
  },
  {
    id: "INC-004",
    location: "Secunderabad Railway Station",
    category: "Garbage / Waste",
    description: "Excessive garbage accumulation at station entrance",
    confirmations: 28,
    severity: "HIGH",
    status: "OPEN",
    reportedDate: "2025-11-15",
    coordinates: { lat: 17.4344, lng: 78.5012 },
    beforeImage: "https://placehold.co/400x300/f59e0b/ffffff?text=Garbage+Pile",
  },
  {
    id: "INC-005",
    location: "Gachibowli, DLF Cyber City",
    category: "Broken Street Light",
    description: "Multiple street lights not working, safety concern",
    confirmations: 8,
    severity: "LOW",
    status: "OPEN",
    reportedDate: "2025-11-14",
    coordinates: { lat: 17.4401, lng: 78.3489 },
    beforeImage: "https://placehold.co/400x300/eab308/ffffff?text=Dark+Street",
  },
  {
    id: "INC-006",
    location: "Jubilee Hills, Near Checkpost",
    category: "Water Leak",
    description: "Major water line leak causing road flooding",
    confirmations: 35,
    severity: "CRITICAL",
    status: "OPEN",
    reportedDate: "2025-11-18",
    coordinates: { lat: 17.4326, lng: 78.4071 },
    beforeImage: "https://placehold.co/400x300/dc2626/ffffff?text=Water+Leak",
  },
  {
    id: "INC-007",
    location: "Kukatpally, KPHB Colony",
    category: "Electrical Hazard",
    description: "Exposed electrical wires hanging low near market",
    confirmations: 3,
    severity: "CRITICAL",
    status: "OPEN",
    reportedDate: "2025-11-17",
    coordinates: { lat: 17.4849, lng: 78.3912 },
    beforeImage: "https://placehold.co/400x300/dc2626/ffffff?text=Exposed+Wires",
  },
  {
    id: "INC-008",
    location: "Ameerpet Metro Station",
    category: "Pothole",
    description: "Small pothole near metro entrance",
    confirmations: 2,
    severity: "LOW",
    status: "RESOLVED",
    reportedDate: "2025-11-12",
    coordinates: { lat: 17.4374, lng: 78.4482 },
    beforeImage: "https://placehold.co/400x300/eab308/ffffff?text=Small+Pothole",
    afterImage: "https://placehold.co/400x300/10b981/ffffff?text=Repaired",
  },
];

// Helper function to calculate stats
export const getIncidentStats = () => {
  const totalActive = mockIncidents.filter((i) => i.status === "OPEN").length;
  const resolvedToday = mockIncidents.filter(
    (i) => i.status === "RESOLVED" && i.reportedDate === "2025-11-18"
  ).length;
  const totalCitizensHelped = mockIncidents
    .filter((i) => i.status === "RESOLVED")
    .reduce((sum, incident) => sum + incident.confirmations * 50, 0); // Each witness represents ~50 people affected

  return {
    totalActive,
    resolvedToday,
    totalCitizensHelped,
  };
};

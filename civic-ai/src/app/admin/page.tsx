"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Filter } from "lucide-react";
import AdminHeader from "@/components/features/admin/AdminHeader";
import StatsGrid from "@/components/features/admin/StatsGrid";
import IncidentTable from "@/components/features/admin/IncidentTable";
import ResolveModal from "@/components/features/admin/ResolveModal";
import { mockIncidents, Incident } from "@/lib/mock-data";

// Dynamic import for ClusterMap to avoid SSR issues
const ClusterMap = dynamic(
  () => import("@/components/features/admin/ClusterMap"),
  { ssr: false }
);

export default function AdminPage() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "map">("table");

  const handleResolveClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsModalOpen(true);
  };

  const handleResolve = (incidentId: string, afterImage: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? { ...inc, status: "RESOLVED" as const, afterImage }
          : inc
      )
    );
  };

  const filteredIncidents = incidents.filter((incident) => {
    const statusMatch =
      filterStatus === "all" || incident.status === filterStatus;
    const severityMatch =
      filterSeverity === "all" || incident.severity === filterSeverity;
    return statusMatch && severityMatch;
  });

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Admin Header */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <StatsGrid />

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md border border-secondary-100 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-secondary-700">
              <Filter size={20} />
              <span className="font-semibold">Filters:</span>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              <option value="all">All Severity</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="LOW">Low</option>
            </select>

            {/* View Toggle */}
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  viewMode === "table"
                    ? "bg-primary text-white"
                    : "border border-secondary-300 text-secondary-700 hover:bg-secondary-50"
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  viewMode === "map"
                    ? "bg-primary text-white"
                    : "border border-secondary-300 text-secondary-700 hover:bg-secondary-50"
                }`}
              >
                Map View
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-secondary-200">
            <p className="text-sm text-secondary-600">
              Showing <span className="font-semibold text-secondary-900">{filteredIncidents.length}</span> of{" "}
              <span className="font-semibold text-secondary-900">{incidents.length}</span> incidents
            </p>
          </div>
        </div>

        {/* Conditional View Rendering */}
        {viewMode === "table" ? (
          <IncidentTable
            incidents={filteredIncidents}
            onResolveClick={handleResolveClick}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-secondary-100 p-6">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">
              Incident Cluster Map
            </h3>
            <ClusterMap incidents={filteredIncidents} />
          </div>
        )}
      </div>

      {/* Resolve Modal */}
      <ResolveModal
        incident={selectedIncident}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResolve={handleResolve}
      />
    </div>
  );
}

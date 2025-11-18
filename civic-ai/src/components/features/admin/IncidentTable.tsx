"use client";

import { useState } from "react";
import { Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Incident } from "@/lib/mock-data";

interface IncidentTableProps {
  incidents: Incident[];
  onResolveClick: (incident: Incident) => void;
}

export default function IncidentTable({
  incidents,
  onResolveClick,
}: IncidentTableProps) {
  const getSeverityBadge = (severity: Incident["severity"]) => {
    switch (severity) {
      case "CRITICAL":
        return {
          className: "bg-critical/10 text-critical border-critical/20",
          label: "Critical",
        };
      case "HIGH":
        return {
          className: "bg-orange-100 text-orange-700 border-orange-200",
          label: "High",
        };
      case "LOW":
        return {
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
          label: "Low",
        };
    }
  };

  const getStatusBadge = (status: Incident["status"]) => {
    switch (status) {
      case "OPEN":
        return {
          icon: AlertTriangle,
          className: "bg-critical/10 text-critical",
          label: "Open",
        };
      case "IN_PROGRESS":
        return {
          icon: Clock,
          className: "bg-blue-100 text-blue-700",
          label: "In Progress",
        };
      case "RESOLVED":
        return {
          icon: CheckCircle,
          className: "bg-green-100 text-green-700",
          label: "Resolved",
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-secondary-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-secondary-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                Witnesses
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {incidents.map((incident) => {
              const severity = getSeverityBadge(incident.severity);
              const status = getStatusBadge(incident.status);
              const StatusIcon = status.icon;
              const isCluster = incident.confirmations > 1;

              return (
                <tr
                  key={incident.id}
                  className="hover:bg-secondary-50 transition-colors"
                >
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-secondary-900">
                      {incident.id}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-900 font-medium">
                      {incident.location}
                    </div>
                    <div className="text-xs text-secondary-500 mt-1">
                      Reported: {new Date(incident.reportedDate).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-secondary-700">
                      {incident.category}
                    </span>
                  </td>

                  {/* Witnesses (Cluster Count) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isCluster ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                          <Users size={16} />
                          {incident.confirmations}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-secondary-600">
                        {incident.confirmations}
                      </span>
                    )}
                  </td>

                  {/* Severity */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
                        severity.className
                      )}
                    >
                      {severity.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
                        status.className
                      )}
                    >
                      <StatusIcon size={14} />
                      {status.label}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.status !== "RESOLVED" ? (
                      <button
                        onClick={() => onResolveClick(incident)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle size={16} />
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {incidents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-500">No incidents to display</p>
        </div>
      )}
    </div>
  );
}

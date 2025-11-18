"use client";

import { Clock, MapPin, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  category: string;
  location: string;
  date: string;
  status: "pending" | "verified" | "resolved";
}

const mockReports: Report[] = [
  {
    id: "1",
    category: "Pothole",
    location: "Main St & 5th Ave",
    date: "2 days ago",
    status: "resolved",
  },
  {
    id: "2",
    category: "Garbage / Waste",
    location: "Park Lane",
    date: "5 days ago",
    status: "verified",
  },
  {
    id: "3",
    category: "Water Leak",
    location: "Downtown Plaza",
    date: "1 week ago",
    status: "pending",
  },
];

export default function RecentReports() {
  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "resolved":
        return {
          icon: CheckCircle2,
          text: "Resolved",
          className: "bg-green-100 text-green-700 border-green-200",
        };
      case "verified":
        return {
          icon: CheckCircle2,
          text: "Verified",
          className: "bg-blue-100 text-primary border-blue-200",
        };
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
      <h3 className="text-xl font-bold text-secondary-900 mb-4">
        Recent Reports
      </h3>

      <div className="space-y-3">
        {mockReports.map((report) => {
          const status = getStatusBadge(report.status);
          const StatusIcon = status.icon;

          return (
            <div
              key={report.id}
              className="p-4 border border-secondary-200 rounded-lg hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-secondary-900 mb-1">
                    {report.category}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-secondary-600 mb-2">
                    <MapPin size={12} />
                    <span className="truncate">{report.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
                        status.className
                      )}
                    >
                      <StatusIcon size={12} />
                      {status.text}
                    </span>
                    <span className="text-xs text-secondary-500">
                      {report.date}
                    </span>
                  </div>
                </div>

                {report.status === "resolved" && (
                  <button
                    className="shrink-0 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="View proof"
                  >
                    <Eye size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Link */}
      <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        View All Reports →
      </button>
    </div>
  );
}

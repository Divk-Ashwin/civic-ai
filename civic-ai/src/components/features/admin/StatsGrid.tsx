"use client";

import { AlertTriangle, CheckCircle, Users } from "lucide-react";
import { getIncidentStats } from "@/lib/mock-data";

export default function StatsGrid() {
  const stats = getIncidentStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Active Issues */}
      <div className="bg-white rounded-xl shadow-md border border-secondary-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600 mb-1">
              Total Active Issues
            </p>
            <p className="text-4xl font-bold text-critical">
              {stats.totalActive}
            </p>
            <p className="text-xs text-secondary-500 mt-2">
              Requires immediate attention
            </p>
          </div>
          <div className="w-14 h-14 bg-critical/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="text-critical" size={28} />
          </div>
        </div>
      </div>

      {/* Resolved Today */}
      <div className="bg-white rounded-xl shadow-md border border-secondary-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600 mb-1">
              Resolved Today
            </p>
            <p className="text-4xl font-bold text-green-600">
              {stats.resolvedToday}
            </p>
            <p className="text-xs text-secondary-500 mt-2">
              Issues closed successfully
            </p>
          </div>
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600" size={28} />
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-white rounded-xl shadow-md border border-secondary-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600 mb-1">
              Community Impact
            </p>
            <p className="text-4xl font-bold text-primary">
              {stats.totalCitizensHelped}
            </p>
            <p className="text-xs text-secondary-500 mt-2">
              Citizens helped overall
            </p>
          </div>
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="text-primary" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

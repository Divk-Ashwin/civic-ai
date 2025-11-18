"use client";

import { Bell, Settings } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="bg-white border-b border-secondary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">My Dashboard</h1>
          <p className="text-sm text-secondary-600 mt-1">
            Track your impact and report new hazards
          </p>
        </div>

        {/* Right Side - User Info */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-secondary-900">
                Arjun K.
              </div>
              <div className="text-xs text-secondary-600">Citizen</div>
            </div>
            <div className="w-10 h-10 bg-linear-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold">
              AK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

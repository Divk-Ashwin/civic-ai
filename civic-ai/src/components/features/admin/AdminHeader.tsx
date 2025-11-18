"use client";

import { Bell, Settings, Shield } from "lucide-react";

export default function AdminHeader() {
  return (
    <div className="bg-white border-b border-secondary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-critical/10 rounded-lg flex items-center justify-center">
            <Shield className="text-critical" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">
              City Command Center
            </h1>
            <p className="text-sm text-secondary-600 mt-1">
              Municipal Operations Dashboard
            </p>
          </div>
        </div>

        {/* Right Side - Admin Info */}
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

          {/* Admin Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-secondary-900">
                Municipal Admin
              </div>
              <div className="text-xs text-secondary-600">Administrator</div>
            </div>
            <div className="w-10 h-10 bg-linear-to-r from-critical to-critical/80 rounded-full flex items-center justify-center text-white font-bold">
              MA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

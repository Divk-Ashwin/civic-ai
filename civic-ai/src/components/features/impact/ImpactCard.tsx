"use client";

import { FileText, TrendingUp, CheckCircle2, Users } from "lucide-react";

export default function ImpactCard() {
  const stats = {
    reported: 12,
    verified: 10,
    peopleHelped: 500,
  };

  const progress = 80; // Progress to next badge

  const handleDownloadCertificate = () => {
    // Mock download functionality
    alert("Certificate download will be implemented soon!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-linear-to-r from-primary to-primary/80 p-6 text-white">
        <div className="flex flex-col items-center text-center">
          {/* Badge Icon */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-2 border-white/30">
            <span className="text-4xl">🛡️</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">Community Guardian</h3>
          <p className="text-primary-100 text-sm">Level 2 Citizen</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Hazards Reported */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="text-primary" size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900">
              {stats.reported}
            </div>
            <div className="text-xs text-secondary-600 mt-1">
              Hazards<br />Reported
            </div>
          </div>

          {/* Verified */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-impact-gold/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-impact-gold" size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900">
              {stats.verified}
            </div>
            <div className="text-xs text-secondary-600 mt-1">
              Verified<br />Reports
            </div>
          </div>

          {/* People Helped */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-impact-silver/20 rounded-full flex items-center justify-center">
                <Users className="text-impact-silver" size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-secondary-900">
              {stats.peopleHelped}+
            </div>
            <div className="text-xs text-secondary-600 mt-1">
              People<br />Helped
            </div>
          </div>
        </div>

        {/* Progress to Next Badge */}
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-secondary-900">
              Next Badge: City Sentinel
            </span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-primary to-impact-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-secondary-600 mt-2">
            10 more verified reports to unlock City Sentinel status
          </p>
        </div>

        {/* Download Certificate Button */}
        <button
          onClick={handleDownloadCertificate}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
        >
          <FileText size={18} />
          Download Impact Certificate
        </button>
      </div>
    </div>
  );
}

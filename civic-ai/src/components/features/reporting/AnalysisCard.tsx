"use client";

import { AlertTriangle, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
  image?: string | null;
  description?: string;
}

export default function AnalysisCard({ image, description }: AnalysisCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-secondary-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-6">
        {/* Left: Image Thumbnail */}
        <div className="shrink-0">
          {image ? (
            <img
              src={image}
              alt="Analyzed hazard"
              className="w-32 h-32 object-cover rounded-lg border border-secondary-200"
            />
          ) : (
            <div className="w-32 h-32 bg-secondary-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-secondary-400" size={40} />
            </div>
          )}
        </div>

        {/* Right: Analysis Details */}
        <div className="flex-1 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-2">
              Identified: E-Waste (Lithium Battery)
            </h3>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-critical/10 text-critical border border-critical/20">
                <AlertTriangle size={14} className="mr-1.5" />
                Hazard: High
              </span>
            </div>
          </div>

          {/* Impact Assessment */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <AlertTriangle size={18} className="text-critical mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-secondary-900">Environmental Impact</p>
                <p className="text-sm text-secondary-600">
                  Improper disposal risks groundwater contamination and soil toxicity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-secondary-900">Recommended Action</p>
                <p className="text-sm text-secondary-600">
                  Please locate the nearest e-waste collection center or municipal hazardous waste facility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <CheckCircle2 size={18} className="text-impact-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-secondary-900">Your Impact</p>
                <p className="text-sm text-secondary-600">
                  Reporting this prevents potential harm to ~500 residents in your area.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm">
            Submit Report to Municipal Office
          </button>
        </div>
      </div>
    </div>
  );
}

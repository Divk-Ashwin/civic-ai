"use client";

import { useState, useRef } from "react";
import { X, Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Incident } from "@/lib/mock-data";

interface ResolveModalProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (incidentId: string, afterImage: string) => void;
}

export default function ResolveModal({
  incident,
  isOpen,
  onClose,
  onResolve,
}: ResolveModalProps) {
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !incident) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAfterImage(reader.result as string);
        toast.success("Proof image uploaded");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResolve = async () => {
    if (!afterImage) {
      toast.error("Please upload proof of fix (After Image)");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onResolve(incident.id, afterImage);
    toast.success(`Notified ${incident.confirmations} citizens!`);
    
    // Reset and close
    setAfterImage(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">
                Resolve Incident
              </h2>
              <p className="text-sm text-secondary-600 mt-1">
                {incident.id} - {incident.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side - Before Image */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  Before (Reported Issue)
                </h3>
                <div className="relative aspect-video bg-secondary-100 rounded-lg overflow-hidden border-2 border-secondary-200">
                  {incident.beforeImage ? (
                    <img
                      src={incident.beforeImage}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-secondary-400">
                      No image available
                    </div>
                  )}
                </div>
                <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
                  <p className="text-sm text-secondary-700">
                    <strong>Category:</strong> {incident.category}
                  </p>
                  <p className="text-sm text-secondary-700 mt-1">
                    <strong>Description:</strong> {incident.description}
                  </p>
                  <p className="text-sm text-secondary-700 mt-1">
                    <strong>Reported by:</strong> {incident.confirmations}{" "}
                    {incident.confirmations === 1 ? "citizen" : "citizens"}
                  </p>
                </div>
              </div>

              {/* Right Side - After Image Upload */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  After (Proof of Fix) <span className="text-critical">*</span>
                </h3>
                
                {!afterImage ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video w-full border-2 border-dashed border-primary/50 rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-primary"
                  >
                    <Upload size={48} />
                    <div className="text-center">
                      <p className="font-semibold">Upload Proof of Fix</p>
                      <p className="text-sm text-secondary-600 mt-1">
                        Click to select an image
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="relative aspect-video bg-secondary-100 rounded-lg overflow-hidden border-2 border-green-500">
                    <img
                      src={afterImage}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setAfterImage(null)}
                      className="absolute top-2 right-2 bg-critical text-white rounded-full p-2 hover:bg-critical/90 shadow-lg"
                    >
                      <X size={18} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <CheckCircle size={16} />
                      Ready to submit
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>📢 Feedback Loop:</strong> Once you upload proof and mark
                    this resolved, all {incident.confirmations}{" "}
                    {incident.confirmations === 1 ? "citizen" : "citizens"} who
                    reported this will be notified with the "After" image.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-secondary-200 bg-secondary-50">
            <button
              onClick={onClose}
              className="min-w-[100px] min-h-[44px] flex items-center justify-center px-6 py-2.5 border-2 border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors font-medium"
            >
              <span className="whitespace-nowrap">Cancel</span>
            </button>
            <button
              onClick={handleResolve}
              disabled={isSubmitting || !afterImage}
              className="min-w-[200px] min-h-[44px] flex items-center justify-center px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Resolving..."
                : `Mark Resolved & Notify ${incident.confirmations} ${
                    incident.confirmations === 1 ? "Citizen" : "Citizens"
                  }`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

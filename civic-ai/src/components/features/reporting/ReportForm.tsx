"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Paperclip, Mic, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Pothole",
  "Garbage / Waste",
  "Electrical Hazard",
  "Water Leak",
  "Broken Street Light",
  "Sewage Issue",
  "Fallen Tree / Branch",
  "Other",
];

export default function ReportForm() {
  const [location, setLocation] = useState("Detecting location...");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock address based on coordinates
          const mockAddress = `${position.coords.latitude.toFixed(4)}°N, ${position.coords.longitude.toFixed(4)}°E - Downtown Area`;
          setLocation(mockAddress);
          setIsDetectingLocation(false);
          toast.success("Location detected!");
        },
        () => {
          // Fallback to mock location
          setLocation("123 Main Street, City Center, 400001");
          setIsDetectingLocation(false);
          toast.info("Using default location");
        }
      );
    } else {
      setLocation("123 Main Street, City Center, 400001");
      setIsDetectingLocation(false);
      toast.info("Geolocation not supported. Using default location.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.success("Recording started");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.success(`Voice note recorded (${recordingTime}s)`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Report submitted successfully!");
    
    // Reset form
    setCategory("");
    setDescription("");
    setUploadedImage(null);
    setLocation("Detecting location...");
    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">
        Report a Hazard
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Location Field */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Location
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-secondary-900"
                disabled={isDetectingLocation}
              />
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="shrink-0 px-4 py-2.5 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {isDetectingLocation ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "📍 Use Current"
              )}
            </button>
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Category <span className="text-critical">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-3 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-secondary-900 bg-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Description <span className="text-critical">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-3 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-secondary-900 resize-none"
            rows={4}
            placeholder="Describe the hazard in detail..."
            required
          />
        </div>

        {/* Media Section */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-secondary-700">
            Attachments
          </div>

          {/* Image Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-secondary-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-secondary-700 w-full justify-center"
            >
              <Paperclip size={18} />
              {uploadedImage ? "Change Image" : "Upload Image"}
            </button>
            {uploadedImage && (
              <div className="mt-3 relative inline-block">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="h-24 w-24 object-cover rounded-lg border border-secondary-200"
                />
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-2 -right-2 bg-critical text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-critical/90"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Voice Recording */}
          <div>
            {!isRecording ? (
              <button
                type="button"
                onClick={handleStartRecording}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-critical bg-critical/5 text-critical rounded-lg hover:bg-critical/10 transition-colors w-full justify-center font-medium"
              >
                <Mic size={18} />
                Record Voice Note
              </button>
            ) : (
              <div className="flex items-center gap-3 px-4 py-2.5 border-2 border-critical bg-critical/5 rounded-lg">
                {/* Pulsing Animation */}
                <div className="relative">
                  <div className="w-4 h-4 bg-critical rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-4 h-4 bg-critical rounded-full animate-ping" />
                </div>
                <span className="text-critical font-medium flex-1">
                  Recording... {formatTime(recordingTime)}
                </span>
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="shrink-0 p-2 bg-critical text-black rounded-lg hover:bg-critical/90 transition-colors"
                >
                  <Square size={16} fill="currentColor" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[56px] flex items-center justify-center py-3.5 px-4 bg-primary rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-lg"
        >
          <span className="whitespace-nowrap text-white font-semibold">{isSubmitting ? "Submitting Report..." : "Submit Report to City"}</span>
        </button>
      </form>
    </div>
  );
}

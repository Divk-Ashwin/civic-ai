"use client";

import { useState, useRef } from "react";
import { Paperclip, Mic, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AnalysisCard from "../reporting/AnalysisCard";

export default function AIInputBox() {
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!description.trim() && !uploadedImage) {
      toast.error("Please describe the issue or upload an image");
      return;
    }

    setIsAnalyzing(true);
    setShowResult(false);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsAnalyzing(false);
    setShowResult(true);
    toast.success("Analysis complete!");
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

  const handleVoiceRecord = () => {
    toast.info("Voice recording feature coming soon!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      {/* AI Input Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-secondary-100 overflow-hidden">
        {/* Textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the micro-disaster or waste item..."
          className="w-full px-6 py-6 text-lg text-secondary-900 placeholder:text-secondary-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-none min-h-40"
          disabled={isAnalyzing}
        />

        {/* Image Preview */}
        {uploadedImage && (
          <div className="px-6 pb-4">
            <div className="relative inline-block">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="h-20 w-20 object-cover rounded-lg border border-secondary-200"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute -top-2 -right-2 bg-critical text-black rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-critical/90"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-secondary-100 bg-secondary-50/50">
          <div className="flex items-center space-x-2">
            {/* Image Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
              title="Upload image"
              disabled={isAnalyzing}
            >
              <Paperclip size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Voice Record Button */}
            <button
              onClick={handleVoiceRecord}
              className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
              title="Record voice"
              disabled={isAnalyzing}
            >
              <Mic size={20} />
            </button>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="min-w-[140px] min-h-11 flex items-center justify-center space-x-2 px-6 py-2.5 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={18} className="animate-spin text-black" />
                <span className="whitespace-nowrap text-black font-medium">Analyzing...</span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap text-black font-medium">Analyze</span>
                <ArrowRight size={18} className="text-black" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Result */}
      {showResult && (
        <AnalysisCard
          image={uploadedImage}
          description={description}
        />
      )}
    </div>
  );
}

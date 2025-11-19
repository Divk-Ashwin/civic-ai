"use client";

import { useState } from "react";
import { User, Award, FileText, HelpCircle, LogOut, X, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

// Mock user data - will be replaced with Firebase
const mockUserData = {
  role: "citizen", // "citizen", "admin", or "ngo"
  name: "Arjun Kumar",
  email: "arjun.kumar@example.com",
  phone: "+91 98765 43210",
  location: "Hyderabad, Telangana",
  joinedDate: "March 15, 2024",
  rewardPoints: 1250,
  badge: "Community Guardian",
  level: 2,
};

const mockCitizenComplaints = [
  { id: "INC-1234", title: "Pothole on Main Street", status: "pending", date: "Nov 15, 2025", category: "Road" },
  { id: "INC-1235", title: "Garbage accumulation near park", status: "in-progress", date: "Nov 10, 2025", category: "Waste" },
  { id: "INC-1236", title: "Broken street light", status: "resolved", date: "Nov 5, 2025", category: "Electrical" },
  { id: "INC-1237", title: "Water leak on 5th Avenue", status: "pending", date: "Nov 12, 2025", category: "Water" },
];

const mockAdminResolvedComplaints = [
  { id: "INC-2001", title: "Sewage overflow at Charminar", resolvedDate: "Nov 18, 2025", citizensNotified: 42 },
  { id: "INC-2002", title: "Road repair at Jubilee Hills", resolvedDate: "Nov 17, 2025", citizensNotified: 35 },
  { id: "INC-2003", title: "Street light repair at Banjara Hills", resolvedDate: "Nov 15, 2025", citizensNotified: 18 },
  { id: "INC-2004", title: "Garbage clearing at Secunderabad", resolvedDate: "Nov 14, 2025", citizensNotified: 28 },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [userRole] = useState(user?.role || mockUserData.role);
  const [complaints, setComplaints] = useState(mockCitizenComplaints);

  const handleCancelComplaint = (id: string) => {
    setComplaints(complaints.filter(c => c.id !== id));
    toast.success(`Complaint ${id} cancelled successfully`);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 size={16} className="text-impact-gold" />;
      case "in-progress":
        return <Clock size={16} className="text-primary" />;
      default:
        return <AlertCircle size={16} className="text-critical" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      resolved: "bg-impact-gold/10 text-impact-gold",
      "in-progress": "bg-primary/10 text-primary",
      pending: "bg-critical/10 text-critical",
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-primary text-black py-8">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-black mb-2">
            {userRole === "citizen" ? "My Profile" : userRole === "admin" ? "Admin Profile" : "NGO Profile"}
          </h1>
          <p className="text-black/90">
            {userRole === "citizen" 
              ? "Manage your account and track your civic impact" 
              : "Manage your account and view resolved issues"}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* User Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-black text-2xl font-bold shrink-0">
              {mockUserData.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">{mockUserData.name}</h2>
              <p className="text-secondary-600 text-sm mb-3">
                {userRole === "citizen" ? "Citizen" : userRole === "admin" ? "Government Official" : "NGO Member"}
              </p>
              {userRole === "citizen" && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-impact-gold/10 text-impact-gold rounded-full text-sm font-semibold">
                    🛡️ {mockUserData.badge}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    Level {mockUserData.level}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-600 font-medium">Email:</span>
              <p className="text-secondary-900 mt-1">{mockUserData.email}</p>
            </div>
            <div>
              <span className="text-secondary-600 font-medium">Phone:</span>
              <p className="text-secondary-900 mt-1">{mockUserData.phone}</p>
            </div>
            <div>
              <span className="text-secondary-600 font-medium">Location:</span>
              <p className="text-secondary-900 mt-1">{mockUserData.location}</p>
            </div>
            <div>
              <span className="text-secondary-600 font-medium">Member Since:</span>
              <p className="text-secondary-900 mt-1">{mockUserData.joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Citizen-specific sections */}
        {userRole === "citizen" && (
          <>
            {/* Reward Points Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-impact-gold/10 rounded-xl flex items-center justify-center">
                  <Award className="text-impact-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">Reward Points</h3>
                  <p className="text-sm text-secondary-600">Earned through verified reports</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{mockUserData.rewardPoints}</span>
                <span className="text-secondary-600">points</span>
              </div>
              <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700">
                  🎯 <span className="font-semibold">500 more points</span> to unlock City Sentinel badge!
                </p>
              </div>
            </div>

            {/* My Complaints Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">My Complaints</h3>
                  <p className="text-sm text-secondary-600">{complaints.length} active reports</p>
                </div>
              </div>

              <div className="space-y-3">
                {complaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 border border-secondary-200 rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-secondary-600">{complaint.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </div>
                        <h4 className="font-semibold text-secondary-900 mb-1">{complaint.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-secondary-600">
                          <span>📅 {complaint.date}</span>
                          <span>📁 {complaint.category}</span>
                        </div>
                      </div>
                      {complaint.status === "pending" && (
                        <button
                          onClick={() => handleCancelComplaint(complaint.id)}
                          className="p-2 text-critical hover:bg-critical/10 rounded-lg transition-colors shrink-0"
                          title="Cancel complaint"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Center Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <HelpCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">Help Center</h3>
                  <p className="text-sm text-secondary-600">Get support and answers</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 border border-secondary-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                  <span className="text-secondary-900 font-medium">📖 How to file a report</span>
                </button>
                <button className="w-full text-left px-4 py-3 border border-secondary-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                  <span className="text-secondary-900 font-medium">🎖️ Understanding badges & rewards</span>
                </button>
                <button className="w-full text-left px-4 py-3 border border-secondary-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                  <span className="text-secondary-900 font-medium">💬 Contact support team</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Admin/NGO-specific sections */}
        {(userRole === "admin" || userRole === "ngo") && (
          <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-impact-gold/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="text-impact-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">Recently Resolved Complaints</h3>
                <p className="text-sm text-secondary-600">{mockAdminResolvedComplaints.length} issues resolved</p>
              </div>
            </div>

            <div className="space-y-3">
              {mockAdminResolvedComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-4 border border-secondary-200 rounded-lg hover:border-impact-gold/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-secondary-600">{complaint.id}</span>
                        <span className="px-2 py-0.5 bg-impact-gold/10 text-impact-gold rounded-full text-xs font-semibold">
                          ✓ Resolved
                        </span>
                      </div>
                      <h4 className="font-semibold text-secondary-900 mb-1">{complaint.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-secondary-600">
                        <span>📅 {complaint.resolvedDate}</span>
                        <span>👥 {complaint.citizensNotified} citizens notified</span>
                      </div>
                    </div>
                    <CheckCircle2 className="text-impact-gold shrink-0" size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-critical text-black rounded-lg hover:bg-critical/90 transition-colors font-semibold"
          >
            <LogOut size={20} className="text-black" />
            <span className="text-black font-semibold">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

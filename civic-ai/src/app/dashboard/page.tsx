import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
import ReportForm from "@/components/features/reporting/ReportForm";
import ImpactCard from "@/components/features/impact/ImpactCard";
import RecentReports from "@/components/features/dashboard/RecentReports";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Report Form (66% on desktop) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ReportForm />
          </div>

          {/* Right Column - Impact & Reports (33% on desktop) */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
            {/* Impact Card - On top for mobile */}
            <ImpactCard />
            
            {/* Recent Reports */}
            <RecentReports />
          </div>
        </div>
      </div>
    </div>
  );
}

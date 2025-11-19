import { TrendingUp, Users, CheckCircle2, MapPin, Award, Sparkles } from "lucide-react";

export default function ImpactPage() {
  const metrics = [
    { label: "Issues Clustered", value: "15,240+", icon: MapPin, color: "bg-primary/10 text-primary" },
    { label: "Resolution Rate", value: "98.2%", icon: CheckCircle2, color: "bg-impact-gold/10 text-impact-gold" },
    { label: "Citizens Helped", value: "2.5M+", icon: Users, color: "bg-impact-silver/20 text-impact-silver" },
    { label: "Avg. Response Time", value: "4.2 hrs", icon: TrendingUp, color: "bg-primary/10 text-primary" },
    { label: "Verified Reports", value: "48,905", icon: CheckCircle2, color: "bg-impact-gold/10 text-impact-gold" },
    { label: "Active Guardians", value: "12,847", icon: Award, color: "bg-impact-silver/20 text-impact-silver" },
  ];

  const topGuardians = [
    { name: "Rajesh Kumar", badge: "City Sentinel", reports: 147, city: "Hyderabad" },
    { name: "Priya Sharma", badge: "Community Guardian", reports: 128, city: "Bangalore" },
    { name: "Amit Patel", badge: "Civic Champion", reports: 115, city: "Mumbai" },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <div className="bg-primary text-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={20} className="text-black" />
            <span className="text-sm font-semibold text-black">Real-Time Impact Dashboard</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-black">
            Civic Impact and Transparency
          </h1>
          <p className="text-xl text-black/90 max-w-3xl mx-auto leading-relaxed">
            Measuring what matters: Every report, every resolution, every life improved. 
            See the collective power of citizen engagement in action.
          </p>
        </div>
      </div>

      {/* Global Metrics Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-secondary-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <span className="text-3xl font-bold text-secondary-900">
                    {metric.value}
                  </span>
                </div>
                <h3 className="text-secondary-700 font-semibold text-lg">
                  {metric.label}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guardian Recognition Program Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-impact-gold/20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-impact-gold/20 px-4 py-2 rounded-full mb-4">
              <Award className="text-impact-gold" size={20} />
              <span className="text-sm font-semibold text-secondary-900">
                Guardian Recognition Program
              </span>
            </div>
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Celebrating Community Heroes
            </h2>
            <p className="text-secondary-700 text-lg max-w-2xl mx-auto">
              Our citizens aren't just reporting issues—they're building safer, 
              more resilient communities. Every verified report earns recognition, 
              and top contributors unlock exclusive badges and certificates.
            </p>
          </div>

          {/* Top Guardians Leaderboard */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              🏆 Top Guardians This Month
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topGuardians.map((guardian, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border-2 border-impact-gold/30 relative overflow-hidden"
                >
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-impact-gold text-black px-3 py-1 text-xs font-bold rounded-bl-lg">
                      #1
                    </div>
                  )}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">🛡️</span>
                    </div>
                    <h4 className="text-lg font-bold text-secondary-900 mb-1">
                      {guardian.name}
                    </h4>
                    <p className="text-sm text-impact-gold font-semibold mb-2">
                      {guardian.badge}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-secondary-600">
                      <div>
                        <span className="font-bold text-primary">{guardian.reports}</span> reports
                      </div>
                      <div className="w-1 h-1 bg-secondary-400 rounded-full"></div>
                      <div>{guardian.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge Levels */}
          <div className="mt-10 bg-white rounded-xl p-6 border border-secondary-200">
            <h3 className="text-xl font-bold text-secondary-900 mb-4 text-center">
              Badge Achievement Levels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🥉</div>
                <div className="font-semibold text-impact-bronze text-sm">Bronze Guardian</div>
                <div className="text-xs text-secondary-600 mt-1">5+ verified reports</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🥈</div>
                <div className="font-semibold text-impact-silver text-sm">Silver Guardian</div>
                <div className="text-xs text-secondary-600 mt-1">20+ verified reports</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🥇</div>
                <div className="font-semibold text-impact-gold text-sm">Gold Guardian</div>
                <div className="text-xs text-secondary-600 mt-1">50+ verified reports</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-semibold text-primary text-sm">City Sentinel</div>
                <div className="text-xs text-secondary-600 mt-1">100+ verified reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-secondary-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Start Your Impact Journey Today
          </h2>
          <p className="text-secondary-700 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens making a real difference in their communities. 
            Your first report could help hundreds of people.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg shadow-md"
          >
            <span className="whitespace-nowrap">Start Reporting Issues</span>
          </a>
        </div>
      </div>
    </div>
  );
}

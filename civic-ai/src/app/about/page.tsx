import { Shield, Lightbulb, Users, Target, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <div className="bg-primary text-black py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-black">
            Our Mission: Citizen-Powered Resilience
          </h1>
          <p className="text-xl text-black/90 max-w-3xl mx-auto leading-relaxed">
            CivicAI bridges the gap between citizens and government, transforming 
            individual reports into collective action through AI-driven clustering 
            and transparent resolution tracking.
          </p>
        </div>
      </div>

      {/* Core Philosophy Sections */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Section 1: Empowering the Citizen */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="text-primary" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                1. Empowering the Citizen
              </h2>
              <p className="text-secondary-700 text-lg leading-relaxed mb-4">
                Every citizen becomes a guardian of their community. CivicAI transforms 
                passive observation into active participation, giving individuals the 
                tools to report hazards—from broken streetlights to sewage overflows—with 
                just a few taps.
              </p>
              <p className="text-secondary-700 text-lg leading-relaxed">
                Our platform doesn't just collect reports; it validates them through 
                community confirmation, ensuring that legitimate issues rise to the top 
                while filtering out noise. Citizens earn recognition badges as they 
                contribute, building a culture of civic pride and responsibility.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: AI-Driven Efficiency */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-impact-gold/10 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="text-impact-gold" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                2. AI-Driven Efficiency
              </h2>
              <p className="text-secondary-700 text-lg leading-relaxed mb-4">
                Manual triage of thousands of reports is unsustainable. Our AI clustering 
                engine automatically groups related incidents by location and type, 
                revealing patterns invisible to human operators.
              </p>
              <p className="text-secondary-700 text-lg leading-relaxed mb-4">
                When 42 citizens report sewage overflow near Charminar, the system 
                doesn't create 42 tickets—it creates one clustered incident with 42 
                confirmations, instantly flagging it as a critical hotspot requiring 
                immediate attention.
              </p>
              <p className="text-secondary-700 text-lg leading-relaxed">
                This intelligent prioritization ensures resources go where they're needed 
                most, cutting response times from weeks to hours for high-impact issues.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Building Trust */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-impact-silver/20 rounded-xl flex items-center justify-center shrink-0">
              <Heart className="text-impact-silver" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                3. Building Trust Through Transparency
              </h2>
              <p className="text-secondary-700 text-lg leading-relaxed mb-4">
                Civic engagement dies in darkness. CivicAI shines a light on every 
                step of the resolution process, from initial report to verified completion.
              </p>
              <p className="text-secondary-700 text-lg leading-relaxed mb-4">
                Government officials must upload "before" and "after" photos when marking 
                issues as resolved. Every citizen who reported the problem receives a 
                notification with photographic proof, creating an immutable feedback loop.
              </p>
              <p className="text-secondary-700 text-lg leading-relaxed">
                This radical transparency holds authorities accountable while showing 
                citizens their voice matters. Trust isn't built through promises—it's 
                built through proof of action.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Join the Movement
          </h2>
          <p className="text-secondary-700 text-lg mb-8 max-w-2xl mx-auto">
            Every report strengthens the community. Every resolution builds trust. 
            Together, we're creating cities that work for everyone.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg shadow-md"
          >
            <span className="whitespace-nowrap">Become a Civic Guardian</span>
          </a>
        </div>
      </div>
    </div>
  );
}

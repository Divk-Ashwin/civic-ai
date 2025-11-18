import Hero from "@/components/features/landing/Hero";
import AIInputBox from "@/components/features/reporting/AIInputBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <Hero />

      {/* AI Input Section */}
      <section className="pb-20 px-4">
        <AIInputBox />
      </section>
    </main>
  );
}

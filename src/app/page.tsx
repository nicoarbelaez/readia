import { Navbar } from "@/components/landing-page/navbar";
import { Hero } from "@/components/landing-page/hero";
import { DiagnosisTable } from "@/components/landing-page/diagnosis-table";
import demoRows from "@/content/demo-rows.json";
import { MetricsSection } from "@/components/landing-page/metrics-section";
import { SecuritySection } from "@/components/landing-page/security-section";
import { CustomSolutions } from "@/components/landing-page/custom-solutions";
import { TestimonialsSection } from "@/components/landing-page/testimonials-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import { Footer } from "@/components/landing-page/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--card)] to-[var(--muted)] text-[var(--foreground)] overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grandes */}
        <div className="absolute top-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--primary)]/20 blur-[180px]" />
        <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--primary)]/20 blur-[160px]" />
        {/* Extras medianos */}
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--primary)]/15 blur-[140px]" />
        <div className="absolute top-[70%] left-[15%] w-[250px] h-[250px] rounded-full bg-[var(--primary)]/15 blur-[130px]" />
        <div className="absolute top-[20%] left-[40%] w-[200px] h-[200px] rounded-full bg-[var(--primary)]/10 blur-[120px]" />
        {/* Pequeños toques */}
        <div className="absolute bottom-[20%] right-[30%] w-[150px] h-[150px] rounded-full bg-[var(--primary)]/10 blur-[100px]" />
        <div className="absolute top-[10%] right-[15%] w-[120px] h-[120px] rounded-full bg-[var(--primary)]/10 blur-[80px]" />
      </div>
      <Navbar />
      <Hero />
      <div className="container mx-auto max-w-6xl px-6">
        <div className="bg-[var(--card)]/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[var(--border)] p-8 md:p-12">
          <DiagnosisTable rows={demoRows} />
        </div>
      </div>
      <MetricsSection />
      <SecuritySection />
      <CustomSolutions />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
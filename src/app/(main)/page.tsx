import { NAVBAR } from "@/components/landingPage/Navbar";
import { HERO } from "@/components/landingPage/hero";
import { DiagnosisTable } from "@/components/landingPage/DiagnosisTable";
import demoRows from "@/content/demo-rows.json";
import { MetricsSection } from "@/components/landingPage/MetricsSection";
import { SecuritySection } from "@/components/landingPage/SecuritySection";
import { CustomSolutions } from "@/components/landingPage/CustomSolutions";
import { IntegrationSection } from "@/components/landingPage/IntegrationSection";
import { TestimonialsSection } from "@/components/landingPage/TestimonialsSection";
import { FAQSection } from "@/components/landingPage/FAQSection";
import { ContactSection } from "@/components/landingPage/ContactSection";
import { Footer } from "@/components/landingPage/Footer";

export default function Home() {
  return (
    <>
      <NAVBAR />
      <HERO />
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-900/20 py-16">
        <div className="container mx-auto px-6">
          <DiagnosisTable rows={demoRows} />
        </div>
      </section>
      <MetricsSection />
      <SecuritySection />
      <CustomSolutions />
      <IntegrationSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
}
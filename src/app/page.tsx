import { Navbar } from "@/components/landing-page/navbar";
import { Hero } from "@/components/landing-page/hero";
import { DiagnosisTable } from "@/components/landing-page/diagnosis-table";
import demoRows from "@/content/demo-rows.json";
import { MetricsSection } from "@/components/landing-page/metrics-section";
import { SecuritySection } from "@/components/landing-page/security-section";
import { CustomSolutions } from "@/components/landing-page/custom-solutions";
import { TestimonialsSection } from "@/components/landing-page/testimonials-section";
import { FAQSection } from "@/components/landing-page/faq-section";
import { ContactSection } from "@/components/landing-page/contact-section";
import { Footer } from "@/components/landing-page/footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
       <section className="min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--card)] py-20">
        <div className="container mx-auto px-4 md:px-6">
           <DiagnosisTable rows={demoRows} />
        </div>
      </section>
      <MetricsSection />
      <SecuritySection />
      <CustomSolutions />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
}
import { Mail, Phone, MessageCircle, Calendar } from "lucide-react";

export function ContactSection() {
  return (
    <>
      {/* Sección de Contacto */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] py-12 md:py-16 lg:py-20 text-[var(--foreground)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              ¿Quieres más información?
            </h2>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-4">
              Contacta con nuestro equipo de expertos en transformación digital e IA empresarial
            </p>
            <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Si quieres una demostración, recibir asesoramiento personalizado o resolver todas tus dudas y consultas, estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { icon: <Mail className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-3 text-[var(--primary)]" />, 
                title: "Email", 
                content: "info@readia.com" },
              { icon: <Phone className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-3 text-[var(--primary)]" />, 
                title: "Teléfono", 
                content: "+57 322 6784229" },
              { icon: <MessageCircle className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-3 text-[var(--primary)]" />, 
                title: "Chat en vivo", 
                content: "Disponible 24/7" },
              { icon: <Calendar className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-3 text-[var(--primary)]" />, 
                title: "Agendar reunión", 
                content: "15 min gratis" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 md:p-6 bg-[var(--card)]/10 rounded-xl backdrop-blur-sm">
                {item.icon}
                <h3 className="font-semibold mb-2 text-sm md:text-base text-[var(--foreground)]">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] text-xs md:text-sm">{item.content}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-6 py-3 md:px-8 md:py-4 bg-[var(--foreground)] text-[var(--primary)] hover:bg-[var(--muted)] rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-base md:text-lg">
              Trabaja con Nosotros
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

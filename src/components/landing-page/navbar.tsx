"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const resourcesItems = [
  {
    title: "Documentación Técnica",
    href: "/docs",
    description: "Guías detalladas y manuales de uso para integrar IA",
    icon: <BookOpen className="text-primary h-4 w-4" />,
  },
];

const quickLinks = [
  { name: "Diagnóstico", href: "#tabla" },
  { name: "Preguntas Frecuentes", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 border-border/40 border-b shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      } `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo y enlaces rápidos */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="group text-foreground z-50 flex items-center gap-2 text-2xl font-bold tracking-tight transition-colors hover:opacity-90"
          >
            <span className="from-primary bg-linear-to-r to-emerald-400 bg-clip-text text-transparent">
              Readia
            </span>
          </Link>

          {/* Enlaces rápidos - Solo visible en desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {/* Botón Iniciar sesión */}
          <Button
            asChild
            variant="outline"
            className="border-border/60 hover:bg-muted cursor-pointer rounded-xl text-sm transition-all duration-200"
          >
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="hover:bg-muted rounded-lg p-2 transition-colors md:hidden"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="text-foreground h-6 w-6" />
          ) : (
            <Menu className="text-foreground h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background/95 border-border/40 animate-in fade-in slide-in-from-top-5 absolute top-full left-0 w-full border-b shadow-lg backdrop-blur-md duration-200 md:hidden">
          <div className="space-y-5 px-6 py-6">
            {/* Enlaces rápidos en móvil */}
            <div>
              <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                Navegación rápida
              </h3>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-foreground hover:text-primary block py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recursos Mobile */}
            <div>
              <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                Recursos
              </h3>
              <div className="space-y-1">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="hover:bg-muted/50 flex items-center gap-3 rounded-xl p-3 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-foreground text-sm font-semibold">
                        {item.title}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Botones de acción Mobile */}
            <div className="border-border/40 space-y-2 border-t pt-4">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 w-full justify-center rounded-xl shadow-md transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

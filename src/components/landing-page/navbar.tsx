"use client";

import * as React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const resourcesItems = [
  {
    title: "Documentación Técnica",
    href: "/docs",
    description: "Guías detalladas y manuales de uso para integrar IA",
    icon: <BookOpen className="h-4 w-4 text-primary" />
  }
];

const quickLinks = [
  { name: "Diagnóstico", href: "#tabla" },
  { name: "Preguntas Frecuentes", href: "#faq" }
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
      className={`
        fixed top-0 z-50 w-full 
        transition-all duration-300
        ${isScrolled 
          ? "bg-background/85 backdrop-blur-md border-b border-border/40 shadow-sm" 
          : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo y enlaces rápidos */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group z-50 font-bold text-2xl tracking-tight text-foreground transition-colors hover:opacity-90"
          >
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Readia</span>
          </Link>

          {/* Enlaces rápidos - Solo visible en desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Recursos Desktop */}
          <div className="relative group">
            <button className="
              flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
              text-muted-foreground
              hover:text-foreground
              transition-colors duration-200
            ">
              Recursos
              <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="
              absolute top-full right-0 mt-2 w-80
              bg-card/95 backdrop-blur-md
              rounded-xl border border-border/50
              shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-50
            ">
              <div className="p-2">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {item.title}
                      </div>
                      <div className="text-muted-foreground text-xs mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Botón Iniciar sesión */}
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-border/60 hover:bg-muted cursor-pointer transition-all duration-200 text-sm"
          >
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-6 py-6 space-y-5">
            {/* Enlaces rápidos en móvil */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Navegación rápida
              </h3>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-foreground font-medium text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recursos Mobile */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Recursos
              </h3>
              <div className="space-y-1">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
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
            <div className="pt-4 border-t border-border/40 space-y-2">
              <Button
                asChild
                className="w-full justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
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
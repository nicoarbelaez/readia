"use client"

import * as React from "react"
import Link from "next/link"
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  User, 
  Menu,
  X
} from "lucide-react"

const solutionsItems = [
  {
    title: "Diagnóstico Completo",
    href: "/diagnostico",
    description: "Evaluación integral de capacidades TI para IA",
    icon: <BarChart3 className="h-4 w-4 text-[var(--primary)]" />
  },
  {
    title: "Hoja de Ruta Estratégica",
    href: "/hoja-de-ruta",
    description: "Plan de implementación por fases",
    icon: <FileText className="h-4 w-4 text-[var(--primary)]" />
  },
  {
    title: "Consultoría Especializada",
    href: "/consultoria",
    description: "Asesoramiento personalizado por expertos",
    icon: <User className="h-4 w-4 text-[var(--primary)]" />
  }
]

const resourcesItems = [
  {
    title: "Documentación Técnica",
    href: "/docs",
    description: "Guías detalladas y manuales de uso",
    icon: <BookOpen className="h-4 w-4 text-[var(--primary)]" />
  }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed top-0 z-50 w-full 
        transition-all duration-300
        ${isScrolled 
          ? 'bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm' 
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group z-50 text-[var(--primary)] font-bold text-3xl transition-colors hover:text-[var(--primary-foreground)]"
        >
          Readia
        </Link>

        {/* Desktop Navigation*/}
        <div className="hidden lg:flex items-center gap-6">
          
          {/* Recursos Desktop*/}
          <div className="relative group">
            <button className="
              px-3 py-2 rounded-lg text-sm font-medium
              text-[var(--foreground)]
              hover:text-[var(--primary)]
              transition-colors duration-200
            ">
              Recursos
            </button>
            <div className="
              absolute top-full right-0 mt-2 w-96
              bg-[var(--background)]/95 backdrop-blur-md
              rounded-xl border border-[var(--border)]
              shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-50
            ">
              <div className="p-3">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
                  >
                    <div className="bg-[var(--accent)]/40 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--foreground)] text-sm">
                        {item.title}
                      </div>
                      <div className="text-[var(--muted-foreground)] text-xs mt-1">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Botón Iniciar sesión */}
          <Link
            href="/login"
            className="
              px-4 py-2 rounded-lg text-sm font-medium 
              border border-[var(--border)]
              text-[var(--foreground)]
              transition-all duration-200
              hover:bg-[var(--primary-soft)] 
              hover:text-[var(--foreground)]
              hover:shadow-sm
            "
          >
            Iniciar sesión
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-[var(--foreground)]" />
          ) : (
            <Menu className="h-6 w-6 text-[var(--foreground)]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-lg">
          <div className="px-4 py-6 space-y-4">

            {/* Recursos Mobile */}
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2 px-3">
                Recursos
              </h3>
              <div className="space-y-1">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="bg-[var(--accent)]/40 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--foreground)] text-sm">
                        {item.title}
                      </div>
                      <div className="text-[var(--muted-foreground)] text-xs">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Botones de acción Mobile */}
            <div className="pt-4 border-t border-[var(--border)] space-y-2">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

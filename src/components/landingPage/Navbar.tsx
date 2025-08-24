"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  User, 
  Newspaper,
  Award,
  Menu,
  X
} from "lucide-react"

const solutionsItems = [
  {
    title: "Diagnóstico Completo",
    href: "/diagnostico",
    description: "Evaluación integral de capacidades TI para IA",
    icon: <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  },
  {
    title: "Hoja de Ruta Estratégica",
    href: "/hoja-de-ruta",
    description: "Plan de implementación por fases",
    icon: <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  },
  {
    title: "Consultoría Especializada",
    href: "/consultoria",
    description: "Asesoramiento personalizado por expertos",
    icon: <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  }
]

const resourcesItems = [
  {
    title: "Documentación Técnica",
    href: "/docs",
    description: "Guías detalladas y manuales de uso",
    icon: <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  }
]

export function NAVBAR() {
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
    <header className={`
      fixed top-0 z-50 w-full 
      transition-all duration-300
      ${isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm' 
        : 'bg-transparent border-b border-transparent'
      }
    `}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="relative">
            <div className="
              absolute -inset-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
            " />
            <Image
              src="./escritoReadia.svg"
              alt="Reedia - Diagnóstico TI hacia IA"
              width={120}
              height={40}
              className="relative z-10 transition-transform duration-300 group-hover:scale-105 w-24 sm:w-32"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center gap-1">
            {/* Soluciones Desktop */}
            <div className="relative group">
              <button className="
                px-3 py-2 rounded-lg text-sm font-medium
                text-slate-700 dark:text-slate-300
                hover:text-blue-700 dark:hover:text-blue-300
                transition-colors duration-200
              ">
                Soluciones
              </button>
              <div className="
                absolute top-full left-0 mt-2 w-96
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
                rounded-xl border border-slate-200 dark:border-slate-700
                shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 z-50
              ">
                <div className="p-3">
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Recursos Desktop */}
            <div className="relative group">
              <button className="
                px-3 py-2 rounded-lg text-sm font-medium
                text-slate-700 dark:text-slate-300
                hover:text-blue-700 dark:hover:text-blue-300
                transition-colors duration-200
              ">
                Recursos
              </button>
              <div className="
                absolute top-full left-0 mt-2 w-96
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
                rounded-xl border border-slate-200 dark:border-slate-700
                shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 z-50
              ">
                <div className="p-3">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Enlaces simples */}
            <Link href="/precios" className="
              px-3 py-2 rounded-lg text-sm font-medium
              text-slate-700 dark:text-slate-300
              hover:text-blue-700 dark:hover:text-blue-300
              transition-colors duration-200
            ">
              Precios
            </Link>
            
            <Link href="/contacto" className="
              px-3 py-2 rounded-lg text-sm font-medium
              text-slate-700 dark:text-slate-300
              hover:text-blue-700 dark:hover:text-blue-300
              transition-colors duration-200
            ">
              Contacto
            </Link>
          </div>
        </nav>

        {/* Botones de acción Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/login"
            className="
              px-4 py-2 rounded-lg text-sm font-medium 
              border border-slate-300 dark:border-slate-600 
              text-slate-700 dark:text-slate-300
              hover:bg-slate-50 dark:hover:bg-slate-800
              transition-all duration-200
              hover:shadow-sm
            "
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="
              px-4 py-2 rounded-lg text-sm font-medium 
              bg-blue-600 text-white 
              hover:bg-blue-700 
              transition-all duration-200
              hover:shadow-md
              transform hover:scale-105
            "
          >
            Comenzar diagnóstico
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Soluciones Mobile */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 px-3">
                Soluciones
              </h3>
              <div className="space-y-1">
                {solutionsItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white text-sm">
                        {item.title}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 text-xs">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recursos Mobile */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 px-3">
                Recursos
              </h3>
              <div className="space-y-1">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white text-sm">
                        {item.title}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 text-xs">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enlaces simples Mobile */}
            <Link
              href="/precios"
              className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Precios
            </Link>
            
            <Link
              href="/contacto"
              className="block px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>

            {/* Botones de acción Mobile */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comenzar diagnóstico
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
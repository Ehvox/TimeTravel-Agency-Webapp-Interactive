"use client"

import { useState, useEffect } from "react"
import { Clock, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Personnaliser", href: "#customize" },
  { label: "Assistant", href: "#chatbot" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 transition-all duration-500 group-hover:border-primary/70 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-[360deg]">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <span className="font-serif text-xl tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
            TimeTravel
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group/link relative text-sm tracking-widest uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover/link:w-full" />
            </a>
          ))}
          <a
            href="#customize"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Reserver
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground transition-all duration-300 hover:text-primary hover:scale-110 md:hidden"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-widest uppercase text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-2"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#customize"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full bg-primary px-6 py-2.5 text-center text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            Reserver
          </a>
        </div>
      </div>
    </nav>
  )
}

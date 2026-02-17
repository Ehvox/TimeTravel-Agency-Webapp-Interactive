"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { useInView } from "@/hooks/use-animations"

const footerLinks = [
  {
    title: "Destinations",
    links: ["Paris 1889", "Cretace", "Florence 1504", "Prochainement"],
  },
  {
    title: "Agence",
    links: ["A propos", "Notre equipe", "Securite", "Certifications"],
  },
  {
    title: "Support",
    links: ["FAQ", "Conditions temporelles", "Politique de retour", "Contact"],
  },
]

export function Footer() {
  const [footerRef, footerInView] = useInView<HTMLDivElement>()

  return (
    <footer id="contact" className="border-t border-border bg-card/50">
      <div
        ref={footerRef}
        className="mx-auto max-w-7xl px-6 py-16 lg:py-20"
      >
        <div
          className={`grid gap-12 lg:grid-cols-5 transition-all duration-1000 ${
            footerInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="group inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 transition-all duration-500 group-hover:border-primary/70 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-[360deg]">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="font-serif text-xl tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                TimeTravel
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              L{"'"}agence de voyages temporels de reference depuis 2147.
              Certifiee par l{"'"}Agence Internationale du Temps. Plus de 10 000
              voyageurs satisfaits a travers toutes les epoques.
            </p>
            <div className="mt-6 space-y-3">
              <div className="group/contact flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1">
                <Mail className="h-4 w-4 text-primary transition-transform duration-300 group-hover/contact:scale-110" />
                <span>contact@timetravel.agency</span>
              </div>
              <div className="group/contact flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1">
                <Phone className="h-4 w-4 text-primary transition-transform duration-300 group-hover/contact:scale-110" />
                <span>+33 1 88 00 2147</span>
              </div>
              <div className="group/contact flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1">
                <MapPin className="h-4 w-4 text-primary transition-transform duration-300 group-hover/contact:scale-110" />
                <span>42 Rue du Paradoxe, 75001 Paris</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div
              key={section.title}
              className={`transition-all duration-700`}
              style={{
                transitionDelay: `${(sectionIndex + 1) * 150}ms`,
                opacity: footerInView ? 1 : 0,
                transform: footerInView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <h4 className="text-sm font-medium tracking-wider uppercase text-foreground">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group/link relative inline-block text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1"
                    >
                      {link}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover/link:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className={`mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row transition-all duration-1000 delay-500 ${
            footerInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-xs text-muted-foreground">
            2147 TimeTravel Agency. Tous droits reserves a travers toutes les epoques.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-105">
              Mentions legales
            </a>
            <a href="#" className="text-xs text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-105">
              Politique temporelle
            </a>
            <a href="#" className="text-xs text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-105">
              Cookies spatio-temporels
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

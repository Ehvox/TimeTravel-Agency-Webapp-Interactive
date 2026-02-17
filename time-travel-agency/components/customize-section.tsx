"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  Shield,
  Compass,
  ChevronRight,
  Check,
  MapPin,
} from "lucide-react"
import { useInView } from "@/hooks/use-animations"

const destinations = [
  { id: "paris", label: "Paris 1889", icon: MapPin },
  { id: "cretaceous", label: "Cretace", icon: Compass },
  { id: "florence", label: "Florence 1504", icon: MapPin },
]

const durations = [
  { value: "3", label: "3 jours" },
  { value: "5", label: "5 jours" },
  { value: "7", label: "7 jours" },
  { value: "14", label: "14 jours" },
]

const experiences = [
  {
    id: "immersion",
    title: "Immersion Totale",
    description: "Vivez comme un habitant de l'epoque",
    icon: Users,
  },
  {
    id: "explorer",
    title: "Exploration Guidee",
    description: "Decouverte avec un guide temporel",
    icon: Compass,
  },
  {
    id: "luxury",
    title: "Premium Securise",
    description: "Confort maximum, risque minimum",
    icon: Shield,
  },
]

export function CustomizeSection() {
  const [selectedDest, setSelectedDest] = useState("paris")
  const [selectedDuration, setSelectedDuration] = useState("5")
  const [selectedExperience, setSelectedExperience] = useState("explorer")
  const [travelers, setTravelers] = useState(2)
  const [submitted, setSubmitted] = useState(false)
  const [headerRef, headerInView] = useInView<HTMLDivElement>()
  const [step1Ref, step1InView] = useInView<HTMLDivElement>()
  const [step2Ref, step2InView] = useInView<HTMLDivElement>()
  const [step3Ref, step3InView] = useInView<HTMLDivElement>()
  const [step4Ref, step4InView] = useInView<HTMLDivElement>()
  const [summaryRef, summaryInView] = useInView<HTMLDivElement>()

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const estimatedPrice = (
    (selectedDest === "cretaceous" ? 28000 : selectedDest === "florence" ? 15800 : 12500) *
    travelers *
    (parseInt(selectedDuration) / 5) *
    (selectedExperience === "immersion" ? 0.8 : selectedExperience === "luxury" ? 1.4 : 1)
  )

  return (
    <section id="customize" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.75_0.15_65_/_0.05)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={headerRef}
          className={`mb-16 max-w-2xl transition-all duration-1000 ${
            headerInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary">
            Personnalisation
          </span>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
            <span className="text-balance">Creez votre voyage sur mesure</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Chaque voyage est unique. Selectionnez vos preferences et nous
            concevrons l{"'"}experience temporelle parfaite pour vous.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="space-y-10 lg:col-span-3">
            {/* Step 1: Destination */}
            <div
              ref={step1Ref}
              className={`transition-all duration-700 ${
                step1InView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="mb-4 flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  1
                </span>
                Destination
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDest(dest.id)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                      selectedDest === dest.id
                        ? "border-primary bg-primary/10 text-foreground shadow-lg shadow-primary/10"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <dest.icon className={`h-5 w-5 transition-colors duration-300 ${selectedDest === dest.id ? "text-primary" : ""}`} />
                    <span className="text-sm font-medium">{dest.label}</span>
                    {selectedDest === dest.id && (
                      <Check className="ml-auto h-4 w-4 text-primary animate-scale-in" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div
              ref={step2Ref}
              className={`transition-all delay-100 duration-700 ${
                step2InView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="mb-4 flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  2
                </span>
                Duree
              </h3>
              <div className="flex flex-wrap gap-3">
                {durations.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDuration(d.value)}
                    className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                      selectedDuration === d.value
                        ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Travelers */}
            <div
              ref={step3Ref}
              className={`transition-all delay-200 duration-700 ${
                step3InView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="mb-4 flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  3
                </span>
                Voyageurs
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-primary/50 hover:scale-110 active:scale-90"
                >
                  -
                </button>
                <span
                  className="font-serif text-3xl text-foreground transition-all duration-300"
                  key={travelers}
                  style={{ animation: "scale-in 0.3s ease-out" }}
                >
                  {travelers}
                </span>
                <button
                  onClick={() => setTravelers(Math.min(8, travelers + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-primary/50 hover:scale-110 active:scale-90"
                >
                  +
                </button>
                <span className="text-sm text-muted-foreground">
                  personne{travelers > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Step 4: Experience */}
            <div
              ref={step4Ref}
              className={`transition-all delay-300 duration-700 ${
                step4InView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="mb-4 flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  4
                </span>
                Type d{"'"}experience
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExperience(exp.id)}
                    className={`group/exp flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                      selectedExperience === exp.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <exp.icon className={`h-5 w-5 transition-all duration-300 group-hover/exp:scale-110 ${selectedExperience === exp.id ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {exp.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div
              ref={summaryRef}
              className={`sticky top-28 rounded-2xl border border-border bg-card p-8 transition-all duration-1000 ${
                summaryInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h3 className="font-serif text-2xl text-foreground">
                Recapitulatif
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4 transition-all duration-300 hover:pl-1">
                  <span className="text-sm text-muted-foreground">
                    Destination
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {destinations.find((d) => d.id === selectedDest)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4 transition-all duration-300 hover:pl-1">
                  <span className="text-sm text-muted-foreground">Duree</span>
                  <span className="text-sm font-medium text-foreground">
                    {selectedDuration} jours
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4 transition-all duration-300 hover:pl-1">
                  <span className="text-sm text-muted-foreground">
                    Voyageurs
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {travelers} personne{travelers > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4 transition-all duration-300 hover:pl-1">
                  <span className="text-sm text-muted-foreground">
                    Experience
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {experiences.find((e) => e.id === selectedExperience)?.title}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-secondary/50 p-4 transition-all duration-500 hover:bg-secondary/70">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Estimation
                    </span>
                    <p
                      className="font-serif text-3xl text-primary transition-all duration-500"
                      key={`${selectedDest}-${selectedDuration}-${travelers}-${selectedExperience}`}
                      style={{ animation: "scale-in 0.4s ease-out" }}
                    >
                      {estimatedPrice.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}
                      {" \u20ac"}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selectedExperience === "immersion" ? "Immersion Totale" : selectedExperience === "luxury" ? "Premium Securise" : "Exploration Guidee"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitted}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  submitted
                    ? "bg-green-600 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4 animate-scale-in" />
                    Demande envoyee
                  </>
                ) : (
                  <>
                    Reserver ce voyage
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Annulation gratuite jusqu{"'"}a 48h avant le depart temporel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

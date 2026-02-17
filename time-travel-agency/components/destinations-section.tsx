"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Calendar, MapPin, Star, ChevronRight, Thermometer, Users } from "lucide-react"
import { useInView } from "@/hooks/use-animations"

interface Destination {
  id: string
  name: string
  epoch: string
  year: string
  image: string
  description: string
  highlights: string[]
  rating: number
  temperature: string
  groupSize: string
  price: string
}

const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris 1889",
    epoch: "Belle Epoque",
    year: "1889",
    image: "/images/paris-1889.jpg",
    description:
      "Plongez au coeur de l'Exposition Universelle de 1889. Assistez a l'inauguration de la Tour Eiffel, flanez sur les Champs-Elysees et vivez l'effervescence de la capitale francaise a son apogee culturelle.",
    highlights: [
      "Inauguration de la Tour Eiffel",
      "Exposition Universelle",
      "Diner chez Maxim's",
      "Balade en caleche",
    ],
    rating: 4.9,
    temperature: "18\u00b0C",
    groupSize: "2-6",
    price: "12 500",
  },
  {
    id: "cretaceous",
    name: "Cretace",
    epoch: "Mesozoique",
    year: "-68M",
    image: "/images/cretaceous.jpg",
    description:
      "Aventurez-vous 68 millions d'annees dans le passe. Observez les dinosaures dans leur habitat naturel depuis notre bulle de protection certifiee. Une expedition pour les ames les plus audacieuses.",
    highlights: [
      "Observation de T-Rex",
      "Safari Brachiosaurus",
      "Foret prehistorique",
      "Volcans en activite",
    ],
    rating: 4.7,
    temperature: "32\u00b0C",
    groupSize: "2-4",
    price: "28 000",
  },
  {
    id: "florence",
    name: "Florence 1504",
    epoch: "Renaissance",
    year: "1504",
    image: "/images/florence-1504.jpg",
    description:
      "Decouvrez Florence a l'epoque ou Leonard de Vinci et Michel-Ange rivalisaient de genie. Visitez les ateliers des plus grands maitres et contemplez la naissance de chefs-d'oeuvre intemporels.",
    highlights: [
      "Atelier de Leonard de Vinci",
      "Sculpture de Michel-Ange",
      "Palais des Medicis",
      "Marche Renaissance",
    ],
    rating: 4.8,
    temperature: "24\u00b0C",
    groupSize: "2-8",
    price: "15 800",
  },
]

function DestinationCard({
  destination,
  isActive,
  onClick,
  delay,
}: {
  destination: Destination
  isActive: boolean
  onClick: () => void
  delay: number
}) {
  const [cardRef, inView] = useInView<HTMLButtonElement>()
  const imageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setTilt({ x, y })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView
          ? `perspective(800px) rotateY(${tilt.x * 3}deg) rotateX(${-tilt.y * 3}deg)`
          : "perspective(800px) translateY(40px)",
        opacity: inView ? 1 : 0,
      }}
      className={`group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-700 ease-out will-change-transform ${
        isActive
          ? "border-primary/50 bg-card shadow-2xl shadow-primary/10"
          : "border-border bg-card/50 hover:border-primary/30 hover:bg-card"
      }`}
    >
      <div ref={imageRef} className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          style={{
            transform: `scale(${tilt.x !== 0 || tilt.y !== 0 ? 1.08 : 1}) translate(${tilt.x * -8}px, ${tilt.y * -8}px)`,
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute top-4 left-4 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-105">
          <span className="text-xs font-medium tracking-wider text-primary">
            {destination.epoch}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 backdrop-blur-sm transition-all duration-300 group-hover:bg-background/90 group-hover:scale-105">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">
            {destination.rating}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-serif text-2xl text-foreground transition-colors duration-300 group-hover:text-primary">
              {destination.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-sm">{destination.year}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">a partir de</span>
            <p className="font-serif text-xl text-primary">
              {destination.price} {"EUR"}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {destination.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 transition-colors duration-300 group-hover:text-foreground">
            <Thermometer className="h-3.5 w-3.5" />
            <span>{destination.temperature}</span>
          </div>
          <div className="flex items-center gap-1 transition-colors duration-300 group-hover:text-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{destination.groupSize} pers.</span>
          </div>
          <div className="flex items-center gap-1 transition-colors duration-300 group-hover:text-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{destination.epoch}</span>
          </div>
        </div>

        {/* Hover shimmer line */}
        <div className="mt-4 h-px w-full overflow-hidden rounded-full bg-border">
          <div className="h-full w-0 rounded-full bg-primary transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </button>
  )
}

export function DestinationsSection() {
  const [activeId, setActiveId] = useState("paris")
  const active = destinations.find((d) => d.id === activeId)!
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>()
  const [detailRef, detailInView] = useInView<HTMLDivElement>()
  const [detailMouse, setDetailMouse] = useState({ x: 0, y: 0 })

  const handleDetailMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setDetailMouse({ x, y })
  }, [])

  return (
    <section id="destinations" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`mb-16 max-w-2xl transition-all duration-1000 ${
            sectionInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary">
            Nos destinations
          </span>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
            <span className="text-balance">Trois epoques, trois aventures extraordinaires</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Chaque destination a ete soigneusement selectionnee pour vous offrir
            une immersion totale dans les moments les plus marquants de
            l{"'"}histoire.
          </p>
        </div>

        {/* Destination cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {destinations.map((dest, index) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isActive={dest.id === activeId}
              onClick={() => setActiveId(dest.id)}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Active destination details */}
        <div
          ref={detailRef}
          onMouseMove={handleDetailMouseMove}
          onMouseLeave={() => setDetailMouse({ x: 0, y: 0 })}
          className={`mt-16 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-1000 ${
            detailInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${1.05 + Math.abs(detailMouse.x) * 0.03}) translate(${detailMouse.x * -12}px, ${detailMouse.y * -12}px)`,
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 max-lg:bg-gradient-to-t max-lg:from-transparent max-lg:to-card/90" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="text-xs tracking-[0.3em] uppercase text-primary">
                {active.epoch} &mdash; {active.year}
              </span>
              <h3 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                {active.name}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {active.description}
              </p>
              <div className="mt-8">
                <h4 className="mb-4 text-sm font-medium tracking-wider uppercase text-foreground">
                  Points forts
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {active.highlights.map((highlight, i) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 transition-all duration-300 hover:border-primary/30 hover:bg-secondary hover:translate-x-1"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <ChevronRight className="h-3 w-3 text-primary" />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="#customize"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                >
                  Planifier ce voyage
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

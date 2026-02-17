"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Sparkles } from "lucide-react"
import Image from "next/image"
import { useScrollY } from "@/hooks/use-animations"

const marqueeItems = [
  "PARIS 1889",
  "CRETACE",
  "FLORENCE 1504",
  "VOYAGE TEMPOREL",
  "EXPLORATION",
  "AVENTURE",
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const scrollY = useScrollY()

  useEffect(() => {
    setLoaded(true)
  }, [])

  const parallaxOffset = scrollY * 0.3
  const bgOpacity = Math.max(0.2, 0.4 - scrollY * 0.0005)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-linear will-change-transform"
        style={{ transform: `translateY(${parallaxOffset}px) scale(${1 + scrollY * 0.0002})` }}
      >
        <Image
          src="/images/hero-portal.jpg"
          alt="Portail de voyage temporel"
          fill
          priority
          className="object-cover"
          style={{ opacity: bgOpacity }}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.75_0.15_65_/_0.08)_0%,_transparent_70%)]" />

      {/* Floating decorative rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-spin-slow absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          style={{ transform: `translate(-50%, -50%) rotate(${scrollY * 0.05}deg)` }}
        />
        <div
          className="animate-spin-slow absolute top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5"
          style={{ animationDirection: "reverse", transform: `translate(-50%, -50%) rotate(${-scrollY * 0.03}deg)` }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
        style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: Math.max(0, 1 - scrollY * 0.0015) }}
      >
        <div
          className={`transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 transition-all duration-300 hover:border-primary/60 hover:bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs tracking-widest uppercase text-primary">
              Agence de voyages temporels
            </span>
          </div>
        </div>

        <h1
          className={`font-serif text-5xl leading-tight font-medium tracking-tight text-foreground transition-all delay-200 duration-1000 md:text-7xl lg:text-8xl ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-balance">
            Voyagez a travers
            <br />
            <span className="text-primary">le temps</span>
          </span>
        </h1>

        <p
          className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground transition-all delay-400 duration-1000 md:text-xl ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Explorez les epoques les plus fascinantes de l{"'"}histoire. De la
          construction de la Tour Eiffel aux dinosaures du Cretace, vivez des
          experiences uniques et inoubliables.
        </p>

        <div
          className={`mt-10 flex flex-col items-center gap-4 transition-all delay-500 duration-1000 sm:flex-row ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <a
            href="#destinations"
            className="animate-pulse-glow rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          >
            Explorer les destinations
          </a>
          <a
            href="#chatbot"
            className="rounded-full border border-border px-8 py-3.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:text-primary"
          >
            Parler a un agent
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a href="#destinations" className="flex flex-col items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110">
          <span className="text-xs tracking-widest uppercase">Decouvrir</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="animate-marquee flex whitespace-nowrap py-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-xs tracking-[0.3em] text-muted-foreground/60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState, useCallback, type RefObject } from "react"

/**
 * Triggers a fade-in animation when the element enters the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return [ref, inView]
}

/**
 * Returns relative mouse position within an element for tilt / parallax effects.
 */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  { x: number; y: number }
] {
  const ref = useRef<T | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setPos({ x, y })
  }, [])

  const handleLeave = useCallback(() => {
    setPos({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)
    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [handleMove, handleLeave])

  return [ref, pos]
}

/**
 * Tracks scroll Y offset for parallax backgrounds.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])

  return scrollY
}

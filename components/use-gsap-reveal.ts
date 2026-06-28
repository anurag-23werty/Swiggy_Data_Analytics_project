"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

/**
 * Reveals direct children (or [data-reveal] elements) with a staggered
 * upward fade once they enter the viewport.
 */
export function useGsapReveal<T extends HTMLElement>(options?: {
  stagger?: number
  y?: number
  selector?: string
  delay?: number
}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const targets = options?.selector
      ? Array.from(el.querySelectorAll<HTMLElement>(options.selector))
      : (Array.from(el.children) as HTMLElement[])

    if (prefersReduced || targets.length === 0) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: options?.y ?? 24 })
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: options?.stagger ?? 0.08,
                delay: options?.delay ?? 0,
              })
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15 },
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, el)

    return () => ctx.revert()
  }, [options?.stagger, options?.y, options?.selector, options?.delay])

  return ref
}

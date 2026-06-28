"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

type Props = {
  value: number
  duration?: number
  decimals?: number
  format?: (n: number) => string
  className?: string
}

export function CountUp({ value, duration = 1.4, decimals = 0, format, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const obj = { n: prefersReduced ? value : 0 }
    const render = () => {
      const display = format ? format(obj.n) : obj.n.toFixed(decimals)
      el.textContent = display
    }
    render()
    if (prefersReduced) return
    const tween = gsap.to(obj, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: render,
    })
    return () => {
      tween.kill()
    }
  }, [started, value, duration, decimals, format])

  return <span ref={ref} className={className} />
}

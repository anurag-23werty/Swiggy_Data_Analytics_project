"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ArrowRight, BarChart3, Bike, Sparkles } from "lucide-react"
import { CountUp } from "@/components/count-up"
import { formatINR } from "@/lib/utils"
import { kpis } from "@/lib/data"

export function Hero() {
  const root = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-hero='badge']", { y: 20, opacity: 0, duration: 0.6 })
        .from("[data-hero='line']", { y: 40, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.3")
        .from("[data-hero='sub']", { y: 24, opacity: 0, duration: 0.6 }, "-=0.4")
        .from("[data-hero='cta']", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from("[data-hero='stat']", { y: 30, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.2")

      gsap.to("[data-hero='float']", {
        y: -14,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative overflow-hidden">
      {/* soft decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-40 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Bike className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-700">Swiggy</p>
            <p className="text-xs text-muted-foreground">Analytics Suite</p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-600 transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
        >
          Open dashboard
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-10 pt-16 text-center sm:pt-24">
        <span
          data-hero="badge"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-600 text-primary"
        >
          <Sparkles className="h-4 w-4" />
          Swiggy Business Analytics Project
        </span>

        <h1 className="mt-7 font-display text-5xl font-800 leading-[1.05] tracking-tight text-balance sm:text-7xl">
          <span data-hero="line" className="block">
            Insights that move
          </span>
          <span data-hero="line" className="block text-primary">
            at delivery speed.
          </span>
        </h1>

        <p data-hero="sub" className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Revenue, orders, ratings and city-level KPIs from a PostgreSQL star-schema warehouse —
          visualized in one live, animated dashboard.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            data-hero="cta"
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-700 text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03]"
          >
            <BarChart3 className="h-5 w-5" />
            Launch Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            data-hero="cta"
            href="https://github.com/anurag-23werty/Swiggy_Data_Analytics_project"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-600 transition-colors hover:border-primary/40"
          >
            View project
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Gross Revenue", el: <CountUp value={kpis.totalRevenue} format={formatINR} /> },
            {
              label: "Total Orders",
              el: <CountUp value={kpis.totalOrders} format={(n) => new Intl.NumberFormat("en-IN").format(Math.round(n))} />,
            },
            { label: "Avg Rating", el: <CountUp value={kpis.avgRating} decimals={2} /> },
          ].map((s) => (
            <div
              key={s.label}
              data-hero="stat"
              className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
            >
              <p className="font-display text-3xl font-800 text-foreground">{s.el}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import {
  LayoutDashboard,
  TrendingUp,
  Store,
  UtensilsCrossed,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import {
  OverviewSection,
  RevenueSection,
  RestaurantsSection,
  MenuSection,
  GeographySection,
} from "@/components/dashboard/sections"
import { navItems } from "@/lib/data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  TrendingUp,
  Store,
  UtensilsCrossed,
  MapPin,
}

const views: Record<string, () => React.ReactNode> = {
  overview: OverviewSection,
  revenue: RevenueSection,
  restaurants: RestaurantsSection,
  menu: MenuSection,
  geography: GeographySection,
}

export function DashboardShell() {
  const [active, setActive] = useState("overview")
  const contentRef = useRef<HTMLDivElement | null>(null)

  function handleSelect(id: string) {
    if (id === active) return
    const el = contentRef.current
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!el || prefersReduced) {
      setActive(id)
      return
    }
    gsap.to(el, {
      opacity: 0,
      y: 12,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => setActive(id),
    })
  }

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" })
  }, [active])

  const View = views[active] ?? OverviewSection

  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar active={active} onSelect={handleSelect} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar active={active} />

        {/* Mobile nav */}
        <nav className="no-scrollbar flex gap-2 overflow-x-auto border-b border-border px-5 py-3 lg:hidden">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-600 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <main className="flex-1 px-5 py-6 md:px-8">
          <div ref={contentRef}>
            <View />
          </div>
        </main>
      </div>
    </div>
  )
}

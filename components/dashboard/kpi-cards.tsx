"use client"

import { ArrowDownRight, ArrowUpRight, IndianRupee, ShoppingBag, Star, Receipt } from "lucide-react"
import { CountUp } from "@/components/count-up"
import { useGsapReveal } from "@/components/use-gsap-reveal"
import { formatINR, formatNumber } from "@/lib/utils"
import { kpis } from "@/lib/data"

const cards = [
  {
    label: "Total Revenue",
    icon: IndianRupee,
    value: <CountUp value={kpis.totalRevenue} format={formatINR} />,
    delta: kpis.revenueDelta,
  },
  {
    label: "Total Orders",
    icon: ShoppingBag,
    value: <CountUp value={kpis.totalOrders} format={(n) => formatNumber(n)} />,
    delta: kpis.ordersDelta,
  },
  {
    label: "Avg Order Value",
    icon: Receipt,
    value: <CountUp value={kpis.avgOrderValue} format={(n) => formatINR(n)} />,
    delta: kpis.aovDelta,
  },
  {
    label: "Avg Rating",
    icon: Star,
    value: <CountUp value={kpis.avgRating} decimals={2} />,
    delta: kpis.ratingDelta,
  },
]

export function KpiCards() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.1 })

  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => {
        const positive = c.delta >= 0
        const Icon = c.icon
        return (
          <div
            key={c.label}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-700 ${
                  positive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
                }`}
              >
                {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {Math.abs(c.delta)}%
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-800 tracking-tight">{c.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </div>
        )
      })}
    </div>
  )
}

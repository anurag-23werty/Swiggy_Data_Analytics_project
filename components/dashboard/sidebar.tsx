"use client"

import Link from "next/link"
import {
  Bike,
  LayoutDashboard,
  TrendingUp,
  Store,
  UtensilsCrossed,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "@/lib/data"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  TrendingUp,
  Store,
  UtensilsCrossed,
  MapPin,
}

type Props = {
  active: string
  onSelect: (id: string) => void
}

export function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-card/60 px-4 py-6 lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Bike className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-700">Swiggy</p>
          <p className="text-xs text-muted-foreground">Analytics Suite</p>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-600 transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <p className="text-sm font-700 text-primary">Live data</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Warehouse synced across 38 cities &middot; star schema, 75.9K orders.
        </p>
      </div>
    </aside>
  )
}

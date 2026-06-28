"use client"

import { Star, TrendingUp } from "lucide-react"
import { Panel } from "@/components/dashboard/panel"
import {
  RevenueTrendChart,
  OrdersByDayChart,
  PriceRangeChart,
  CategoryDonut,
  TopCitiesChart,
  RevenueByStateChart,
} from "@/components/dashboard/charts"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { topRestaurants, topDishes, categories } from "@/lib/data"
import { formatINR, formatNumber } from "@/lib/utils"

function RestaurantTable() {
  const max = Math.max(...topRestaurants.map((r) => r.revenue))
  return (
    <Panel title="Top Restaurants by Revenue" subtitle="Leading delivery partners across all cities">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-3 pr-4 font-600">#</th>
              <th className="pb-3 pr-4 font-600">Restaurant</th>
              <th className="pb-3 pr-4 font-600">Orders</th>
              <th className="pb-3 pr-4 font-600">Rating</th>
              <th className="pb-3 font-600">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topRestaurants.map((r, i) => (
              <tr key={r.name} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4 font-display font-700 text-muted-foreground">{i + 1}</td>
                <td className="py-3 pr-4 font-600">{r.name}</td>
                <td className="py-3 pr-4 text-muted-foreground">{formatNumber(r.orders)}</td>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-2 py-0.5 text-xs font-700 text-secondary-foreground">
                    <Star className="h-3 w-3 fill-current text-primary" />
                    {r.rating}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-20 shrink-0 font-700">{formatINR(r.revenue)}</span>
                    <span className="hidden h-1.5 flex-1 overflow-hidden rounded-full bg-muted sm:block">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${(r.revenue / max) * 100}%` }}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function DishesList() {
  const max = Math.max(...topDishes.map((d) => d.orders))
  return (
    <Panel title="Most Ordered Dishes" subtitle="By total order count">
      <ul className="flex flex-col gap-3.5">
        {topDishes.map((d) => (
          <li key={d.dish}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-600">{d.dish}</span>
              <span className="text-muted-foreground">{formatNumber(d.orders)}</span>
            </div>
            <span className="block h-2 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-primary" style={{ width: `${(d.orders / max) * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function CuisinePerformance() {
  return (
    <Panel title="Cuisine Performance" subtitle="Order volume paired with average rating">
      <ul className="flex flex-col divide-y divide-border/60">
        {categories.map((c) => (
          <li key={c.category} className="flex items-center justify-between py-3">
            <div>
              <p className="font-600">{c.category}</p>
              <p className="text-xs text-muted-foreground">{formatNumber(c.orders)} orders</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-2.5 py-1 text-xs font-700 text-secondary-foreground">
              <Star className="h-3 w-3 fill-current text-primary" />
              {c.rating}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function OverviewSection() {
  return (
    <div className="flex flex-col gap-5">
      <KpiCards />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Panel
          title="Revenue Trend"
          subtitle="Monthly gross revenue (INR)"
          className="xl:col-span-2"
          action={
            <span className="inline-flex items-center gap-1 rounded-full bg-positive/10 px-2.5 py-1 text-xs font-700 text-positive">
              <TrendingUp className="h-3.5 w-3.5" />
              +9.8%
            </span>
          }
        >
          <RevenueTrendChart />
        </Panel>
        <Panel title="Orders by Category" subtitle="Share of total volume">
          <CategoryDonut />
        </Panel>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Orders by Day of Week" subtitle="Weekend demand peaks">
          <OrdersByDayChart />
        </Panel>
        <Panel title="Orders by Price Range" subtitle="Average order value distribution">
          <PriceRangeChart />
        </Panel>
      </div>
      <RestaurantTable />
    </div>
  )
}

export function RevenueSection() {
  return (
    <div className="flex flex-col gap-5">
      <KpiCards />
      <Panel title="Revenue Trend" subtitle="Monthly gross revenue (INR)">
        <RevenueTrendChart />
      </Panel>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Revenue by State" subtitle="Top performing states">
          <RevenueByStateChart />
        </Panel>
        <Panel title="Orders by Price Range" subtitle="Average order value distribution">
          <PriceRangeChart />
        </Panel>
      </div>
    </div>
  )
}

export function RestaurantsSection() {
  return (
    <div className="flex flex-col gap-5">
      <RestaurantTable />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <CuisinePerformance />
        <Panel title="Orders by Category" subtitle="Share of total volume">
          <CategoryDonut />
        </Panel>
      </div>
    </div>
  )
}

export function MenuSection() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <DishesList />
      <CuisinePerformance />
      <Panel title="Orders by Category" subtitle="Share of total volume" className="xl:col-span-2">
        <CategoryDonut />
      </Panel>
    </div>
  )
}

export function GeographySection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Top 10 Cities by Orders" subtitle="Order volume ranking">
          <TopCitiesChart />
        </Panel>
        <Panel title="Revenue by State" subtitle="Top performing states">
          <RevenueByStateChart />
        </Panel>
      </div>
    </div>
  )
}

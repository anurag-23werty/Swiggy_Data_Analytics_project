"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { monthly, priceRanges, ordersByDay, topCities, categories, revenueByState } from "@/lib/data"
import { formatINR, formatNumber } from "@/lib/utils"

const ORANGE = "#FC8019"
const PALETTE = ["#FC8019", "#FFA552", "#FFB800", "#E0480E", "#FFCB9A", "#C2410C", "#FB923C", "#92400E"]

const axisStyle = { fontSize: 12, fill: "#8a8178" }

function TooltipBox({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean
  payload?: any[]
  label?: string
  valueFormatter?: (n: number) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-700 text-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs text-muted-foreground">
          <span className="font-600 capitalize text-foreground">{p.name}: </span>
          {valueFormatter ? valueFormatter(p.value) : formatNumber(p.value)}
        </p>
      ))}
    </div>
  )
}

export function RevenueTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthly} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ORANGE} stopOpacity={0.35} />
            <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#efe7dd" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisStyle} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={axisStyle}
          tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
          width={40}
        />
        <Tooltip content={<TooltipBox valueFormatter={formatINR} />} />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke={ORANGE}
          strokeWidth={2.5}
          fill="url(#revFill)"
          dot={false}
          activeDot={{ r: 5, fill: ORANGE }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function OrdersByDayChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={ordersByDay} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#efe7dd" vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={axisStyle} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={axisStyle}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          width={36}
        />
        <Tooltip cursor={{ fill: "#fbeede" }} content={<TooltipBox valueFormatter={formatNumber} />} />
        <Bar dataKey="orders" name="Orders" radius={[6, 6, 0, 0]} maxBarSize={42}>
          {ordersByDay.map((d, i) => (
            <Cell key={i} fill={d.day === "Sat" || d.day === "Sun" ? ORANGE : "#FFCB9A"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function PriceRangeChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={priceRanges} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#efe7dd" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} tick={axisStyle} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <YAxis type="category" dataKey="range" tickLine={false} axisLine={false} tick={axisStyle} width={70} />
        <Tooltip cursor={{ fill: "#fbeede" }} content={<TooltipBox valueFormatter={formatNumber} />} />
        <Bar dataKey="orders" name="Orders" radius={[0, 6, 6, 0]} maxBarSize={28}>
          {priceRanges.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CategoryDonut() {
  const total = categories.reduce((s, c) => s + c.orders, 0)
  return (
    <div className="flex flex-col items-center gap-5">
      <ResponsiveContainer width="100%" height={220} className="max-w-[220px]">
        <PieChart>
          <Pie
            data={categories}
            dataKey="orders"
            nameKey="category"
            innerRadius={62}
            outerRadius={95}
            paddingAngle={2}
            stroke="none"
          >
            {categories.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<TooltipBox valueFormatter={formatNumber} />} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="grid w-full grid-cols-2 gap-x-5 gap-y-2">
        {categories.map((c, i) => (
          <li key={c.category} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              <span className="truncate">{c.category}</span>
            </span>
            <span className="shrink-0 font-600 text-foreground">{((c.orders / total) * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TopCitiesChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={topCities} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#efe7dd" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} tick={axisStyle} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <YAxis type="category" dataKey="city" tickLine={false} axisLine={false} tick={axisStyle} width={84} />
        <Tooltip cursor={{ fill: "#fbeede" }} content={<TooltipBox valueFormatter={formatNumber} />} />
        <Bar dataKey="orders" name="Orders" radius={[0, 6, 6, 0]} maxBarSize={22} fill={ORANGE} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function RevenueByStateChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={revenueByState} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#efe7dd" vertical={false} />
        <XAxis dataKey="state" tickLine={false} axisLine={false} tick={{ ...axisStyle, fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={56} />
        <YAxis tickLine={false} axisLine={false} tick={axisStyle} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} width={40} />
        <Tooltip cursor={{ fill: "#fbeede" }} content={<TooltipBox valueFormatter={formatINR} />} />
        <Bar dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]} maxBarSize={44}>
          {revenueByState.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

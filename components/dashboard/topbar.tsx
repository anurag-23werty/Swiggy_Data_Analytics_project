"use client"

import { Bell, Download, Search } from "lucide-react"

const titles: Record<string, { title: string; sub: string }> = {
  overview: { title: "Business Overview", sub: "Full year \u00B7 All cities" },
  revenue: { title: "Revenue Analytics", sub: "Monthly & quarterly trends" },
  restaurants: { title: "Restaurant Performance", sub: "Top partners by revenue" },
  menu: { title: "Menu & Dishes", sub: "Categories & most-ordered items" },
  geography: { title: "Geography", sub: "City & state level demand" },
}

export function Topbar({ active }: { active: string }) {
  const t = titles[active] ?? titles.overview
  return (
    <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-between md:px-8">
      <div>
        <h1 className="font-display text-xl font-700 tracking-tight md:text-2xl">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.sub}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative hidden flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurant, city, dish..."
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-ring/20 md:w-72"
          />
        </div>
        <button
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-700 text-primary-foreground shadow-md shadow-primary/30 transition-transform hover:scale-[1.03]">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export report</span>
        </button>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display text-sm font-700 text-secondary-foreground">
          SA
        </span>
      </div>
    </header>
  )
}

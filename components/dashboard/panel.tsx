import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Panel({
  title,
  subtitle,
  action,
  className,
  children,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card p-5 shadow-sm", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-700 tracking-tight">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

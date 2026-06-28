import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatINR(value: number): string {
  if (value >= 10000000) return `\u20B9${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `\u20B9${(value / 100000).toFixed(2)} L`
  if (value >= 1000) return `\u20B9${(value / 1000).toFixed(1)}K`
  return `\u20B9${value.toFixed(0)}`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(Math.round(value))
}

import type { Metadata, Viewport } from "next"
import { Sora, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
})

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Swiggy Analytics Suite — Business KPI Dashboard",
  description:
    "Revenue, orders, delivery performance and city-level KPIs from the Swiggy data warehouse — visualized in one live dashboard.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#FC8019",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

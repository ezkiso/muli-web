import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: 'Desobediencia, ContruHazard y Fono Copete',
  description: 'Tiendas online en Chile: Serigrafía, Construcción y Delivery de Alcohol',
  keywords: 'tienda online chile, serigrafía, construcción, delivery alcohol',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Desobediencia, ContruHazard y Fono Copete',
    description: 'Desobediencia, ContruHazard y Fono Copete',
    siteName: 'Desobediencia, ContruHazard y Fono Copete',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif" }}>{children}</body>
    </html>
  )
}

// src/app/stores/fono-copete/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Fono Copete Barrio Yungay - Delivery de Alcohol 24/7',
    description: 'Delivery de alcohol en Barrio Yungay, Santiago. Servicio 24/7',
    icons: {
        icon: '/fono-copete/favicon.ico',
        shortcut: '/fono-copete/favicon.ico',
        apple: '/fono-copete/favicon.ico',
    },
    }

    export default function FonoCopeteLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return <>{children}</>
}
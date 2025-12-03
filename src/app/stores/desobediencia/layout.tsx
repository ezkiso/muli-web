// src/app/stores/desobediencia/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Desobediencia - Serigrafía & Estampados',
    description: 'Diseños únicos de serigrafía. Post-punk y cultura alternativa',
    icons: {
        icon: '/desobediencia/favicon.ico',
        shortcut: '/desobediencia/favicon.ico',
        apple: '/desobediencia/favicon.ico',
    },
    }

    export default function DesobedienciaLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return <>{children}</>
}
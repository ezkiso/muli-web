// src/app/stores/desobediencia/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Desobediencia - Serigrafía',
    description: 'Desobediencia. Tienda de serigrafía en Santiago. Diseños únicos de bandas post-punk y alternativas. Poleras, hoodies y más con estampados de alta calidad.',
    icons: {
        icon: '/desobediencia/favicon.ico',
        shortcut: '/desobediencia/favicon.ico',
        apple: '/desobediencia/favicon.ico',
    },
    keywords: 'serigrafía, estampados, poleras, post-punk, bauhaus, joy division, santiago, chile',
    openGraph: {
        title: 'Desobediencia - Serigrafía',
        description: 'Diseños únicos de serigrafía. Post-punk y cultura alternativa',
        url: 'https://desobediencia-contruhazard-fono-copete.vercel.app/desobediencia',
        siteName: 'Desobediencia',
        images: [
        {
            url: 'https://desobediencia-contruhazard-fono-copete.vercel.app/icon.png',
            width: 1200,
            height: 630,
        },
        ],
        locale: 'es_CL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Desobediencia - Serigrafía',
        description: 'Diseños únicos de serigrafía',
        images: ['https://desobediencia-contruhazard-fono-copete.vercel.app/icon.png'],
    },
    }

    export default function DesobedienciaLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return <>{children}</>
}
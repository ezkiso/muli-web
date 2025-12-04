// src/app/stores/desobediencia/layout.tsx
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/constants'


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
        url: `S{SITEURL/desobediencia}`,
        siteName: 'Desobediencia',
        images: [
        {
            url: `${SITE_URL}/icon.png`,
            width: 1200,
            height: 630,
        },
        ],
        locale: 'es_CL',
        type: 'website',
    },
    }

    export default function DesobedienciaLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return <>{children}</>
}
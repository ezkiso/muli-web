// src/app/stores/desobediencia/layout.tsx
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/constants'


export const metadata: Metadata = {
    title: 'Desobediencia | Serigrafía Post-Punk y Alternativa en Santiago, Chile',
    description: 'Tienda de serigrafía en Santiago con diseños únicos de bandas post-punk y alternativas. Poleras, hoodies y más con estampados de alta calidad. Bauhaus, Joy Division y más.',
    keywords: ['serigrafía', 'estampados', 'poleras', 'post-punk', 'bauhaus', 'joy division', 'santiago', 'chile', 'ropa alternativa', 'hoodies', 'camisetas', 'diseños únicos', 'cultura underground'],
    authors: [{ name: 'Desobediencia' }],
    creator: 'Desobediencia',
    publisher: 'Desobediencia',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://desobediencia.cl'),
    alternates: {
        canonical: '/stores/desobediencia',
    },
    icons: {
        icon: '/desobediencia/favicon.ico',
        shortcut: '/desobediencia/favicon.ico',
        apple: '/desobediencia/favicon.ico',
    },
    openGraph: {
        type: 'website',
        locale: 'es_CL',
        url: 'https://desobediencia.cl/stores/desobediencia',
        title: 'Desobediencia | Serigrafía Post-Punk y Alternativa en Santiago, Chile',
        description: 'Tienda de serigrafía en Santiago con diseños únicos de bandas post-punk y alternativas. Poleras, hoodies y más con estampados de alta calidad.',
        siteName: 'Desobediencia',
        images: [
            {
                url: '/desobediencia/icon.png',
                width: 1200,
                height: 630,
                alt: 'Desobediencia - Serigrafía Post-Punk y Alternativa',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Desobediencia | Serigrafía Post-Punk y Alternativa',
        description: 'Tienda de serigrafía en Santiago con diseños únicos de bandas post-punk y alternativas.',
        images: ['/desobediencia/icon.png'],
        creator: '@desobediencia',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
}

    export default function DesobedienciaLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return <>{children}</>
}
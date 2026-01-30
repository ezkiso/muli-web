// src/app/stores/nicolapso/layout.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { STORES } from '@/lib/stores-config';

const storeConfig = STORES.nicolapso;

// Metadata para SEO
export const metadata: Metadata = {
    title: `${storeConfig.name} - Arte Corporal Personalizado`,
    description: storeConfig.description,
    icons: '/nicolapso/favicon.ico',
    keywords: 'tatuajes, dotwork, blackwork, tatuajes santiago, nicolapso, arte corporal, tatuajes personalizados',
    openGraph: {
        title: storeConfig.name,
        description: storeConfig.description,
        type: 'website',
    },
    };

    export default function NicolapsoLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    const whatsappLink = `https://wa.me/${storeConfig.whatsapp?.replace(/[^\d]/g, '')}`;

    return (
        <div className="min-h-screen from-stone-950 via-zinc-950 to-neutral-950">
        {/* Header/Navigation */}
        <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo y nombre */}
                <div className="flex items-center gap-4">
                {/* Botón volver */}
                <Link
                    href="/"
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-stone-400 hover:text-amber-400"
                    aria-label="Volver al inicio"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                {/* Logo y nombre */}
                <Link href="/stores/nicolapso" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600/30">
                    <img
                        src={storeConfig.logo}
                        alt={storeConfig.name}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-amber-400">
                        {storeConfig.name}
                    </h1>
                    <p className="text-xs text-stone-500">
                        {storeConfig.description}
                    </p>
                    </div>
                </Link>
                </div>

                {/* Navegación desktop */}
                <nav className="hidden md:flex items-center gap-6">
                <Link
                    href="/stores/nicolapso#galeria"
                    className="text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium"
                >
                    Galería
                </Link>
                <Link
                    href="/stores/nicolapso#about"
                    className="text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium"
                >
                    Sobre Mí
                </Link>
                <Link
                    href="/stores/nicolapso#faq"
                    className="text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium"
                >
                    FAQ
                </Link>
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-3">
                {/* Redes sociales - Desktop */}
                <div className="hidden sm:flex items-center gap-2">
                    <a
                    href={`https://instagram.com/${storeConfig.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-stone-400 hover:text-pink-500"
                    aria-label="Instagram"
                    >
                    <Instagram className="w-5 h-5" />
                    </a>
                    <a
                    href={`https://facebook.com/${storeConfig.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-stone-400 hover:text-blue-500"
                    aria-label="Facebook"
                    >
                    <Facebook className="w-5 h-5" />
                    </a>
                </div>

                {/* Botón WhatsApp */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-all font-semibold text-sm shadow-lg hover:shadow-green-900/50"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Contactar</span>
                </a>
                </div>
            </div>

            {/* Navegación mobile */}
            <div className="md:hidden pb-3 flex gap-4 overflow-x-auto">
                <Link
                href="/stores/nicolapso#galeria"
                className="text-stone-400 hover:text-amber-400 transition-colors text-sm whitespace-nowrap"
                >
                Galería
                </Link>
                <Link
                href="/stores/nicolapso#about"
                className="text-stone-400 hover:text-amber-400 transition-colors text-sm whitespace-nowrap"
                >
                Sobre Mí
                </Link>
                <Link
                href="/stores/nicolapso#faq"
                className="text-stone-400 hover:text-amber-400 transition-colors text-sm whitespace-nowrap"
                >
                FAQ
                </Link>
            </div>
            </div>
        </header>

        {/* Contenido principal */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-zinc-950 border-t border-zinc-800 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                {/* Info */}
                <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-600/30">
                    <img
                        src={storeConfig.logo}
                        alt={storeConfig.name}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div>
                    <h3 className="text-xl font-bold text-stone-100">
                        {storeConfig.name}
                    </h3>
                    <p className="text-sm text-stone-500">Arte que perdura</p>
                    </div>
                </div>
                <p className="text-stone-400 mb-4 text-sm">
                    Especializado en técnicas de dotwork y blackwork. Cada diseño es una obra única 
                    creada específicamente para ti.
                </p>
                <div className="flex gap-3">
                    <a
                    href={`https://instagram.com/${storeConfig.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-900 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all text-stone-400 hover:text-white"
                    aria-label="Instagram"
                    >
                    <Instagram className="w-5 h-5" />
                    </a>
                    <a
                    href={`https://facebook.com/${storeConfig.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-900 rounded-lg hover:bg-blue-600 transition-all text-stone-400 hover:text-white"
                    aria-label="Facebook"
                    >
                    <Facebook className="w-5 h-5" />
                    </a>
                    <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-900 rounded-lg hover:bg-green-600 transition-all text-stone-400 hover:text-white"
                    aria-label="WhatsApp"
                    >
                    <MessageCircle className="w-5 h-5" />
                    </a>
                </div>
                </div>

                {/* Enlaces */}
                <div>
                <h4 className="font-semibold text-stone-100 mb-4 text-sm">
                    Navegación
                </h4>
                <ul className="space-y-2">
                    <li>
                    <Link
                        href="/stores/nicolapso"
                        className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                    >
                        Inicio
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/stores/nicolapso#galeria"
                        className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                    >
                        Galería
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/stores/nicolapso#about"
                        className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                    >
                        Sobre Mí
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/stores/nicolapso#faq"
                        className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                    >
                        Preguntas Frecuentes
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/"
                        className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                    >
                        Volver al inicio
                    </Link>
                    </li>
                </ul>
                </div>

                {/* Contacto */}
                <div>
                <h4 className="font-semibold text-stone-100 mb-4 text-sm">
                    Contacto
                </h4>
                <ul className="space-y-2 text-sm text-stone-400">
                    <li>📍 Santiago, Chile</li>
                    <li>🕐 Lun - Vie: 10:00 - 19:00</li>
                    <li>🕐 Sábado: 11:00 - 17:00</li>
                    <li>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors"
                    >
                        WhatsApp: {storeConfig.whatsapp}
                    </a>
                    </li>
                </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
                <p className="text-stone-500 text-sm">
                © {new Date().getFullYear()} {storeConfig.name}. Todos los derechos reservados.
                </p>
                <p className="text-stone-600 text-xs mt-2">
                Diseños únicos y personalizados - No se reproducen sin autorización
                </p>
            </div>
            </div>
        </footer>

        {/* Botón flotante de WhatsApp (solo mobile) */}
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-green-600 text-white rounded-full shadow-2xl hover:bg-green-500 transition-all hover:scale-110 animate-bounce"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </a>
        </div>
    );
}
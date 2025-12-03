// src/app/stores/fono-copete/page.tsx
'use client'

import Image from 'next/image';
import StoreSelector from '@/components/shared/StoreSelector';
import { Phone, Clock, MapPin, Wine, Beer, Flame } from 'lucide-react';
import { tragosData, type Trago } from '@/data/tragos';
import { useState } from 'react';

export default function FonoCopete() {
    const [selectedProduct, setSelectedProduct] = useState<Trago | null>(null);
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL').format(price);
    };

    const handleWhatsApp = (trago: Trago) => {
        const mensaje = `Hola! Quiero pedir: ${trago.nombre} - $${formatPrice(trago.precio)}`;
        const url = `https://wa.me/56966743432?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-black">
        <StoreSelector currentStoreId="copete" />

        {/* Header con Logo */}
        <header className="bg-gradient-to-r from-red-900 via-black to-red-900 text-white shadow-2xl">
            <div className="container mx-auto px-4 py-8">
            <div className="text-center">
                {/* Logo Circular */}
                <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-red-600 overflow-hidden relative">
                    <Image
                        src="/fono-copete/icon.png"
                        alt="Fono Copete Logo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fono Copete Barrio Yungay
                </h1>
                <p className="text-red-200 text-lg md:text-xl mb-6">
                ¡No te quedi seco! Fono Copete 24 horas en tu barrio favorito.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span>Abierto 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span>Barrio Yungay, Santiago</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>Delivery Disponible</span>
                </div>
                </div>
            </div>
            </div>
        </header>

        {/* Promociones Destacadas */}
        <section className="container mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                <Flame className="w-10 h-10" />
                <div>
                    <h2 className="text-2xl font-bold">¡OFERTAS CALIENTES!</h2>
                    <p className="text-red-100">Aprovecha nuestras promociones especiales</p>
                </div>
                </div>
                <a 
                href="https://wa.me/56966743432" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition flex items-center gap-2"
                >
                <Phone className="w-5 h-5" />
                Pedir por WhatsApp
                </a>
            </div>
            </div>
        </section>

        {/* Grid de Tragos - SOLO 4 PRODUCTOS */}
        <section className="container mx-auto px-4 pb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
            Nuestros Productos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tragosData.map((trago) => (
                <div 
                key={trago.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-700 hover:border-red-600 transition-all duration-300 transform hover:-translate-y-2"
                >
                {/* Imagen del producto */}
                <div className="relative h-64 bg-gray-950">
                    <Image 
                    src={trago.imagen}
                    alt={trago.nombre}
                    fill
                    className="object-contain p-4"
                    priority={trago.priority}
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ¡DESTACADO!
                    </div>
                </div>

                {/* Información del producto */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 min-h-[3rem]">
                    {trago.nombre}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {trago.descripcion}
                    </p>

                    {/* Precio */}
                    <div className="mb-4">
                    <p className="text-gray-400 text-xs">Precio</p>
                    <p className="text-3xl font-bold text-red-400">
                        ${formatPrice(trago.precio)}
                    </p>
                    </div>

                    <button
                    onClick={() => handleWhatsApp(trago)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mb-2"
                    >
                    <Phone className="w-5 h-5" />
                    Pedir por WhatsApp
                    </button>

                    <button
                    onClick={() => setSelectedProduct(trago)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-all"
                    >
                    Ver Detalles
                    </button>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* Información del servicio */}
        <section className="bg-black border-t border-red-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                Fono Copete en Santiago
                </h2>
                <p className="text-lg mb-8">
                Somos un servicio de delivery de alcohol en Santiago, con foco en Barrio Yungay.
                Pisco, vino, cervezas, promociones y todo lo que necesitas 24/7.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                    <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg mb-2">Servicio 24/7</h3>
                    <p className="text-gray-400 text-sm">
                    Disponibles todos los días, a cualquier hora
                    </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                    <MapPin className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg mb-2">Delivery Rápido</h3>
                    <p className="text-gray-400 text-sm">
                    Entrega en Barrio Yungay y alrededores
                    </p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                    <Wine className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-bold text-white text-lg mb-2">Gran Variedad</h3>
                    <p className="text-gray-400 text-sm">
                    Pisco, vino, cerveza y más
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-red-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
            <p className="text-lg mb-2 flex items-center justify-center gap-2">
                <Wine className="w-5 h-5" />
                Fono Copete Santiago Barrio Yungay - Delivery disponible (cargo extra)
            </p>
            <p className="text-gray-400 text-sm mb-4">
                📍 Barrio Yungay, Santiago | 📞 WhatsApp: +56 9 6674 3432
            </p>
            <p className="text-red-400 text-sm font-bold">
                ⚠️ Prohibida la venta a menores de 18 años. Bebe con responsabilidad.
            </p>
            </div>
        </footer>

        {/* Modal de Detalle */}
        {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-600">
                <div className="sticky top-0 bg-gray-900 border-b border-red-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.nombre}</h2>
                <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-white text-3xl hover:text-red-500 transition"
                >
                    ×
                </button>
                </div>

                <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-80 bg-black rounded-xl">
                    <Image 
                        src={selectedProduct.imagen}
                        alt={selectedProduct.nombre}
                        fill
                        className="object-contain p-4"
                    />
                    </div>

                    <div>
                    <div className="mb-6">
                        <p className="text-gray-400 text-sm mb-1">Precio:</p>
                        <p className="text-5xl font-bold text-red-400">
                        ${formatPrice(selectedProduct.precio)}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-white text-lg mb-3">Descripción</h3>
                        <p className="text-gray-300 leading-relaxed">
                        {selectedProduct.descripcion}
                        </p>
                    </div>

                    <button
                        onClick={() => handleWhatsApp(selectedProduct)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5" />
                        Pedir por WhatsApp
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}